import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import logoImg from "@/assets/logo.png";
import profileImg from "@/assets/profile.png";
import pillImg from "@/assets/pill.png";
import { svgPaths } from "@/components/shared/svg-paths";

function ClipboardIcon() {
  return (
    <div className="h-[74px] w-[87px]">
      <svg className="block size-full" fill="none" viewBox="0 0 87 74">
        <path d={svgPaths.clipboard} stroke="#FF9230" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      </svg>
    </div>
  );
}

function MagnifyIcon() {
  return (
    <div className="size-[63px]">
      <svg className="block size-full" fill="none" viewBox="0 0 63 63">
        <path d={svgPaths.magnify} fill="#F29D38" />
      </svg>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-[#e8f4f4] shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <p className="font-bold text-[20px] text-[rgba(0,0,0,0.3)] mb-4">
            Patient Portal
          </p>
          <div className="relative bg-white border-4 border-[#4A9EFF] rounded-lg p-8 flex items-center justify-between gap-6">
            <div className="flex-1 flex items-center justify-center gap-6">
              <div className="size-[100px] flex-shrink-0">
                <img alt="BridgeCare Logo" className="w-full h-full object-contain" src={logoImg} />
              </div>
              <p className="font-bold text-[36px] text-[#f29d38] whitespace-nowrap">
                BridgeCare
              </p>
            </div>
            <button
              className="w-[70px] h-[70px] transition-all duration-200 hover:scale-110 active:scale-95 rounded-full flex-shrink-0"
              onClick={() => navigate("/patient/profile")}
              aria-label="Profile"
            >
              <img alt="Profile" className="w-full h-full object-contain" src={profileImg} />
            </button>
          </div>
          {user && (
            <p className="text-[14px] text-[rgba(0,0,0,0.5)] mt-2 text-center">
              Welcome back, {user.fullName}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="max-w-md mx-auto px-6 py-4 space-y-4">
          {/* Start an Intake */}
          <button
            onClick={() => navigate("/patient/chat")}
            className="w-full bg-white rounded-lg p-4 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-[rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
          >
            <div className="rounded-lg p-4 flex items-center gap-4">
              <div className="transition-transform duration-300 hover:scale-110">
                <ClipboardIcon />
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold text-[24px] text-[#1e1e1e] mb-1">Start an Intake</p>
                <p className="font-medium text-[12px] text-[rgba(0,0,0,0.6)]">
                  Describe symptoms, get guidance from AI
                </p>
              </div>
            </div>
          </button>

          {/* History and Medication Lookup Row */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/patient/history")}
              className="w-full bg-white rounded-lg p-4 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-[rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-lg h-[150px] flex flex-col items-center justify-center active:scale-[0.98]"
            >
              <div className="mb-2"><MagnifyIcon /></div>
              <p className="font-bold text-[15px] text-[rgba(0,0,0,0.5)] text-center">History</p>
            </button>

            <button
              onClick={() => navigate("/patient/medications")}
              className="w-full bg-white rounded-lg p-4 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-[rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-lg h-[150px] flex flex-col items-center justify-center active:scale-[0.98]"
            >
              <div className="mb-2">
                <img alt="" className="h-[49px] w-[59px] object-contain" src={pillImg} />
              </div>
              <p className="font-bold text-[15px] text-[rgba(0,0,0,0.5)] text-center">Medication Lookup</p>
            </button>
          </div>

          {/* Appointments */}
          <button
            onClick={() => navigate("/patient/appointments")}
            className="w-full bg-white rounded-lg p-4 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-[rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <p className="font-bold text-[20px] text-[rgba(0,0,0,0.5)]">View Appointments</p>
              <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24" stroke="#f29d38" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          <div className="h-8" />
        </div>
      </div>
    </div>
  );
}
