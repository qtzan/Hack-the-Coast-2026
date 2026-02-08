import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/shared/Header";

export default function Register() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"patient" | "doctor">("patient");
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [weight, setWeight] = useState("");
  const [allergies, setAllergies] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName) {
      setError("Full name is required");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await register({
        email, password, role, fullName, dateOfBirth,
        age: age ? parseInt(age) : undefined,
        sex, weight, allergies, emergencyContact,
      });
      navigate(role === "doctor" ? "/doctor" : "/patient");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#e8f4f4] min-h-dvh flex flex-col">
      <Header title="Create Account" onBack={() => step === 1 ? navigate("/") : setStep(1)} />

      {/* Progress bar */}
      <div className="bg-white px-4 pb-3">
        <p className="font-bold text-[11px] text-[rgba(0,0,0,0.71)] mb-2">
          Step {step} of 2
        </p>
        <div className="w-full h-[6px] bg-[#e0e0e0] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#f29d38] rounded-full transition-all duration-500 ease-in-out"
            style={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pt-4 pb-[120px] px-4">
        <div className="max-w-[400px] mx-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-4">
              {error}
            </div>
          )}

          {step === 1 ? (
            <div className="bg-white rounded-xl p-5">
              <div className="mb-6">
                <h2 className="font-bold text-[20px] text-[#1e1e1e] mb-1">Account</h2>
                <p className="font-bold text-[11px] text-[rgba(0,0,0,0.52)]">
                  Complete the following details to continue
                </p>
              </div>
              <form onSubmit={handleStep1} className="space-y-5">
                <div>
                  <label className="font-bold text-[16px] text-[#1e1e1e] block mb-2">
                    I am a
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setRole("patient")}
                      className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${
                        role === "patient"
                          ? "border-[#f29d38] bg-[#fff5eb] text-[#f29d38]"
                          : "border-gray-200 text-gray-400"
                      }`}
                    >
                      Patient
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("doctor")}
                      className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${
                        role === "doctor"
                          ? "border-[#f29d38] bg-[#fff5eb] text-[#f29d38]"
                          : "border-gray-200 text-gray-400"
                      }`}
                    >
                      Doctor
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="regEmail" className="font-bold text-[16px] text-[#1e1e1e] block mb-2">Email</label>
                  <input id="regEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full px-4 py-3 border-2 border-black rounded-xl bg-white text-[16px] text-[#1e1e1e] placeholder:text-[rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 focus:ring-[#f29d38] focus:border-[#f29d38] h-[48px]"
                    required />
                </div>
                <div>
                  <label htmlFor="regPassword" className="font-bold text-[16px] text-[#1e1e1e] block mb-2">Password</label>
                  <input id="regPassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-black rounded-xl bg-white text-[16px] text-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-[#f29d38] focus:border-[#f29d38] h-[48px]"
                    required />
                </div>
                <div>
                  <label htmlFor="regConfirm" className="font-bold text-[16px] text-[#1e1e1e] block mb-2">Confirm Password</label>
                  <input id="regConfirm" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-black rounded-xl bg-white text-[16px] text-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-[#f29d38] focus:border-[#f29d38] h-[48px]"
                    required />
                </div>
                <button type="submit"
                  className="w-full bg-[#f29d38] text-white font-bold text-[16px] rounded-xl h-[56px] transition-all duration-200 hover:bg-[#e08d28] hover:scale-105 active:scale-95 shadow-md">
                  Continue
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-5">
              <div className="mb-6">
                <h2 className="font-bold text-[20px] text-[#1e1e1e] mb-1">Personal Details</h2>
                <p className="font-bold text-[11px] text-[rgba(0,0,0,0.52)]">
                  Complete the following details to continue
                </p>
              </div>
              <form onSubmit={handleStep2} className="space-y-5">
                <div>
                  <label htmlFor="fullName" className="font-bold text-[16px] text-[#1e1e1e] block mb-2">Full Name</label>
                  <input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-black rounded-xl bg-white text-[16px] text-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-[#f29d38] focus:border-[#f29d38] h-[48px]"
                    required />
                </div>
                <div>
                  <label htmlFor="dob" className="font-bold text-[16px] text-[#1e1e1e] block mb-2">Date of Birth</label>
                  <input id="dob" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-black rounded-xl bg-white text-[16px] text-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-[#f29d38] focus:border-[#f29d38] h-[48px]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="age" className="font-bold text-[16px] text-[#1e1e1e] block mb-2">Age</label>
                    <input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-black rounded-xl bg-white text-[16px] text-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-[#f29d38] focus:border-[#f29d38] h-[48px]" />
                  </div>
                  <div>
                    <label htmlFor="sex" className="font-bold text-[16px] text-[#1e1e1e] block mb-2">Sex</label>
                    <select id="sex" value={sex} onChange={(e) => setSex(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-black rounded-xl bg-white text-[16px] text-[#1e1e1e] appearance-none focus:outline-none focus:ring-2 focus:ring-[#f29d38] focus:border-[#f29d38] h-[48px]">
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="weight" className="font-bold text-[16px] text-[#1e1e1e] block mb-2">Weight (lbs)</label>
                  <input id="weight" type="text" value={weight} onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-black rounded-xl bg-white text-[16px] text-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-[#f29d38] focus:border-[#f29d38] h-[48px]" />
                </div>
                <div>
                  <label htmlFor="allergies" className="font-bold text-[16px] text-[#1e1e1e] block mb-2">Allergies</label>
                  <input id="allergies" type="text" value={allergies} onChange={(e) => setAllergies(e.target.value)}
                    placeholder="None or list allergies"
                    className="w-full px-4 py-3 border-2 border-black rounded-xl bg-white text-[16px] text-[#1e1e1e] placeholder:text-[rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 focus:ring-[#f29d38] focus:border-[#f29d38] h-[48px]" />
                </div>
                <div>
                  <label htmlFor="emergency" className="font-bold text-[16px] text-[#1e1e1e] block mb-2">Emergency Contact</label>
                  <input id="emergency" type="tel" value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)}
                    placeholder="(XXX) XXX-XXXX"
                    className="w-full px-4 py-3 border-2 border-black rounded-xl bg-white text-[16px] text-[#1e1e1e] placeholder:text-[rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 focus:ring-[#f29d38] focus:border-[#f29d38] h-[48px]" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-[#f29d38] text-white font-bold text-[16px] rounded-xl h-[56px] transition-all duration-200 hover:bg-[#e08d28] hover:scale-105 active:scale-95 shadow-md disabled:opacity-50">
                  {loading ? "Creating Account..." : "Complete Registration"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#e8f4f4] pb-6 px-4 pt-4">
        <div className="max-w-[400px] mx-auto">
          <p className="font-bold text-[11px] text-[rgba(0,0,0,0.58)] text-center">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} className="underline text-[#f29d38] hover:text-[#e08d28]">
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
