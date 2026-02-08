import { useState } from "react";
import imgImage2 from "figma:asset/87d22ec1682c8334f0d0cef5b1f394590dc44d61.png";

function PrimaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#f29d38] h-[50px] w-[240px] rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#e08d28] hover:scale-110 active:scale-95 hover:shadow-lg"
    >
      <span className="font-['Helvetica:Regular',sans-serif] text-[16px] text-white">
        {children}
      </span>
    </button>
  );
}

function SecondaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white h-[50px] w-[240px] rounded-lg flex items-center justify-center cursor-pointer border-2 border-[#f29d38] transition-all duration-200 hover:bg-[#fff5eb] hover:scale-110 active:scale-95 hover:shadow-lg"
    >
      <span className="font-['Helvetica:Regular',sans-serif] text-[16px] text-[#f29d38]">
        {children}
      </span>
    </button>
  );
}

export default function MainMenu() {
  const [selectedPortal, setSelectedPortal] = useState<string | null>(null);

  return (
    <div className="bg-[#e8f4f4] relative size-full flex items-center justify-center" data-name="Main Menu">
      <div className="flex flex-col items-center gap-8 w-full max-w-md px-8">
        {/* Logo/Mascot Image with BridgeCare Branding */}
        <div className="relative flex flex-col items-center -mb-4">
          <div className="relative w-[290px] h-[290px] transition-transform duration-300 hover:scale-110">
            <div className="absolute inset-0 overflow-hidden">
              <img 
                alt="BridgeCare Mascot" 
                className="absolute left-[-0.12%] max-w-none size-full top-[2.5%]" 
                src={imgImage2} 
              />
            </div>
          </div>
          
          {/* BridgeCare Branding - Overlapping */}
          <h1 
            className="font-['SF_Pro:Bold',sans-serif] font-bold text-[#f29d38] text-[40px] text-center -mt-8 drop-shadow-lg"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            BridgeCare
          </h1>
        </div>

        {/* Welcome Section */}
        <div className="flex flex-col gap-2 items-center w-[240px]">
          <h2 className="font-['Helvetica:Regular',sans-serif] text-[#333] text-[28px] text-center">
            Welcome
          </h2>
          <p className="font-['Helvetica:Regular',sans-serif] text-[#666] text-[14px] text-center">
            Please select your portal
          </p>
        </div>

        {/* Button Container */}
        <div className="flex flex-col gap-4 w-[240px]">
          <PrimaryButton onClick={() => setSelectedPortal('patient')}>
            Patient Portal
          </PrimaryButton>
          <SecondaryButton onClick={() => setSelectedPortal('doctor')}>
            Doctor Portal
          </SecondaryButton>
        </div>

        {/* Register Link */}
        <div className="mt-4">
          <p className="font-['Helvetica:Regular',sans-serif] text-[#666] text-[13px] text-center">
            Don't have an account?{' '}
            <button 
              className="text-[#f29d38] hover:underline cursor-pointer transition-all duration-200 hover:scale-105 inline-block"
              onClick={() => console.log('Register clicked')}
            >
              Register for free
            </button>
          </p>
        </div>

        {/* Selection feedback - expandable section */}
        {selectedPortal && (
          <div 
            className="bg-white rounded-lg p-4 w-[240px] shadow-lg transition-all duration-500 ease-in-out hover:shadow-xl"
            style={{
              animation: 'slideDown 500ms ease-in-out',
              opacity: 1,
              transform: 'translateY(0)'
            }}
          >
            <p className="text-[#2c2c2c] text-center text-[14px]">
              Redirecting to {selectedPortal === 'patient' ? 'Patient' : 'Doctor'} Portal...
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}