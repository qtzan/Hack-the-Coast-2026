import { Router, Request, Response } from "express";
import { getDb } from "../db/schema.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

// List intakes - patients see their own, doctors see pending_review+
router.get("/", authenticateToken, (req: Request, res: Response) => {
  const db = getDb();
  const { role, userId } = req.user!;

  let intakes;
  if (role === "patient") {
    intakes = db.prepare(`
      SELECT i.*, u.full_name as doctor_name
      FROM intakes i
      LEFT JOIN users u ON i.doctor_id = u.id
      WHERE i.patient_id = ?
      ORDER BY i.created_at DESC
    `).all(userId);
  } else {
    intakes = db.prepare(`
      SELECT i.*, u.full_name as patient_name
      FROM intakes i
      JOIN users u ON i.patient_id = u.id
      WHERE i.status != 'in_progress'
      ORDER BY
        CASE i.status WHEN 'pending_review' THEN 0 ELSE 1 END,
        i.created_at DESC
    `).all();
  }

  res.json(intakes);
});

// Get single intake with messages
router.get("/:id", authenticateToken, (req: Request, res: Response) => {
  const db = getDb();
  const intakeId = req.params.id;
  const { role, userId } = req.user!;

  const intake = db.prepare(`
    SELECT i.*, p.full_name as patient_name, p.age as patient_age, p.sex as patient_sex,
           p.weight as patient_weight, p.allergies as patient_allergies,
           d.full_name as doctor_name
    FROM intakes i
    JOIN users p ON i.patient_id = p.id
    LEFT JOIN users d ON i.doctor_id = d.id
    WHERE i.id = ?
  `).get(intakeId) as any;

  if (!intake) {
    res.status(404).json({ error: "Intake not found" });
    return;
  }

  // Patients can only see their own
  if (role === "patient" && intake.patient_id !== userId) {
    res.status(403).json({ error: "Access denied" });
    return;
  }

  const messages = db.prepare("SELECT * FROM messages WHERE intake_id = ? ORDER BY created_at").all(intakeId);

  res.json({ ...intake, messages });
});

// Doctor reviews an intake
router.put("/:id/review", authenticateToken, (req: Request, res: Response) => {
  if (req.user!.role !== "doctor") {
    res.status(403).json({ error: "Doctor role required" });
    return;
  }

  const db = getDb();
  const intakeId = req.params.id;
  const { action, notes, prescription, advice, appointmentDateTime } = req.body;

  const intake = db.prepare("SELECT * FROM intakes WHERE id = ?").get(intakeId) as any;
  if (!intake) {
    res.status(404).json({ error: "Intake not found" });
    return;
  }

  // Validate appointmentDateTime is provided when scheduling
  if (action === "schedule" && !appointmentDateTime) {
    res.status(400).json({ error: "Appointment date and time are required when scheduling" });
    return;
  }

  let newStatus: string;
  switch (action) {
    case "prescribe":
      newStatus = "prescribed";
      break;
    case "schedule":
      newStatus = "appointment_set";
      break;
    case "advise":
      newStatus = "reviewed";
      break;
    default:
      res.status(400).json({ error: "Invalid action. Use: prescribe, schedule, or advise" });
      return;
  }

  db.prepare(`
    UPDATE intakes
    SET status = ?, doctor_id = ?, doctor_notes = ?, prescription = ?, advice = ?, updated_at = datetime('now')
    WHERE id = ?
  `).run(newStatus, req.user!.userId, notes || null, prescription ? JSON.stringify(prescription) : null, advice || null, intakeId);

  // If scheduling, create appointment
  if (action === "schedule" && appointmentDateTime) {
    db.prepare(`
      INSERT INTO appointments (patient_id, doctor_id, intake_id, date_time, reason, status)
      VALUES (?, ?, ?, ?, ?, 'scheduled')
    `).run(intake.patient_id, req.user!.userId, intakeId, appointmentDateTime, intake.chief_complaint || "Follow-up");
  }

  res.json({ message: "Intake reviewed successfully", status: newStatus });
});

export default router;
