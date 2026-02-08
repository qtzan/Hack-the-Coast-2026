import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { getDb } from "../db/schema.js";
import { authenticateToken, signToken } from "../middleware/auth.js";

const router = Router();

// Premade doctor registration codes
const VALID_DOCTOR_CODES = ["BRIDGE2026", "DOCTOR001", "DOCTOR002", "DOCTOR003", "MEDSTAFF01"];

router.get("/doctor-codes", (_req: Request, res: Response) => {
  res.json({ codes: VALID_DOCTOR_CODES });
});

router.post("/register", (req: Request, res: Response) => {
  const { email, password, role, fullName, dateOfBirth, age, sex, weight, allergies, emergencyContact, doctorCode } = req.body;

  if (!email || !password || !fullName) {
    res.status(400).json({ error: "Email, password, and full name are required" });
    return;
  }

  const validRole = role === "doctor" ? "doctor" : "patient";

  // Validate doctor code if registering as doctor
  if (validRole === "doctor") {
    if (!doctorCode || !VALID_DOCTOR_CODES.includes(doctorCode.toUpperCase())) {
      res.status(403).json({ error: "Invalid doctor registration code. Please contact administration." });
      return;
    }
  }
  const db = getDb();

  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (existing) {
    res.status(409).json({ error: "Email already registered" });
    return;
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  const result = db.prepare(`
    INSERT INTO users (email, password_hash, role, full_name, date_of_birth, age, sex, weight, allergies, emergency_contact)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(email, passwordHash, validRole, fullName, dateOfBirth || null, age || null, sex || null, weight || null, allergies || null, emergencyContact || null);

  const token = signToken({ userId: result.lastInsertRowid as number, role: validRole });

  res.status(201).json({
    token,
    user: {
      id: result.lastInsertRowid,
      email,
      role: validRole,
      fullName,
      dateOfBirth: dateOfBirth || null,
      age: age || null,
      sex: sex || null,
      weight: weight || null,
      allergies: allergies || null,
      emergencyContact: emergencyContact || null,
    },
  });
});

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const db = getDb();
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as any;

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const token = signToken({ userId: user.id, role: user.role });

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.full_name,
      dateOfBirth: user.date_of_birth,
      age: user.age,
      sex: user.sex,
      weight: user.weight,
      allergies: user.allergies,
      emergencyContact: user.emergency_contact,
    },
  });
});

router.get("/me", authenticateToken, (req: Request, res: Response) => {
  const db = getDb();
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.user!.userId) as any;

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json({
    id: user.id,
    email: user.email,
    role: user.role,
    fullName: user.full_name,
    dateOfBirth: user.date_of_birth,
    age: user.age,
    sex: user.sex,
    weight: user.weight,
    allergies: user.allergies,
    emergencyContact: user.emergency_contact,
  });
});

export default router;
