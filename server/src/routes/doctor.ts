import { Router, Request, Response } from "express";
import { getDb } from "../db/schema.js";
import { authenticateToken, requireRole } from "../middleware/auth.js";

const router = Router();

router.get("/dashboard", authenticateToken, requireRole("doctor"), (req: Request, res: Response) => {
  const db = getDb();

  const pendingIntakes = db.prepare(`
    SELECT i.*, u.full_name as patient_name, u.age as patient_age, u.sex as patient_sex
    FROM intakes i
    JOIN users u ON i.patient_id = u.id
    WHERE i.status = 'pending_review'
    ORDER BY i.created_at ASC
  `).all();

  const stats = {
    pendingReview: (db.prepare("SELECT COUNT(*) as c FROM intakes WHERE status = 'pending_review'").get() as any).c,
    reviewedToday: (db.prepare("SELECT COUNT(*) as c FROM intakes WHERE doctor_id = ? AND date(updated_at) = date('now')").get(req.user!.userId) as any).c,
    totalPatients: (db.prepare("SELECT COUNT(DISTINCT patient_id) as c FROM intakes WHERE doctor_id = ?").get(req.user!.userId) as any).c,
    totalPrescribed: (db.prepare("SELECT COUNT(*) as c FROM intakes WHERE doctor_id = ? AND status = 'prescribed'").get(req.user!.userId) as any).c,
  };

  res.json({ pendingIntakes, stats });
});

export default router;
