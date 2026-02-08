import { useState } from "react";
import svgPaths from "../../imports/svg-tmvj99bwmv";
import { ExpandableSection } from "./ExpandableSection";

interface CreateAccountFormProps {
  onBack?: () => void;
  onSubmit?: (data: { email: string; password: string }) => void;
  onLoginClick?: () => void;
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

export function CreateAccountForm({ onBack, onSubmit, onLoginClick }: CreateAccountFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      onSubmit?.({ email, password });
    }
  };

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
            Create Account
          </h1>
        </div>

        {/* Step Indicator */}
        <div className="px-4 pb-3">
          <p
            className="font-['SF_Pro:Bold',sans-serif] font-bold text-[11px] text-[rgba(0,0,0,0.71)] mb-2"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Step 1 of 2
          </p>
          {/* Progress Bar */}
          <div className="w-full h-[6px] bg-[#e0e0e0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#f29d38] rounded-full transition-all duration-500 ease-in-out"
              style={{ width: "50%" }}
            />
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto pt-[160px] pb-[100px] px-4">
        <div className="max-w-[400px] mx-auto">
          {/* Main Form Card */}
          <div
            className="bg-white rounded-xl transition-all duration-300 hover:shadow-lg"
            style={{ borderRadius: "12px", padding: "20px" }}
          >
            {/* Card Header */}
            <div className="mb-6">
              <h2
                className="font-['SF_Pro:Bold',sans-serif] font-bold text-[20px] text-[#1e1e1e] mb-1"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Account
              </h2>
              <p
                className="font-['SF_Pro:Bold',sans-serif] font-bold text-[11px] text-[rgba(0,0,0,0.52)]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Complete the following details to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="font-['SF_Pro:Bold',sans-serif] font-bold text-[16px] text-[#1e1e1e] block mb-2"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full px-4 py-3 border-2 border-black rounded-xl bg-white font-['SF_Pro:Bold',sans-serif] font-bold text-[16px] text-[#1e1e1e] placeholder:text-[rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 focus:ring-[#f29d38] focus:border-[#f29d38] transition-all duration-200"
                  style={{ fontVariationSettings: "'wdth' 100", height: "48px" }}
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="font-['SF_Pro:Bold',sans-serif] font-bold text-[16px] text-[#1e1e1e] block mb-2"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-black rounded-xl bg-white font-['SF_Pro:Bold',sans-serif] font-bold text-[16px] text-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-[#f29d38] focus:border-[#f29d38] transition-all duration-200"
                    style={{ fontVariationSettings: "'wdth' 100", height: "48px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(0,0,0,0.5)] hover:text-[#1e1e1e] transition-colors duration-200"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="font-['SF_Pro:Bold',sans-serif] font-bold text-[16px] text-[#1e1e1e] block mb-2"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-black rounded-xl bg-white font-['SF_Pro:Bold',sans-serif] font-bold text-[16px] text-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-[#f29d38] focus:border-[#f29d38] transition-all duration-200"
                    style={{ fontVariationSettings: "'wdth' 100", height: "48px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(0,0,0,0.5)] hover:text-[#1e1e1e] transition-colors duration-200"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Expandable Password Requirements Section */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-2 font-['SF_Pro:Bold',sans-serif] font-bold text-[14px] text-[#f29d38] transition-all duration-200 hover:scale-105"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  <span className="transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>▶</span>
                  Password Requirements
                </button>
                <ExpandableSection isExpanded={isExpanded}>
                  <div className="bg-[#fff5e6] border-l-4 border-[#f29d38] rounded-r-lg p-4 space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-[#f29d38] mt-0.5">✓</span>
                      <p
                        className="font-['SF_Pro:Bold',sans-serif] text-[13px] text-[rgba(0,0,0,0.8)]"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        At least 8 characters
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#f29d38] mt-0.5">✓</span>
                      <p
                        className="font-['SF_Pro:Bold',sans-serif] text-[13px] text-[rgba(0,0,0,0.8)]"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        Include uppercase and lowercase letters
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#f29d38] mt-0.5">✓</span>
                      <p
                        className="font-['SF_Pro:Bold',sans-serif] text-[13px] text-[rgba(0,0,0,0.8)]"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        Include at least one number
                      </p>
                    </div>
                  </div>
                </ExpandableSection>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#e8f4f4] pb-6 px-4 pt-4">
        <div className="max-w-[400px] mx-auto space-y-3">
          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#f29d38] text-white font-['SF_Pro:Bold',sans-serif] font-bold text-[16px] transition-all duration-200 hover:bg-[#e08d28] hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
            style={{
              fontVariationSettings: "'wdth' 100",
              borderRadius: "12px",
              padding: "16px 8px",
              height: "56px",
            }}
          >
            Continue
          </button>

          {/* Login Link */}
          <p
            className="font-['SF_Pro:Bold',sans-serif] font-bold text-[11px] text-[rgba(0,0,0,0.58)] text-center"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Already have an account?{" "}
            <button
              type="button"
              onClick={onLoginClick}
              className="underline text-[#f29d38] hover:text-[#e08d28] transition-colors duration-200"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}