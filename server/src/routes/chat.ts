import { Router, Request, Response } from "express";
import { getDb } from "../db/schema.js";
import { authenticateToken, requireRole } from "../middleware/auth.js";
import { getChatResponse, parseIntakeComplete, ChatMessage } from "../services/openai.js";

const router = Router();

router.post("/start", authenticateToken, requireRole("patient"), async (req: Request, res: Response) => {
  try {
    const db = getDb();
    const userId = req.user!.userId;

    // Get patient profile for context
    const patient = db.prepare("SELECT * FROM users WHERE id = ?").get(userId) as any;

    const result = db.prepare(
      "INSERT INTO intakes (patient_id, status) VALUES (?, 'in_progress')"
    ).run(userId);

    const intakeId = result.lastInsertRowid as number;

    // Get AI greeting
    const aiResponse = await getChatResponse([], {
      fullName: patient.full_name,
      age: patient.age,
      sex: patient.sex,
      weight: patient.weight,
      allergies: patient.allergies,
    });

    db.prepare("INSERT INTO messages (intake_id, sender, content) VALUES (?, 'ai', ?)").run(intakeId, aiResponse);

    res.json({
      intakeId,
      message: { sender: "ai", content: aiResponse },
    });
  } catch (error) {
    console.error("Chat start error:", error);
    res.status(500).json({ error: "Failed to start chat" });
  }
});

router.post("/message", authenticateToken, requireRole("patient"), async (req: Request, res: Response) => {
  try {
    const { intakeId, message } = req.body;
    const db = getDb();

    if (!intakeId || !message) {
      res.status(400).json({ error: "intakeId and message are required" });
      return;
    }

    // Verify intake belongs to this patient and is in progress
    const intake = db.prepare("SELECT * FROM intakes WHERE id = ? AND patient_id = ?").get(intakeId, req.user!.userId) as any;
    if (!intake) {
      res.status(404).json({ error: "Intake not found" });
      return;
    }
    if (intake.status !== "in_progress") {
      res.status(400).json({ error: "This intake is no longer active" });
      return;
    }

    // Save user message
    db.prepare("INSERT INTO messages (intake_id, sender, content) VALUES (?, 'user', ?)").run(intakeId, message);

    // Build conversation history
    const dbMessages = db.prepare("SELECT sender, content FROM messages WHERE intake_id = ? ORDER BY created_at").all(intakeId) as any[];
    const chatHistory: ChatMessage[] = dbMessages.map((m: any) => ({
      role: m.sender === "user" ? "user" as const : "assistant" as const,
      content: m.content,
    }));

    // Get patient profile
    const patient = db.prepare("SELECT * FROM users WHERE id = ?").get(req.user!.userId) as any;

    // Get AI response
    const aiResponse = await getChatResponse(chatHistory, {
      fullName: patient.full_name,
      age: patient.age,
      sex: patient.sex,
      weight: patient.weight,
      allergies: patient.allergies,
    });

    // Save AI response
    db.prepare("INSERT INTO messages (intake_id, sender, content) VALUES (?, 'ai', ?)").run(intakeId, aiResponse);

    // Check if intake is complete
    const structuredData = parseIntakeComplete(aiResponse);
    let intakeComplete = false;
    if (structuredData) {
      db.prepare(`
        UPDATE intakes
        SET status = 'pending_review',
            chief_complaint = ?,
            structured_data = ?,
            updated_at = datetime('now')
        WHERE id = ?
      `).run(
        (structuredData as any).chief_complaint || "Not specified",
        JSON.stringify(structuredData),
        intakeId
      );
      intakeComplete = true;
    }

    res.json({
      message: { sender: "ai", content: aiResponse },
      intakeComplete,
    });
  } catch (error) {
    console.error("Chat message error:", error);
    res.status(500).json({ error: "Failed to process message" });
  }
});

export default router;
