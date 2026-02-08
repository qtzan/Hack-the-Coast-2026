import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { apiFetch } from "@/lib/api";
import { Header } from "@/components/shared/Header";
import pillImg from "@/assets/pill.png";
import cutleryImg from "@/assets/cutlery.png";

interface Intake {
  id: number;
  status: string;
  chief_complaint: string;
  doctor_notes: string;
  prescription: string;
  advice: string;
  doctor_name: string;
  created_at: string;
  structured_data: string;
}

export default function History() {
  const [intakes, setIntakes] = useState<Intake[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    apiFetch<Intake[]>("/intakes")
      .then(setIntakes)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredIntakes = intakes.filter(
    (i) =>
      i.status !== "in_progress" &&
      ((i.chief_complaint || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (i.advice || "").toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleExpand = (id: number) => {
    setExpandedCards((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "prescribed":
        return (
          <span className="bg-[#c1fecc] text-[#38ea44] text-[13px] px-2 py-1 rounded-[8px] font-normal flex items-center gap-1">
            <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
              <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="#38EA44" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
            </svg>
            Prescribed
          </span>
        );
      case "reviewed":
        return <span className="bg-blue-100 text-blue-600 text-[13px] px-2 py-1 rounded-lg">Reviewed</span>;
      case "appointment_set":
        return <span className="bg-purple-100 text-purple-600 text-[13px] px-2 py-1 rounded-lg">Appointment Set</span>;
      case "pending_review":
        return <span className="bg-yellow-100 text-yellow-600 text-[13px] px-2 py-1 rounded-lg">Pending Review</span>;
      default:
        return <span className="bg-gray-100 text-gray-500 text-[13px] px-2 py-1 rounded-lg">{status}</span>;
    }
  };

  return (
    <div className="flex flex-col min-h-dvh">
      <Header title="History" onBack={() => navigate("/patient")} />

      <div className="flex-1 overflow-y-auto pb-[100px]">
        {/* Search */}
        <div className="px-[24px] mt-[20px] mb-[24px]">
          <div className="bg-white rounded-[28px] h-[56px] flex items-center px-[16px] max-w-[720px]">
            <svg className="size-[24px] mr-3 shrink-0" fill="none" viewBox="0 0 24 24">
              <path d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z" fill="#49454F" />
            </svg>
            <input
              type="text"
              placeholder="Search history..."
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

        {loading ? (
          <div className="text-center py-8">
            <p className="text-[16px] text-[rgba(0,0,0,0.5)] animate-pulse">Loading history...</p>
          </div>
        ) : (
          <div className="px-[24px] space-y-[16px]">
            <AnimatePresence mode="popLayout">
              {filteredIntakes.length > 0 ? (
                filteredIntakes.map((intake, index) => {
                  const isExpanded = expandedCards.has(intake.id);
                  const prescription = intake.prescription ? JSON.parse(intake.prescription) : null;

                  return (
                    <motion.div
                      key={intake.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="bg-white rounded-lg p-4 w-full max-w-[352px] mx-auto transition-shadow hover:shadow-lg"
                    >
                      <div className="flex gap-3">
                        <div className="w-[36px] h-[40px] flex items-center justify-center mt-1 shrink-0">
                          <img src={prescription ? pillImg : cutleryImg} alt="" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-[16px] text-[#303030] leading-[1.4]">
                            {intake.chief_complaint || "Intake"}
                          </p>
                          <p className="text-[14px] text-[#1e1e1e] leading-[1.4] mb-2">
                            {prescription ? `Prescribed ${prescription.medication}` : intake.advice || "Pending review"}
                          </p>

                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mb-3"
                            >
                              {intake.advice && (
                                <p className="text-[14px] text-[#1e1e1e] leading-[1.6] mb-2">
                                  <strong>Advice:</strong> {intake.advice}
                                </p>
                              )}
                              {prescription && (
                                <div className="bg-[#c1fecc] bg-opacity-30 rounded-[8px] p-3 border border-[#38ea44] border-opacity-20 mb-2">
                                  <p className="text-[13px] text-[#1e1e1e]">
                                    {prescription.medication} - {prescription.dosage}, {prescription.frequency}
                                    {prescription.refills && ` | Refills: ${prescription.refills}`}
                                  </p>
                                </div>
                              )}
                              {intake.doctor_notes && (
                                <p className="text-[13px] text-[rgba(0,0,0,0.6)]">
                                  <strong>Doctor's Notes:</strong> {intake.doctor_notes}
                                </p>
                              )}
                              <p className="text-[11px] text-[rgba(0,0,0,0.4)] mt-2">
                                {new Date(intake.created_at).toLocaleDateString()}
                                {intake.doctor_name && ` - Dr. ${intake.doctor_name}`}
                              </p>
                            </motion.div>
                          )}

                          <div className="flex items-center justify-between gap-2">
                            <button
                              onClick={() => toggleExpand(intake.id)}
                              className="bg-[#2c2c2c] hover:bg-[#1a1a1a] rounded-[8px] px-3 py-2 text-[#f5f5f5] text-[14px] transition-all hover:scale-105 active:scale-95"
                            >
                              {isExpanded ? "Read Less" : "Read More"}
                            </button>
                            {getStatusBadge(intake.status)}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div className="text-center py-[40px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p className="text-[16px] text-[#1e1e1e]">
                    {searchQuery ? `No results found for "${searchQuery}"` : "No intake history yet. Start a new intake to get started!"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
