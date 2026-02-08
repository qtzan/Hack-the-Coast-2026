import { Router, Request, Response } from "express";
import { getDb } from "../db/schema.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

router.get("/", authenticateToken, (req: Request, res: Response) => {
  const db = getDb();
  const { role, userId } = req.user!;

  let appointments;
  if (role === "patient") {
    appointments = db.prepare(`
      SELECT a.*, d.full_name as doctor_name
      FROM appointments a
      LEFT JOIN users d ON a.doctor_id = d.id
      WHERE a.patient_id = ?
      ORDER BY a.date_time DESC
    `).all(userId);
  } else {
    appointments = db.prepare(`
      SELECT a.*, p.full_name as patient_name
      FROM appointments a
      JOIN users p ON a.patient_id = p.id
      WHERE a.doctor_id = ?
      ORDER BY a.date_time DESC
    `).all(userId);
  }

  res.json(appointments);
});

router.post("/", authenticateToken, (req: Request, res: Response) => {
  const db = getDb();
  const { doctorId, dateTime, reason } = req.body;

  if (!dateTime) {
    res.status(400).json({ error: "dateTime is required" });
    return;
  }

  const result = db.prepare(`
    INSERT INTO appointments (patient_id, doctor_id, date_time, reason, status)
    VALUES (?, ?, ?, ?, 'scheduled')
  `).run(req.user!.userId, doctorId || null, dateTime, reason || "General consultation");

  res.status(201).json({
    id: result.lastInsertRowid,
    message: "Appointment scheduled",
  });
});

export default router;
