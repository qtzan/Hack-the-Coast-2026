import { useState } from "react";
import svgPaths from "../../imports/svg-tmvj99bwmv";
import { InteractiveCard } from "./InteractiveCard";

interface CreateAccountStep2Props {
  onBack?: () => void;
  onSubmit?: (data: PersonalDetailsData) => void;
  onLoginClick?: () => void;
}

export interface PersonalDetailsData {
  fullName: string;
  dateOfBirth: string;
  age: string;
  sex: string;
  weight: string;
  allergies: string;
  emergencyContact: string;
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

export function CreateAccountStep2({ onBack, onSubmit, onLoginClick }: CreateAccountStep2Props) {
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [weight, setWeight] = useState("");
  const [allergies, setAllergies] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({
      fullName,
      dateOfBirth,
      age,
      sex,
      weight,
      allergies,
      emergencyContact,
    });
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
            Step 2 of 2
          </p>
          {/* Progress Bar - 100% complete */}
          <div className="w-full h-[6px] bg-[#e0e0e0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#f29d38] rounded-full transition-all duration-500 ease-in-out"
              style={{ width: "100%" }}
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
                Personal Details
              </h2>
              <p
                className="font-['SF_Pro:Bold',sans-serif] font-bold text-[11px] text-[rgba(0,0,0,0.52)]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Complete the following details to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name Field */}
              <div>
                <label
                  htmlFor="fullName"
                  className="font-['SF_Pro:Bold',sans-serif] font-bold text-[16px] text-[#1e1e1e] block mb-2"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-black rounded-xl bg-white font-['SF_Pro:Bold',sans-serif] font-bold text-[16px] text-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-[#f29d38] focus:border-[#f29d38] transition-all duration-200"
                  style={{ fontVariationSettings: "'wdth' 100", height: "48px" }}
                />
              </div>

              {/* Date of Birth Field */}
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="font-['SF_Pro:Bold',sans-serif] font-bold text-[16px] text-[#1e1e1e] block mb-2"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Date of Birth
                </label>
                <input
                  id="dateOfBirth"
                  type="text"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  placeholder="YYYY-MM-DD"
                  className="w-full px-4 py-3 border-2 border-black rounded-xl bg-white font-['SF_Pro:Bold',sans-serif] font-bold text-[16px] text-[#1e1e1e] placeholder:text-[rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 focus:ring-[#f29d38] focus:border-[#f29d38] transition-all duration-200"
                  style={{ fontVariationSettings: "'wdth' 100", height: "48px" }}
                />
              </div>

              {/* Age Field */}
              <div>
                <label
                  htmlFor="age"
                  className="font-['SF_Pro:Bold',sans-serif] font-bold text-[16px] text-[#1e1e1e] block mb-2"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Age
                </label>
                <input
                  id="age"
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-black rounded-xl bg-white font-['SF_Pro:Bold',sans-serif] font-bold text-[16px] text-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-[#f29d38] focus:border-[#f29d38] transition-all duration-200"
                  style={{ fontVariationSettings: "'wdth' 100", height: "48px" }}
                />
              </div>

              {/* Sex Field */}
              <div>
                <label
                  htmlFor="sex"
                  className="font-['SF_Pro:Bold',sans-serif] font-bold text-[16px] text-[#1e1e1e] block mb-2"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Sex
                </label>
                <div className="relative">
                  <select
                    id="sex"
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    className="w-full px-4 py-3 pr-10 border-2 border-black rounded-xl bg-white font-['SF_Pro:Bold',sans-serif] font-bold text-[16px] text-[#1e1e1e] appearance-none focus:outline-none focus:ring-2 focus:ring-[#f29d38] focus:border-[#f29d38] transition-all duration-200"
                    style={{ fontVariationSettings: "'wdth' 100", height: "48px" }}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                      <path d="M1 1L6 6L11 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Weight Field */}
              <div>
                <label
                  htmlFor="weight"
                  className="font-['SF_Pro:Bold',sans-serif] font-bold text-[16px] text-[#1e1e1e] block mb-2"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Weight (lbs)
                </label>
                <input
                  id="weight"
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-black rounded-xl bg-white font-['SF_Pro:Bold',sans-serif] font-bold text-[16px] text-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-[#f29d38] focus:border-[#f29d38] transition-all duration-200"
                  style={{ fontVariationSettings: "'wdth' 100", height: "48px" }}
                />
              </div>

              {/* Allergies Field */}
              <div>
                <label
                  htmlFor="allergies"
                  className="font-['SF_Pro:Bold',sans-serif] font-bold text-[16px] text-[#1e1e1e] block mb-2"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Allergies
                </label>
                <input
                  id="allergies"
                  type="text"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  placeholder="None or list allergies"
                  className="w-full px-4 py-3 border-2 border-black rounded-xl bg-white font-['SF_Pro:Bold',sans-serif] font-bold text-[16px] text-[#1e1e1e] placeholder:text-[rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 focus:ring-[#f29d38] focus:border-[#f29d38] transition-all duration-200"
                  style={{ fontVariationSettings: "'wdth' 100", height: "48px" }}
                />
              </div>

              {/* Emergency Contact Field */}
              <div>
                <label
                  htmlFor="emergencyContact"
                  className="font-['SF_Pro:Bold',sans-serif] font-bold text-[16px] text-[#1e1e1e] block mb-2"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Emergency Contact
                </label>
                <input
                  id="emergencyContact"
                  type="tel"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  placeholder="(XXX) XXX-XXXX"
                  className="w-full px-4 py-3 border-2 border-black rounded-xl bg-white font-['SF_Pro:Bold',sans-serif] font-bold text-[16px] text-[#1e1e1e] placeholder:text-[rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 focus:ring-[#f29d38] focus:border-[#f29d38] transition-all duration-200"
                  style={{ fontVariationSettings: "'wdth' 100", height: "48px" }}
                />
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
            Complete Registration
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