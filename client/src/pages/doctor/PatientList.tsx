import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  useEffect(() => {
    apiFetch<Intake[]>("/intakes")
      .then(setIntakes)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statusColor: Record<string, string> = {
    pending_review: "bg-yellow-100 text-yellow-600",
    reviewed: "bg-blue-100 text-blue-600",
    prescribed: "bg-green-100 text-green-600",
    appointment_set: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="flex flex-col min-h-dvh">
      <Header title="All Intakes" />

      <div className="flex-1 overflow-y-auto pb-[100px] px-4 pt-4">
        <div className="max-w-2xl mx-auto space-y-3">
          {loading ? (
            <p className="text-center py-8 animate-pulse text-[rgba(0,0,0,0.5)]">Loading...</p>
          ) : intakes.length === 0 ? (
            <p className="text-center py-8 text-[rgba(0,0,0,0.5)]">No intakes found.</p>
          ) : (
            intakes.map((intake) => (
              <button
                key={intake.id}
                onClick={() => navigate(`/doctor/intake/${intake.id}`)}
                className="w-full bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all text-left"
              >
                <div className="flex justify-between items-start">
                  <p className="font-semibold text-[16px] text-[#1e1e1e]">{intake.patient_name}</p>
                  <span className={`text-[12px] px-2 py-1 rounded-lg ${statusColor[intake.status] || "bg-gray-100 text-gray-500"}`}>
                    {intake.status.replace(/_/g, " ")}
                  </span>
                </div>
                <p className="text-[14px] text-[rgba(0,0,0,0.6)] mt-1">
                  {intake.chief_complaint || "No chief complaint"}
                </p>
                <p className="text-[11px] text-[rgba(0,0,0,0.4)] mt-1">
                  {new Date(intake.created_at).toLocaleString()}
                </p>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
