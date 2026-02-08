import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import logoImg from "@/assets/logo.png";

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
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    apiFetch<DashboardData>("/doctor/dashboard")
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-6">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <img src={logoImg} alt="BridgeCare" className="w-16 h-16 object-contain" />
          <div>
            <h1 className="font-bold text-[24px] text-[#f29d38]">BridgeCare</h1>
            <p className="text-[14px] text-[rgba(0,0,0,0.5)]">
              Doctor Portal - {user?.fullName}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 py-6 max-w-2xl mx-auto w-full">
        {loading ? (
          <p className="text-center py-8 text-[rgba(0,0,0,0.5)] animate-pulse">Loading dashboard...</p>
        ) : data ? (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <StatCard label="Pending Review" value={data.stats.pendingReview} color="#f29d38" />
              <StatCard label="Reviewed Today" value={data.stats.reviewedToday} color="#38ea44" />
              <StatCard label="Total Patients" value={data.stats.totalPatients} color="#4A9EFF" />
              <StatCard label="Prescriptions" value={data.stats.totalPrescribed} color="#9b59b6" />
            </div>

            {/* Pending Intakes */}
            <h2 className="font-bold text-[20px] text-[#1e1e1e] mb-4">Pending Intakes</h2>
            {data.pendingIntakes.length === 0 ? (
              <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                <p className="text-[rgba(0,0,0,0.5)]">No pending intakes. All caught up!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {data.pendingIntakes.map((intake) => (
                  <button
                    key={intake.id}
                    onClick={() => navigate(`/doctor/intake/${intake.id}`)}
                    className="w-full bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all text-left active:scale-[0.99]"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-[16px] text-[#1e1e1e]">{intake.patient_name}</p>
                        <p className="text-[13px] text-[rgba(0,0,0,0.5)]">
                          {intake.patient_age}yo {intake.patient_sex}
                        </p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-600 text-[12px] px-2 py-1 rounded-lg">
                        Needs Review
                      </span>
                    </div>
                    <p className="text-[14px] text-[#1e1e1e] mt-2">
                      {intake.chief_complaint || "No chief complaint recorded"}
                    </p>
                    <p className="text-[11px] text-[rgba(0,0,0,0.4)] mt-1">
                      {new Date(intake.created_at).toLocaleString()}
                    </p>
                  </button>
                ))}
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

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <p className="text-[12px] text-[rgba(0,0,0,0.5)] uppercase tracking-wide mb-1">{label}</p>
      <p className="font-bold text-[32px]" style={{ color }}>{value}</p>
    </div>
  );
}
