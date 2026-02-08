import { useState } from 'react';
import svgPaths from "../imports/svg-tqfwf26yj1";
import imgImage2 from "figma:asset/87d22ec1682c8334f0d0cef5b1f394590dc44d61.png";
import imgProfile from "figma:asset/11cd3964f8015e8e75be890400a725fbbae71d63.png";
import imgPill from "figma:asset/ac855bfe0b945cbda2cf87dc7b3575e007dfbcef.png";

function KeyboardArrowUp({ className = "" }: { className?: string }) {
  return (
    <div className={`relative size-[38px] ${className}`} data-name="keyboard_arrow_up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g filter="url(#filter0_d_1_88)" id="keyboard_arrow_up">
          <path d={svgPaths.p29aa01c0} fill="var(--fill-0, #F29D38)" id="icon" />
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="46" id="filter0_d_1_88" width="46" x="-4" y="0">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_88" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_88" mode="normal" result="shape" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

function MdiLightMagnify() {
  return (
    <div className="size-[63px]" data-name="mdi-light:magnify">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 63 63">
        <g id="mdi-light:magnify">
          <path d={svgPaths.p2211c900} fill="var(--fill-0, #F29D38)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Clipboard() {
  return (
    <div className="h-[74px] w-[87px]" data-name="Clipboard">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 87 74">
        <g id="Clipboard">
          <path d={svgPaths.pcc5e980} id="Icon" stroke="var(--stroke-0, #FF9230)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

export default function App() {
  const [intakeExpanded, setIntakeExpanded] = useState(false);
  const [historyExpanded, setHistoryExpanded] = useState(false);
  const [medicationExpanded, setMedicationExpanded] = useState(false);
  const [appointmentExpanded, setAppointmentExpanded] = useState(false);

  return (
    <div className="bg-[#e8f4f4] min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-[#e8f4f4] shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Patient Main Menu Title */}
          <p className="font-bold text-[20px] text-[rgba(0,0,0,0.3)] mb-4">
            Patient Main Menu
          </p>
          
          {/* Main Header Container with Blue Border */}
          <div className="relative bg-white border-4 border-[#4A9EFF] rounded-lg p-12 flex items-center justify-between gap-8">
            {/* Logo and BridgeCare - Centered */}
            <div className="flex-1 flex items-center justify-center gap-6">
              <div className="size-[140px] flex-shrink-0">
                <div className="relative w-full h-full overflow-visible pointer-events-none">
                  <img alt="BridgeCare Logo" className="w-full h-full object-contain" src={imgImage2} />
                </div>
              </div>
              <p className="font-bold text-[48px] text-[#f29d38] whitespace-nowrap">
                BridgeCare
              </p>
            </div>

            {/* Profile Button */}
            <button 
              className="w-[100px] h-[100px] transition-all duration-200 hover:scale-110 active:scale-95 rounded-full flex-shrink-0"
              aria-label="Profile"
            >
              <img alt="Profile" className="w-full h-full object-contain" src={imgProfile} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="max-w-md mx-auto px-6 py-4 space-y-4">
          {/* Start an Intake Card */}
          <div className="relative">
            <button
              onClick={() => setIntakeExpanded(!intakeExpanded)}
              className="w-full bg-white rounded-lg p-4 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-[rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-lg"
            >
              <div className="rounded-lg p-4 flex items-center gap-4">
                <div className="transition-transform duration-300 hover:scale-110">
                  <Clipboard />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-[24px] text-[#1e1e1e] mb-1">
                    Start an Intake
                  </p>
                  <p className="font-medium text-[12px] text-[rgba(0,0,0,0.6)]">
                    Describe symptoms, upload photos, and get guidance
                  </p>
                </div>
                <div 
                  className={`transition-all duration-300 hover:scale-110 ${intakeExpanded ? '' : 'rotate-90'}`}
                >
                  <KeyboardArrowUp />
                </div>
              </div>
            </button>
            
            {/* Expandable Content */}
            <div
              className="overflow-hidden transition-all duration-500 ease-in-out"
              style={{
                maxHeight: intakeExpanded ? '500px' : '0px',
                opacity: intakeExpanded ? 1 : 0,
                transform: intakeExpanded ? 'translateY(0)' : 'translateY(-10px)',
                marginTop: intakeExpanded ? '8px' : '0'
              }}
            >
              <div className="bg-white rounded-lg p-4 shadow-md">
                <h3 className="font-bold text-lg mb-3 text-[#1e1e1e]">Start Your Intake</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Tell us about your symptoms and we'll guide you through the process.
                </p>
                <button className="w-full bg-[#c1fecc] hover:bg-[#aef7b9] text-[#1e1e1e] font-bold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95">
                  Begin Intake Form
                </button>
              </div>
            </div>
          </div>

          {/* History and Medication Lookup Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* History Card */}
            <div className="relative">
              <button
                onClick={() => setHistoryExpanded(!historyExpanded)}
                className="w-full bg-white rounded-lg p-4 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-[rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-lg h-[150px] flex flex-col items-center justify-center"
              >
                <div className="mb-2 transition-transform duration-300 hover:scale-110">
                  <MdiLightMagnify />
                </div>
                <p className="font-bold text-[15px] text-[rgba(0,0,0,0.5)] text-center mb-2">
                  History
                </p>
                <div 
                  className={`transition-all duration-300 hover:scale-110 ${historyExpanded ? '' : 'rotate-90'}`}
                >
                  <KeyboardArrowUp className="scale-75" />
                </div>
              </button>
              
              {/* Expandable Content */}
              <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{
                  maxHeight: historyExpanded ? '500px' : '0px',
                  opacity: historyExpanded ? 1 : 0,
                  transform: historyExpanded ? 'translateY(0)' : 'translateY(-10px)',
                  marginTop: historyExpanded ? '8px' : '0'
                }}
              >
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <h3 className="font-bold text-sm mb-2 text-[#1e1e1e]">Medical History</h3>
                  <p className="text-xs text-gray-600 mb-3">
                    View your complete medical records and visit history.
                  </p>
                  <button className="w-full bg-[#2c2c2c] hover:bg-[#1a1a1a] text-white font-bold py-2 px-2 rounded-lg text-xs transition-all duration-200 hover:scale-110 active:scale-95">
                    View History
                  </button>
                </div>
              </div>
            </div>

            {/* Medication Lookup Card */}
            <div className="relative">
              <button
                onClick={() => setMedicationExpanded(!medicationExpanded)}
                className="w-full bg-white rounded-lg p-4 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-[rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-lg h-[150px] flex flex-col items-center justify-center"
              >
                <div className="transition-transform duration-300 hover:scale-110 mb-2">
                  <img alt="" className="h-[49px] w-[59px] object-contain" src={imgPill} />
                </div>
                <p className="font-bold text-[15px] text-[rgba(0,0,0,0.5)] text-center mb-2">
                  Medication Lookup
                </p>
                <div 
                  className={`transition-all duration-300 hover:scale-110 ${medicationExpanded ? '' : 'rotate-90'}`}
                >
                  <KeyboardArrowUp className="scale-75" />
                </div>
              </button>
              
              {/* Expandable Content */}
              <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{
                  maxHeight: medicationExpanded ? '500px' : '0px',
                  opacity: medicationExpanded ? 1 : 0,
                  transform: medicationExpanded ? 'translateY(0)' : 'translateY(-10px)',
                  marginTop: medicationExpanded ? '8px' : '0'
                }}
              >
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <h3 className="font-bold text-sm mb-2 text-[#1e1e1e]">Find Medication</h3>
                  <p className="text-xs text-gray-600 mb-3">
                    Search for medication information and interactions.
                  </p>
                  <button className="w-full bg-[#2c2c2c] hover:bg-[#1a1a1a] text-white font-bold py-2 px-2 rounded-lg text-xs transition-all duration-200 hover:scale-110 active:scale-95">
                    Search Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Appointment Card */}
          <div className="relative">
            <button
              onClick={() => setAppointmentExpanded(!appointmentExpanded)}
              className="w-full bg-white rounded-lg p-4 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-[rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <p className="font-bold text-[20px] text-[rgba(0,0,0,0.5)]">
                  Schedule Appointment
                </p>
                <div 
                  className={`transition-all duration-300 hover:scale-110 ${appointmentExpanded ? '' : 'rotate-90'}`}
                >
                  <KeyboardArrowUp />
                </div>
              </div>
            </button>
            
            {/* Expandable Content */}
            <div
              className="overflow-hidden transition-all duration-500 ease-in-out"
              style={{
                maxHeight: appointmentExpanded ? '500px' : '0px',
                opacity: appointmentExpanded ? 1 : 0,
                transform: appointmentExpanded ? 'translateY(0)' : 'translateY(-10px)',
                marginTop: appointmentExpanded ? '8px' : '0'
              }}
            >
              <div className="bg-white rounded-lg p-4 shadow-md">
                <h3 className="font-bold text-lg mb-3 text-[#1e1e1e]">Book an Appointment</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Choose a date and time that works best for you.
                </p>
                <div className="space-y-2">
                  <button className="w-full bg-[#c1fecc] hover:bg-[#aef7b9] text-[#1e1e1e] font-bold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95">
                    Select Date & Time
                  </button>
                  <button className="w-full bg-[#2c2c2c] hover:bg-[#1a1a1a] text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95">
                    View Upcoming Appointments
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom spacing */}
          <div className="h-8" />
        </div>
      </div>
    </div>
  );
}