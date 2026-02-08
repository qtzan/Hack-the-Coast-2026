import { useNavigate } from "react-router-dom";
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
          {/* Profile Header */}
          <div className="bg-white rounded-xl p-7 shadow-md text-center" style={{ borderRadius: "16px" }}>
            <div className="mb-4 relative inline-block">
              <div className="w-[110px] h-[110px] rounded-full bg-gradient-to-br from-[#f29d38] to-[#e08d28] p-[3px] mx-auto">
                <img src={profileImg} alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-white" />
              </div>
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-[#4ade80] border-4 border-white rounded-full"></div>
            </div>
            <h2 className="font-bold text-[36px] text-[#1e1e1e] mb-2 leading-tight">
              {user.fullName}
            </h2>
            <div className="inline-flex items-center gap-2 bg-[#f29d38] bg-opacity-10 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-[#f29d38] rounded-full"></div>
              <p className="font-bold text-[14px] text-[#f29d38]">BridgeCare {user.role === "doctor" ? "Doctor" : "Patient"}</p>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-xl p-7 shadow-md" style={{ borderRadius: "16px" }}>
            <div className="mb-6 text-center">
              <h3 className="font-bold text-[28px] text-[#1e1e1e] mb-2">Personal Details</h3>
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#f29d38] to-transparent mx-auto rounded-full"></div>
            </div>
            <div className="space-y-4">
              <DetailRow label="Email" value={user.email} />
              {user.dateOfBirth && <DetailRow label="Date of Birth" value={user.dateOfBirth} />}
              <div className="grid grid-cols-2 gap-4">
                {user.age && <DetailRow label="Age" value={String(user.age)} />}
                {user.sex && <DetailRow label="Sex" value={user.sex} capitalize />}
              </div>
              {user.weight && <DetailRow label="Weight" value={`${user.weight} lbs`} />}
              {user.allergies && (
                <div className="bg-[#fff5e6] border-2 border-[#f29d38] rounded-xl p-4">
                  <p className="font-bold text-[13px] text-[#f29d38] mb-1 uppercase tracking-wide">Allergies</p>
                  <p className="font-bold text-[18px] text-[#1e1e1e]">{user.allergies}</p>
                </div>
              )}
              {user.emergencyContact && (
                <div className="bg-[#ffe6e6] border-2 border-[#ff6b6b] rounded-xl p-4">
                  <p className="font-bold text-[13px] text-[#ff6b6b] mb-1 uppercase tracking-wide">Emergency Contact</p>
                  <p className="font-bold text-[18px] text-[#1e1e1e]">{user.emergencyContact}</p>
                </div>
              )}
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-50 border-2 border-red-200 text-red-600 font-bold text-[16px] rounded-xl h-[56px] transition-all hover:bg-red-100 hover:scale-105 active:scale-95"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, capitalize }: { label: string; value: string; capitalize?: boolean }) {
  return (
    <div className="bg-[#f8f9fa] rounded-xl p-4 transition-all duration-200 hover:bg-[#f0f1f3]">
      <p className="font-bold text-[13px] text-[rgba(0,0,0,0.5)] mb-1 uppercase tracking-wide">{label}</p>
      <p className={`font-bold text-[18px] text-[#1e1e1e] ${capitalize ? "capitalize" : ""}`}>{value}</p>
    </div>
  );
}
