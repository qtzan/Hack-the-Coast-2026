import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "../../bridgecare.db");

let db: Database.Database;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    initSchema(db);
  }
  return db;
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('patient', 'doctor')),
      full_name TEXT NOT NULL,
      date_of_birth TEXT,
      age INTEGER,
      sex TEXT,
      weight TEXT,
      allergies TEXT,
      emergency_contact TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS intakes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER NOT NULL REFERENCES users(id),
      doctor_id INTEGER REFERENCES users(id),
      status TEXT NOT NULL DEFAULT 'in_progress' CHECK(status IN ('in_progress', 'pending_review', 'reviewed', 'prescribed', 'appointment_set')),
      chief_complaint TEXT,
      summary TEXT,
      structured_data TEXT,
      doctor_notes TEXT,
      prescription TEXT,
      advice TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      intake_id INTEGER NOT NULL REFERENCES intakes(id),
      sender TEXT NOT NULL CHECK(sender IN ('user', 'ai')),
      content TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER NOT NULL REFERENCES users(id),
      doctor_id INTEGER REFERENCES users(id),
      intake_id INTEGER REFERENCES intakes(id),
      date_time TEXT NOT NULL,
      reason TEXT,
      status TEXT NOT NULL DEFAULT 'scheduled' CHECK(status IN ('scheduled', 'completed', 'cancelled')),
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);
}
