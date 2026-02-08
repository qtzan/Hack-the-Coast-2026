import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "@/lib/api";
import { Header } from "@/components/shared/Header";

interface IntakeDetail {
  id: number;
  patient_name: string;
  patient_age: number;
  patient_sex: string;
  patient_weight: string;
  patient_allergies: string;
  status: string;
  chief_complaint: string;
  structured_data: string;
  doctor_notes: string;
  prescription: string;
  advice: string;
  messages: Array<{ id: number; sender: string; content: string; created_at: string }>;
}

export default function IntakeReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [intake, setIntake] = useState<IntakeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState<"prescribe" | "schedule" | "advise">("advise");
  const [notes, setNotes] = useState("");
  const [advice, setAdvice] = useState("");
  const [medName, setMedName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    apiFetch<IntakeDetail>(`/intakes/${id}`)
      .then(setIntake)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async () => {
    if (action === "schedule" && !appointmentDate) {
      alert("Please select an appointment date and time.");
      return;
    }
    setSubmitting(true);
    try {
      const body: Record<string, any> = { action, notes, advice };
      if (action === "prescribe") {
        body.prescription = { medication: medName, dosage, frequency };
      }
      if (action === "schedule") {
        body.appointmentDateTime = appointmentDate;
      }
      await apiFetch(`/intakes/${id}/review`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      setSubmitted(true);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex flex-col min-h-dvh"><Header title="Intake Review" onBack={() => navigate("/doctor")} /><p className="text-center py-8 animate-pulse">Loading...</p></div>;
  if (!intake) return <div className="flex flex-col min-h-dvh"><Header title="Intake Review" onBack={() => navigate("/doctor")} /><p className="text-center py-8 text-red-500">Intake not found</p></div>;

  const structured = intake.structured_data ? JSON.parse(intake.structured_data) : null;
  const alreadyReviewed = intake.status !== "pending_review";

  return (
    <div className="flex flex-col min-h-dvh">
      <Header title="Intake Review" onBack={() => navigate("/doctor")} />

      <div className="flex-1 overflow-y-auto pb-[100px] px-4 pt-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Patient Info */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="font-bold text-[20px] text-[#1e1e1e] mb-2">{intake.patient_name}</h2>
            <div className="flex gap-4 text-[14px] text-[rgba(0,0,0,0.6)]">
              <span>{intake.patient_age}yo</span>
              <span className="capitalize">{intake.patient_sex}</span>
              {intake.patient_weight && <span>{intake.patient_weight} lbs</span>}
            </div>
            {intake.patient_allergies && intake.patient_allergies !== "None" && (
              <div className="mt-2 bg-[#fff5e6] border border-[#f29d38] rounded-lg px-3 py-1 inline-block">
                <span className="text-[13px] text-[#f29d38] font-semibold">Allergies: {intake.patient_allergies}</span>
              </div>
            )}
          </div>

          {/* Structured Summary */}
          {structured && (
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-bold text-[16px] text-[#1e1e1e] mb-3">Intake Summary</h3>
              <div className="space-y-2 text-[14px]">
                {Object.entries(structured).map(([key, value]) => {
                  if (!value) return null;
                  const label = key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
                  return (
                    <div key={key} className="border-b border-gray-100 pb-2">
                      <p className="font-semibold text-[13px] text-[#f29d38] uppercase">{label}</p>
                      <p className="text-[#1e1e1e]">
                        {Array.isArray(value) ? value.join(", ") : typeof value === "object" ? JSON.stringify(value) : String(value)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Chat Transcript */}
          <details className="bg-white rounded-lg shadow-sm">
            <summary className="p-4 font-bold text-[16px] text-[#1e1e1e] cursor-pointer">
              Chat Transcript ({intake.messages.length} messages)
            </summary>
            <div className="px-4 pb-4 space-y-2 max-h-[400px] overflow-y-auto">
              {intake.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-2 rounded-lg text-[13px] ${
                    msg.sender === "user" ? "bg-blue-50 ml-8" : "bg-gray-50 mr-8"
                  }`}
                >
                  <span className="font-semibold text-[11px] uppercase text-[rgba(0,0,0,0.4)]">
                    {msg.sender === "user" ? "Patient" : "AI"}
                  </span>
                  <p className="text-[#1e1e1e] whitespace-pre-wrap">{msg.content}</p>
                </div>
              ))}
            </div>
          </details>

          {/* Review Form */}
          {!alreadyReviewed && !submitted ? (
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-bold text-[16px] text-[#1e1e1e] mb-4">Doctor Review</h3>

              {/* Action Selector */}
              <div className="flex gap-2 mb-4">
                {(["advise", "prescribe", "schedule"] as const).map((a) => (
                  <button
                    key={a}
                    onClick={() => setAction(a)}
                    className={`flex-1 py-2 rounded-lg text-[14px] font-semibold transition-all capitalize ${
                      action === a
                        ? "bg-[#f29d38] text-white"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[13px] font-semibold text-[rgba(0,0,0,0.6)] block mb-1">Doctor Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f29d38] resize-none h-24"
                    placeholder="Clinical notes..."
                  />
                </div>

                <div>
                  <label className="text-[13px] font-semibold text-[rgba(0,0,0,0.6)] block mb-1">Advice for Patient</label>
                  <textarea
                    value={advice}
                    onChange={(e) => setAdvice(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f29d38] resize-none h-20"
                    placeholder="Advice to share with the patient..."
                  />
                </div>

                {action === "prescribe" && (
                  <div className="bg-[#c1fecc] bg-opacity-30 rounded-lg p-3 space-y-2 border border-[#38ea44] border-opacity-30">
                    <input value={medName} onChange={(e) => setMedName(e.target.value)}
                      placeholder="Medication name" className="w-full p-2 border rounded-lg text-[14px]" />
                    <div className="grid grid-cols-2 gap-2">
                      <input value={dosage} onChange={(e) => setDosage(e.target.value)}
                        placeholder="Dosage (e.g. 20mg)" className="p-2 border rounded-lg text-[14px]" />
                      <input value={frequency} onChange={(e) => setFrequency(e.target.value)}
                        placeholder="Frequency" className="p-2 border rounded-lg text-[14px]" />
                    </div>
                  </div>
                )}

                {action === "schedule" && (
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                    <label className="text-[13px] font-semibold text-blue-600 block mb-1">Appointment Date & Time</label>
                    <input type="datetime-local" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)}
                      className="w-full p-2 border rounded-lg text-[14px]" />
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full bg-[#f29d38] text-white font-bold text-[16px] rounded-xl h-[50px] transition-all hover:bg-[#e08d28] active:scale-95 disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : `Submit ${action.charAt(0).toUpperCase() + action.slice(1)}`}
                </button>
              </div>
            </div>
          ) : submitted ? (
            <div className="bg-[#c1fecc] rounded-lg p-6 text-center">
              <p className="font-bold text-[18px] text-[#1e1e1e] mb-2">Review Submitted!</p>
              <p className="text-[14px] text-[rgba(0,0,0,0.6)] mb-4">The patient will be notified.</p>
              <button onClick={() => navigate("/doctor")}
                className="bg-[#2c2c2c] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#1a1a1a]">
                Back to Dashboard
              </button>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-[14px] text-[rgba(0,0,0,0.5)]">This intake has already been reviewed.</p>
              {intake.prescription && (
                <p className="text-[13px] text-[#38ea44] mt-1">Prescription: {JSON.parse(intake.prescription).medication}</p>
              )}
              {intake.advice && (
                <p className="text-[13px] text-[rgba(0,0,0,0.5)] mt-1">Advice: {intake.advice}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
