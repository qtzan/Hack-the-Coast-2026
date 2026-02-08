import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getDb } from "../db/schema.js";
import { authenticateToken, signToken } from "../middleware/auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = Router();

// Load doctor codes from doctor_code.json
function loadDoctorCodes(): Array<{ last_name: string; code: string }> {
  const filePath = path.join(__dirname, "../../../portal/doctor_code.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);
  return Array.isArray(data) ? data : [data];
}

// Premade doctor registration codes
const VALID_DOCTOR_CODES = ["BRIDGE2026", "DOCTOR001", "DOCTOR002", "DOCTOR003", "MEDSTAFF01"];

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

// Doctor login with last name + healthcare ID
router.post("/doctor-login", (req: Request, res: Response) => {
  const { lastName, healthcareId } = req.body;

  if (!lastName || !healthcareId) {
    res.status(400).json({ error: "Last name and healthcare ID are required" });
    return;
  }

  // Validate against doctor_code.json
  let doctorCodes: Array<{ last_name: string; code: string }>;
  try {
    doctorCodes = loadDoctorCodes();
  } catch {
    res.status(500).json({ error: "Unable to load doctor codes" });
    return;
  }

  const match = doctorCodes.find(
    (dc) =>
      dc.last_name.toLowerCase() === lastName.toLowerCase() &&
      dc.code === healthcareId
  );

  if (!match) {
    res.status(401).json({ error: "Invalid last name or healthcare ID" });
    return;
  }

  const db = getDb();

  // Find existing doctor user by last name match
  let user = db.prepare(
    "SELECT * FROM users WHERE role = 'doctor' AND full_name LIKE ?"
  ).get(`%${match.last_name}`) as any;

  // If no doctor user exists for this last name, create one
  if (!user) {
    const placeholderHash = bcrypt.hashSync("doctor-healthcare-login", 10);
    const result = db.prepare(`
      INSERT INTO users (email, password_hash, role, full_name)
      VALUES (?, ?, 'doctor', ?)
    `).run(
      `dr.${match.last_name.toLowerCase()}@bridgecare.local`,
      placeholderHash,
      `Dr. ${match.last_name}`
    );
    user = db.prepare("SELECT * FROM users WHERE id = ?").get(result.lastInsertRowid) as any;
  }

  const token = signToken({ userId: user.id, role: "doctor" });

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
