import "dotenv/config";
import express from "express";
import cors from "cors";
import { seedDatabase } from "./db/seed.js";
import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js";
import intakeRoutes from "./routes/intakes.js";
import medicationRoutes from "./routes/medications.js";
import doctorRoutes from "./routes/doctor.js";
import appointmentRoutes from "./routes/appointments.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/intakes", intakeRoutes);
app.use("/api/medications", medicationRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Seed database
seedDatabase();

app.listen(PORT, () => {
  console.log(`BridgeCare server running on http://localhost:${PORT}`);
});
