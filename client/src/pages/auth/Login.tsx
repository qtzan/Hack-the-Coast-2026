import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/shared/Header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "patient";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate(role === "doctor" ? "/doctor" : "/patient");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#e8f4f4] min-h-dvh flex flex-col">
      <Header title="Login" onBack={() => navigate("/")} />

      <div className="flex-1 px-4 pt-6 pb-[100px]">
        <div className="max-w-[400px] mx-auto">
          <div className="bg-white rounded-xl p-5 shadow-md">
            <div className="mb-6">
              <h2 className="font-bold text-[20px] text-[#1e1e1e] mb-1">
                {role === "doctor" ? "Doctor" : "Patient"} Login
              </h2>
              <p className="font-bold text-[11px] text-[rgba(0,0,0,0.52)]">
                Enter your credentials to continue
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="font-bold text-[16px] text-[#1e1e1e] block mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full px-4 py-3 border-2 border-black rounded-xl bg-white text-[16px] text-[#1e1e1e] placeholder:text-[rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 focus:ring-[#f29d38] focus:border-[#f29d38] transition-all duration-200 h-[48px]"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="font-bold text-[16px] text-[#1e1e1e] block mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-black rounded-xl bg-white text-[16px] text-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-[#f29d38] focus:border-[#f29d38] transition-all duration-200 h-[48px]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#f29d38] text-white font-bold text-[16px] rounded-xl h-[56px] transition-all duration-200 hover:bg-[#e08d28] hover:scale-105 active:scale-95 shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {role === "patient" && (
              <p className="text-[11px] text-[rgba(0,0,0,0.5)] text-center mt-4 bg-gray-50 rounded-lg p-2">
                Demo: patient@demo.com / patient123
              </p>
            )}
            {role === "doctor" && (
              <p className="text-[11px] text-[rgba(0,0,0,0.5)] text-center mt-4 bg-gray-50 rounded-lg p-2">
                Demo: doctor@demo.com / doctor123
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#e8f4f4] pb-6 px-4 pt-4">
        <div className="max-w-[400px] mx-auto">
          <p className="font-bold text-[11px] text-[rgba(0,0,0,0.58)] text-center">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="underline text-[#f29d38] hover:text-[#e08d28]"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
