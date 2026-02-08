import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/shared/Header";
import profileImg from "@/assets/profile.png";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-dvh">
      <Header title="Profile" onBack={() => navigate("/patient")} />

      <div className="flex-1 overflow-y-auto pt-4 pb-[100px] px-4">
        <div className="max-w-[400px] mx-auto space-y-6">
          {/* Profile Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl p-7 shadow-md text-center"
          >
            <div className="mb-4 relative inline-block">
              <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#f29d38] to-[#e08d28] p-[3px] mx-auto shadow-lg">
                <img src={profileImg} alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-white" />
              </div>
              <div className="absolute bottom-2 right-2 w-7 h-7 bg-[#4ade80] border-4 border-white rounded-full shadow-sm"></div>
            </div>
            <h2 className="font-bold text-[32px] text-[#1e1e1e] mb-2 leading-tight">
              {user.fullName}
            </h2>
            <div className="inline-flex items-center gap-2 bg-[#fff5eb] px-5 py-2.5 rounded-full border border-[#f29d38] border-opacity-30">
              <div className="w-2.5 h-2.5 bg-[#f29d38] rounded-full animate-pulse"></div>
              <p className="font-bold text-[14px] text-[#f29d38]">
                BridgeCare {user.role === "doctor" ? "Doctor" : "Patient"}
              </p>
            </div>
          </motion.div>

          {/* Personal Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-2xl p-7 shadow-md"
          >
            <div className="mb-6 text-center">
              <h3 className="font-bold text-[24px] text-[#1e1e1e] mb-2">Personal Details</h3>
              <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#f29d38] to-transparent mx-auto rounded-full"></div>
            </div>
            <div className="space-y-3">
              <DetailRow label="Email" value={user.email} icon="mail" />
              {user.dateOfBirth && <DetailRow label="Date of Birth" value={user.dateOfBirth} icon="calendar" />}
              <div className="grid grid-cols-2 gap-3">
                {user.age && <DetailRow label="Age" value={`${user.age} years`} icon="user" />}
                {user.sex && <DetailRow label="Sex" value={user.sex} icon="heart" capitalize />}
              </div>
              {user.weight && <DetailRow label="Weight" value={`${user.weight} lbs`} icon="scale" />}
            </div>
          </motion.div>

          {/* Allergies & Emergency - Special Cards */}
          {(user.allergies || user.emergencyContact) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-3"
            >
              {user.allergies && (
                <div className="bg-[#fff5e6] border-2 border-[#f29d38] rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-[#f29d38]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="font-bold text-[14px] text-[#f29d38] uppercase tracking-wide">Allergies</p>
                  </div>
                  <p className="font-semibold text-[18px] text-[#1e1e1e]">{user.allergies}</p>
                </div>
              )}
              {user.emergencyContact && (
                <div className="bg-[#ffe6e6] border-2 border-[#ff6b6b] rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-[#ff6b6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <p className="font-bold text-[14px] text-[#ff6b6b] uppercase tracking-wide">Emergency Contact</p>
                  </div>
                  <p className="font-semibold text-[18px] text-[#1e1e1e]">{user.emergencyContact}</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Logout */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            onClick={handleLogout}
            className="w-full bg-red-50 border-2 border-red-200 text-red-600 font-bold text-[16px] rounded-2xl h-[56px] transition-all hover:bg-red-100 hover:scale-[1.02] active:scale-95 shadow-sm"
          >
            Log Out
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, icon, capitalize }: { label: string; value: string; icon: string; capitalize?: boolean }) {
  const icons: Record<string, React.ReactNode> = {
    mail: (
      <svg className="w-4 h-4 text-[#f29d38]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    calendar: (
      <svg className="w-4 h-4 text-[#f29d38]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    user: (
      <svg className="w-4 h-4 text-[#f29d38]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    heart: (
      <svg className="w-4 h-4 text-[#f29d38]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    scale: (
      <svg className="w-4 h-4 text-[#f29d38]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  };

  return (
    <div className="bg-[#f8f9fa] rounded-xl p-4 transition-all duration-200 hover:bg-[#eef0f2] hover:shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        {icons[icon]}
        <p className="font-bold text-[12px] text-[rgba(0,0,0,0.45)] uppercase tracking-wider">{label}</p>
      </div>
      <p className={`font-semibold text-[17px] text-[#1e1e1e] pl-6 ${capitalize ? "capitalize" : ""}`}>{value}</p>
    </div>
  );
}
