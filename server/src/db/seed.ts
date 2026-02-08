import bcrypt from "bcryptjs";
import { getDb } from "./schema.js";

export function seedDatabase() {
  const db = getDb();

  const existingUsers = db.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number };
  if (existingUsers.count > 0) return;

  console.log("Seeding database with demo data...");

  const patientHash = bcrypt.hashSync("patient123", 10);
  const doctorHash = bcrypt.hashSync("doctor123", 10);

  db.prepare(`
    INSERT INTO users (email, password_hash, role, full_name, date_of_birth, age, sex, weight, allergies, emergency_contact)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run("patient@demo.com", patientHash, "patient", "Jane Smith", "1990-05-15", 35, "female", "140", "Penicillin", "(555) 123-4567");

  db.prepare(`
    INSERT INTO users (email, password_hash, role, full_name, date_of_birth, age, sex, weight, allergies, emergency_contact)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run("doctor@demo.com", doctorHash, "doctor", "Dr. Michael Chen", "1975-09-22", 50, "male", "180", "None", "(555) 987-6543");

  // Seed a completed intake for history display
  const intakeResult = db.prepare(`
    INSERT INTO intakes (patient_id, doctor_id, status, chief_complaint, summary, structured_data, doctor_notes, prescription, advice)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    1, 2, "prescribed",
    "High cholesterol levels",
    JSON.stringify({ diagnosis: "Hyperlipidemia", severity: "moderate" }),
    JSON.stringify({
      chief_complaint: "High cholesterol",
      history_of_present_illness: "Patient reports elevated cholesterol found during routine bloodwork",
      medications: ["None currently"],
      allergies: ["Penicillin"],
      review_of_systems: { cardiovascular: "No chest pain", general: "Feeling well otherwise" }
    }),
    "Start statin therapy. Recheck lipid panel in 3 months.",
    JSON.stringify({ medication: "Atorvastatin", dosage: "20mg", frequency: "Once daily at bedtime", refills: 3 }),
    "Maintain a heart-healthy diet low in saturated fats. Exercise 30 minutes daily."
  );

  // Add some messages for the intake
  const intakeId = intakeResult.lastInsertRowid;
  const msgs = [
    ["ai", "Hello Jane! I'm your BridgeCare health assistant. What brings you in today?"],
    ["user", "I got my blood work back and my cholesterol is high."],
    ["ai", "I understand that can be concerning. Can you tell me what your cholesterol numbers were, if you remember?"],
    ["user", "My LDL was 180 and total cholesterol was 260."],
    ["ai", "Thank you for sharing those numbers. Those are above the recommended levels. Have you been experiencing any symptoms like chest pain or shortness of breath?"],
    ["user", "No, I feel fine otherwise."],
    ["ai", "That's good to hear. Do you have any family history of heart disease or high cholesterol?"],
    ["user", "Yes, my father had a heart attack at 55."],
  ];
  const insertMsg = db.prepare("INSERT INTO messages (intake_id, sender, content) VALUES (?, ?, ?)");
  for (const [sender, content] of msgs) {
    insertMsg.run(intakeId, sender, content);
  }

  console.log("Database seeded successfully.");
}
