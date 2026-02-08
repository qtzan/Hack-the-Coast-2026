import svgPaths from "../../imports/svg-l3cqgft6dg";
import imgProfile from "figma:asset/11cd3964f8015e8e75be890400a725fbbae71d63.png";

interface ProfilePageProps {
  userData?: {
    email?: string;
    fullName?: string;
    dateOfBirth?: string;
    age?: string;
    sex?: string;
    weight?: string;
    allergies?: string;
    emergencyContact?: string;
  };
  onBack?: () => void;
}

function ArrowBackIcon() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 26">
      <g id="arrow_back">
        <path d={svgPaths.p352ba080} fill="currentColor" id="icon" />
      </g>
    </svg>
  );
}

export function ProfilePage({ userData, onBack }: ProfilePageProps) {
  return (
    <div className="bg-[#e8f4f4] min-h-screen flex flex-col">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-white z-10 shadow-sm">
        <div className="relative h-[112px] flex items-end pb-4 px-4">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="absolute left-[17px] top-[43px] w-[40px] h-[40px] rounded-full flex items-center justify-center transition-all duration-200 hover:bg-[#f0f0f0] hover:scale-110 active:scale-95"
            aria-label="Go back"
          >
            <div className="w-[31px] h-[26px] text-[#1D1B20]">
              <ArrowBackIcon />
            </div>
          </button>

          {/* Title */}
          <h1
            className="font-['SF_Pro:Bold',sans-serif] font-bold text-[24px] text-[#1e1e1e] text-center flex-1"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Profile
          </h1>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto pt-[136px] pb-8 px-4">
        <div className="max-w-[400px] mx-auto space-y-6">
          {/* Success Message - Top */}
          <div
            className="bg-gradient-to-r from-[#c1fecc] to-[#a8f5b5] rounded-xl p-5 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-2 border-[#8ee4a0]"
            style={{ borderRadius: "16px" }}
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-[28px]">✓</span>
              <p
                className="font-['SF_Pro:Bold',sans-serif] font-bold text-[18px] text-[#1e1e1e]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Account Successfully Created!
              </p>
            </div>
            <p
              className="font-['SF_Pro:Bold',sans-serif] font-bold text-[13px] text-[rgba(0,0,0,0.6)]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Welcome to BridgeCare
            </p>
          </div>

          {/* Profile Header Card */}
          <div
            className="bg-white rounded-xl transition-all duration-300 hover:shadow-xl shadow-md"
            style={{ borderRadius: "16px", padding: "28px" }}
          >
            <div className="flex flex-col items-center text-center">
              {/* Profile Image */}
              <div className="mb-4 relative group">
                <div className="w-[110px] h-[110px] rounded-full bg-gradient-to-br from-[#f29d38] to-[#e08d28] p-[3px] transition-all duration-300 group-hover:scale-105">
                  <img
                    src={imgProfile}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-4 border-white"
                  />
                </div>
                {/* Active indicator */}
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-[#4ade80] border-4 border-white rounded-full"></div>
              </div>

              {/* User Info */}
              <div>
                <h2
                  className="font-['SF_Pro:Bold',sans-serif] font-bold text-[36px] text-[#1e1e1e] mb-2 leading-tight"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {userData?.fullName || "John Doe"}
                </h2>
                <div className="inline-flex items-center gap-2 bg-[#f29d38] bg-opacity-10 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-[#f29d38] rounded-full"></div>
                  <p
                    className="font-['SF_Pro:Bold',sans-serif] font-bold text-[14px] text-[#f29d38]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    BridgeCare Patient
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Details Card */}
          <div
            className="bg-white rounded-xl transition-all duration-300 hover:shadow-xl shadow-md"
            style={{ borderRadius: "16px", padding: "28px" }}
          >
            <div className="mb-6 text-center">
              <h3
                className="font-['SF_Pro:Bold',sans-serif] font-bold text-[28px] text-[#1e1e1e] mb-2"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Personal Details
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#f29d38] to-transparent mx-auto rounded-full"></div>
            </div>

            <div className="space-y-4">
              {/* Date of Birth */}
              <div className="bg-[#f8f9fa] rounded-xl p-4 transition-all duration-200 hover:bg-[#f0f1f3] hover:scale-[1.01]">
                <p
                  className="font-['SF_Pro:Bold',sans-serif] font-bold text-[13px] text-[rgba(0,0,0,0.5)] mb-1 uppercase tracking-wide"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Date of Birth
                </p>
                <p
                  className="font-['SF_Pro:Bold',sans-serif] font-bold text-[18px] text-[#1e1e1e]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {userData?.dateOfBirth || "YYYY-MM-DD"}
                </p>
              </div>

              {/* Age & Sex Row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Age */}
                <div className="bg-[#f8f9fa] rounded-xl p-4 transition-all duration-200 hover:bg-[#f0f1f3] hover:scale-[1.01]">
                  <p
                    className="font-['SF_Pro:Bold',sans-serif] font-bold text-[13px] text-[rgba(0,0,0,0.5)] mb-1 uppercase tracking-wide"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Age
                  </p>
                  <p
                    className="font-['SF_Pro:Bold',sans-serif] font-bold text-[18px] text-[#1e1e1e]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    {userData?.age || "XX"}
                  </p>
                </div>

                {/* Sex */}
                <div className="bg-[#f8f9fa] rounded-xl p-4 transition-all duration-200 hover:bg-[#f0f1f3] hover:scale-[1.01]">
                  <p
                    className="font-['SF_Pro:Bold',sans-serif] font-bold text-[13px] text-[rgba(0,0,0,0.5)] mb-1 uppercase tracking-wide"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Sex
                  </p>
                  <p
                    className="font-['SF_Pro:Bold',sans-serif] font-bold text-[18px] text-[#1e1e1e] capitalize"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    {userData?.sex || "XX"}
                  </p>
                </div>
              </div>

              {/* Weight */}
              <div className="bg-[#f8f9fa] rounded-xl p-4 transition-all duration-200 hover:bg-[#f0f1f3] hover:scale-[1.01]">
                <p
                  className="font-['SF_Pro:Bold',sans-serif] font-bold text-[13px] text-[rgba(0,0,0,0.5)] mb-1 uppercase tracking-wide"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Weight
                </p>
                <p
                  className="font-['SF_Pro:Bold',sans-serif] font-bold text-[18px] text-[#1e1e1e]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {userData?.weight ? `${userData.weight} lbs` : "XX"}
                </p>
              </div>

              {/* Allergies */}
              <div className="bg-[#fff5e6] border-2 border-[#f29d38] rounded-xl p-4 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <p
                  className="font-['SF_Pro:Bold',sans-serif] font-bold text-[13px] text-[#f29d38] mb-1 uppercase tracking-wide"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  ⚠️ Allergies
                </p>
                <p
                  className="font-['SF_Pro:Bold',sans-serif] font-bold text-[18px] text-[#1e1e1e]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {userData?.allergies || "None reported"}
                </p>
              </div>

              {/* Emergency Contact */}
              <div className="bg-[#ffe6e6] border-2 border-[#ff6b6b] rounded-xl p-4 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                <p
                  className="font-['SF_Pro:Bold',sans-serif] font-bold text-[13px] text-[#ff6b6b] mb-1 uppercase tracking-wide"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  🚨 Emergency Contact
                </p>
                <p
                  className="font-['SF_Pro:Bold',sans-serif] font-bold text-[18px] text-[#1e1e1e]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {userData?.emergencyContact || "(XXX) XXX-XXXX"}
                </p>
              </div>
            </div>
          </div>

          {/* Account Email Info */}
          {userData?.email && (
            <div
              className="bg-white rounded-xl p-5 transition-all duration-300 hover:shadow-lg shadow-md"
              style={{ borderRadius: "16px" }}
            >
              <p
                className="font-['SF_Pro:Bold',sans-serif] font-bold text-[13px] text-[rgba(0,0,0,0.5)] mb-2 uppercase tracking-wide text-center"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Account Email
              </p>
              <p
                className="font-['SF_Pro:Bold',sans-serif] font-bold text-[16px] text-[#1e1e1e] text-center"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {userData.email}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}