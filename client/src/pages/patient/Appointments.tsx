import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "@/lib/api";
import { Header } from "@/components/shared/Header";

interface Appointment {
  id: number;
  date_time: string;
  reason: string;
  status: string;
  doctor_name?: string;
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    apiFetch<Appointment[]>("/appointments")
      .then(setAppointments)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col min-h-dvh">
      <Header title="Appointments" onBack={() => navigate("/patient")} />

      <div className="flex-1 overflow-y-auto pb-[100px] px-6 pt-6">
        {loading ? (
          <p className="text-center text-[rgba(0,0,0,0.5)] animate-pulse py-8">Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[16px] text-[rgba(0,0,0,0.5)] mb-4">No appointments scheduled</p>
            <p className="text-[13px] text-[rgba(0,0,0,0.4)]">
              Appointments are created when a doctor reviews your intake and schedules a follow-up.
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-w-md mx-auto">
            {appointments.map((apt) => (
              <div key={apt.id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-[16px] text-[#1e1e1e]">{apt.reason}</p>
                    {apt.doctor_name && (
                      <p className="text-[13px] text-[rgba(0,0,0,0.5)]">{apt.doctor_name}</p>
                    )}
                  </div>
                  <span
                    className={`text-[12px] px-2 py-1 rounded-lg ${
                      apt.status === "scheduled"
                        ? "bg-blue-100 text-blue-600"
                        : apt.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {apt.status}
                  </span>
                </div>
                <p className="text-[14px] text-[#f29d38] font-semibold">
                  {new Date(apt.date_time).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
