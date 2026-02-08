import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { apiFetch } from "@/lib/api";
import { Header } from "@/components/shared/Header";

interface Intake {
  id: number;
  patient_name: string;
  status: string;
  chief_complaint: string;
  created_at: string;
}

export default function PatientList() {
  const [intakes, setIntakes] = useState<Intake[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    apiFetch<Intake[]>("/intakes")
      .then(setIntakes)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredIntakes = intakes.filter(
    (i) =>
      i.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (i.chief_complaint || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusColor: Record<string, string> = {
    pending_review: "bg-yellow-100 text-yellow-600",
    reviewed: "bg-blue-100 text-blue-600",
    prescribed: "bg-green-100 text-green-600",
    appointment_set: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="flex flex-col min-h-dvh">
      <Header title="All Intakes" onBack={() => navigate("/doctor")} />

      <div className="flex-1 overflow-y-auto pb-[100px] px-4 pt-4">
        <div className="max-w-2xl mx-auto">
          {/* Search */}
          <div className="mb-6">
            <div className="bg-white rounded-[28px] h-[56px] flex items-center px-[16px]">
              <svg className="size-[24px] mr-3 shrink-0" fill="none" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="#49454F" />
              </svg>
              <input
                type="text"
                placeholder="Search intakes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-[16px] text-[#49454f] outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="ml-2 text-gray-400 hover:text-gray-600">
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {loading ? (
              <p className="text-center py-8 animate-pulse text-[rgba(0,0,0,0.5)]">Loading...</p>
            ) : filteredIntakes.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-[rgba(0,0,0,0.5)]"
              >
                {searchQuery ? `No intakes found for "${searchQuery}"` : "No intakes found."}
              </motion.p>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredIntakes.map((intake, index) => (
                  <motion.button
                    key={intake.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ delay: index * 0.06, duration: 0.3 }}
                    onClick={() => navigate(`/doctor/intake/${intake.id}`)}
                    className="w-full bg-white rounded-lg p-4 shadow-sm hover:shadow-lg transition-all text-left active:scale-[0.98]"
                  >
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-[16px] text-[#1e1e1e]">{intake.patient_name}</p>
                      <span className={`text-[12px] px-2 py-1 rounded-lg capitalize ${statusColor[intake.status] || "bg-gray-100 text-gray-500"}`}>
                        {intake.status.replace(/_/g, " ")}
                      </span>
                    </div>
                    <p className="text-[14px] text-[rgba(0,0,0,0.6)] mt-1">
                      {intake.chief_complaint || "No chief complaint"}
                    </p>
                    <p className="text-[11px] text-[rgba(0,0,0,0.4)] mt-1">
                      {new Date(intake.created_at).toLocaleString()}
                    </p>
                  </motion.button>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
