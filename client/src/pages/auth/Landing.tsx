import { useNavigate } from "react-router-dom";
import logoImg from "@/assets/logo.png";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#e8f4f4] min-h-dvh flex items-center justify-center" data-name="Landing">
      <div className="flex flex-col items-center gap-8 w-full max-w-md px-8">
        <div className="relative flex flex-col items-center -mb-4">
          <div className="relative w-[290px] h-[290px] transition-transform duration-300 hover:scale-110">
            <img
              alt="BridgeCare Mascot"
              className="w-full h-full object-contain"
              src={logoImg}
            />
          </div>
          <h1 className="font-bold text-[#f29d38] text-[40px] text-center -mt-8 drop-shadow-lg">
            BridgeCare
          </h1>
        </div>

        <div className="flex flex-col gap-2 items-center w-[240px]">
          <h2 className="text-[#333] text-[28px] text-center">Welcome</h2>
          <p className="text-[#666] text-[14px] text-center">
            Please select your portal
          </p>
        </div>

        <div className="flex flex-col gap-4 w-[240px]">
          <button
            onClick={() => navigate("/login?role=patient")}
            className="bg-[#f29d38] h-[50px] w-[240px] rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#e08d28] hover:scale-110 active:scale-95 hover:shadow-lg"
          >
            <span className="text-[16px] text-white">Patient Portal</span>
          </button>
          <button
            onClick={() => navigate("/login?role=doctor")}
            className="bg-white h-[50px] w-[240px] rounded-lg flex items-center justify-center cursor-pointer border-2 border-[#f29d38] transition-all duration-200 hover:bg-[#fff5eb] hover:scale-110 active:scale-95 hover:shadow-lg"
          >
            <span className="text-[16px] text-[#f29d38]">Doctor Portal</span>
          </button>
        </div>

        <div className="mt-4">
          <p className="text-[#666] text-[13px] text-center">
            Don't have an account?{" "}
            <button
              className="text-[#f29d38] hover:underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register for free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
