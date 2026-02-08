import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import logoImg from "@/assets/logo.png";
import profileImg from "@/assets/profile.png";

interface DashboardData {
  pendingIntakes: Array<{
    id: number;
    patient_name: string;
    patient_age: number;
    patient_sex: string;
    chief_complaint: string;
    created_at: string;
  }>;
  stats: {
    pendingReview: number;
    reviewedToday: number;
    totalPatients: number;
    totalPrescribed: number;
  };
}

export default function DoctorDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    apiFetch<DashboardData>("/doctor/dashboard")
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredIntakes = data?.pendingIntakes.filter(
    (intake) =>
      intake.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (intake.chief_complaint || "").toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="flex flex-col">
      {/* Header - matches patient portal style */}
      <div className="bg-[#e8f4f4] shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <p className="font-bold text-[20px] text-[rgba(0,0,0,0.3)] mb-4">
            Doctor Portal
          </p>
          <div className="bg-white border-4 border-[#4A9EFF] rounded-lg p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-[50px] flex-shrink-0">
                  <img alt="BridgeCare Logo" className="w-full h-full object-contain" src={logoImg} />
                </div>
                <p className="font-bold text-[24px] text-[#f29d38]">
                  BridgeCare
                </p>
              </div>
              <button
                className="w-[44px] h-[44px] transition-all duration-200 hover:scale-110 active:scale-95 rounded-full flex-shrink-0"
                onClick={() => navigate("/doctor/profile")}
                aria-label="Profile"
              >
                <img alt="Profile" className="w-full h-full object-contain" src={profileImg} />
              </button>
            </div>
          </div>
          {user && (
            <p className="text-[14px] text-[rgba(0,0,0,0.5)] mt-2 text-center">
              Welcome back, {user.fullName}
            </p>
          )}
        </div>
      </div>

      <div className="flex-1 px-6 py-6 max-w-2xl mx-auto w-full">
        {loading ? (
          <p className="text-center py-8 text-[rgba(0,0,0,0.5)] animate-pulse">Loading dashboard...</p>
        ) : data ? (
          <>
            {/* Stats Grid - animated */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: "Pending Review", value: data.stats.pendingReview, color: "#f29d38" },
                { label: "Reviewed Today", value: data.stats.reviewedToday, color: "#38ea44" },
                { label: "Total Patients", value: data.stats.totalPatients, color: "#4A9EFF" },
                { label: "Prescriptions", value: data.stats.totalPrescribed, color: "#9b59b6" },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.3 }}
                  className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-default"
                >
                  <p className="text-[12px] text-[rgba(0,0,0,0.5)] uppercase tracking-wide mb-1">{stat.label}</p>
                  <p className="font-bold text-[32px]" style={{ color: stat.color }}>{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="bg-white rounded-[28px] h-[56px] flex items-center px-[16px]">
                <svg className="size-[24px] mr-3 shrink-0" fill="none" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="#49454F" />
                </svg>
                <input
                  type="text"
                  placeholder="Search patients..."
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

            {/* Pending Intakes */}
            <h2 className="font-bold text-[20px] text-[#1e1e1e] mb-4">Pending Intakes</h2>
            {filteredIntakes.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-lg p-6 text-center shadow-sm"
              >
                <p className="text-[rgba(0,0,0,0.5)]">
                  {searchQuery ? `No patients found for "${searchQuery}"` : "No pending intakes. All caught up!"}
                </p>
              </motion.div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {filteredIntakes.map((intake, index) => (
                    <motion.button
                      key={intake.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ delay: index * 0.08, duration: 0.3 }}
                      onClick={() => navigate(`/doctor/intake/${intake.id}`)}
                      className="w-full bg-white rounded-lg p-4 shadow-sm hover:shadow-lg transition-all text-left active:scale-[0.98]"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-[16px] text-[#1e1e1e]">{intake.patient_name}</p>
                          <p className="text-[13px] text-[rgba(0,0,0,0.5)]">
                            {intake.patient_age}yo {intake.patient_sex}
                          </p>
                        </div>
                        <span className="bg-yellow-100 text-yellow-600 text-[12px] px-2 py-1 rounded-lg animate-pulse">
                          Needs Review
                        </span>
                      </div>
                      <p className="text-[14px] text-[#1e1e1e] mt-2">
                        {intake.chief_complaint || "No chief complaint recorded"}
                      </p>
                      <p className="text-[11px] text-[rgba(0,0,0,0.4)] mt-1">
                        {new Date(intake.created_at).toLocaleString()}
                      </p>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </>
        ) : (
          <p className="text-center py-8 text-red-500">Failed to load dashboard</p>
        )}
      </div>
    </div>
  );
}
