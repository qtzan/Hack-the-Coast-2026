import svgPaths from "./svg-srbuh1jtmi";
import imgPill from "figma:asset/ac855bfe0b945cbda2cf87dc7b3575e007dfbcef.png";
import imgCutlery from "figma:asset/fb68421e766cb928dc981ce73d3e91bb409981f4.png";

function Content() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[1.4] not-italic relative shrink-0 text-[16px] w-full whitespace-pre-wrap" data-name="Content">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#303030] w-full">High Cholesterol</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#1e1e1e] w-full">{`Prescribed atorvastatin. `}</p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#2c2c2c] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[8px] relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[#f5f5f5] text-[16px]">Read More</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Stack() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative" data-name="Stack">
      <Content />
      <Button />
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-start min-h-px min-w-px relative" data-name="Title">
      <Stack />
    </div>
  );
}

function Notification() {
  return (
    <div className="absolute bg-white content-stretch flex h-[166px] items-center left-[24px] p-[16px] rounded-[8px] top-[236px] w-[352px]" data-name="Notification">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[8px]" />
      <Title />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[1.4] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] w-full whitespace-pre-wrap" data-name="Content">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 w-full">Dieting Tips</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 w-full">{`Focus on eating nutrient-dense foods. `}</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#2c2c2c] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[8px] relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[#f5f5f5] text-[16px]">Read More</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Stack1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative" data-name="Stack">
      <Content1 />
      <Button1 />
    </div>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-start min-h-px min-w-px relative" data-name="Title">
      <Stack1 />
    </div>
  );
}

function Notification1() {
  return (
    <div className="absolute bg-white content-stretch flex h-[166px] items-center left-[24px] p-[16px] rounded-[8px] top-[437px] w-[352px]" data-name="Notification">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[8px]" />
      <Title1 />
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[1.4] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] w-full whitespace-pre-wrap" data-name="Content">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 w-full">Acid Reflux</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 w-full">Prescribed Omeprazole.</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#2c2c2c] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[8px] relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[#f5f5f5] text-[16px]">Read More</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Stack2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative" data-name="Stack">
      <Content2 />
      <Button2 />
    </div>
  );
}

function Title2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-start min-h-px min-w-px relative" data-name="Title">
      <Stack2 />
    </div>
  );
}

function Notification2() {
  return (
    <div className="absolute bg-white content-stretch flex h-[166px] items-center left-[25px] p-[16px] rounded-[8px] top-[652px] w-[352px]" data-name="Notification">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[8px]" />
      <Title2 />
    </div>
  );
}

function Check() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Check">
          <path d={svgPaths.p39be50} id="Icon" stroke="var(--stroke-0, #38EA44)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function TagToggle() {
  return (
    <div className="absolute bg-[#c1fecc] content-stretch flex gap-[8px] h-[27px] items-center justify-center left-[233px] p-[8px] rounded-[8px] top-[756px] w-[112px]" data-name="Tag Toggle">
      <Check />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#38ea44] text-[16px] whitespace-nowrap">
        <p className="leading-none">Prescribed</p>
      </div>
    </div>
  );
}

function Check1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Check">
          <path d={svgPaths.p39be50} id="Icon" stroke="var(--stroke-0, #38EA44)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function TagToggle1() {
  return (
    <div className="absolute bg-[#c1fecc] content-stretch flex gap-[8px] h-[27px] items-center justify-center left-[236px] p-[8px] rounded-[8px] top-[335px] w-[112px]" data-name="Tag Toggle">
      <Check1 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#38ea44] text-[16px] whitespace-nowrap">
        <p className="leading-none">Prescribed</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p32dc8f00} fill="var(--fill-0, #49454F)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function StateLayer1() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center relative shrink-0 w-full" data-name="State-layer">
      <Icon />
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[100px] shrink-0 w-[40px]" data-name="Content">
      <StateLayer1 />
    </div>
  );
}

function LeadingIcon() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-16px] relative shrink-0 size-[48px]" data-name="Leading-icon">
      <Content3 />
    </div>
  );
}

function Content4() {
  return (
    <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px mr-[-16px] relative" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[20px] relative size-full">
          <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#49454f] text-[16px] tracking-[0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[24px]">Search</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.pc423380} fill="var(--fill-0, #49454F)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function StateLayer2() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center relative shrink-0 w-full" data-name="State-layer">
      <Icon1 />
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[100px] shrink-0 w-[40px]" data-name="Content">
      <StateLayer2 />
    </div>
  );
}

function Component1stTrailingIcon() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[48px]" data-name="1st trailing-icon">
      <Content5 />
    </div>
  );
}

function TrailingElements() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex items-center justify-end right-[4px] top-1/2" data-name="Trailing-Elements">
      <Component1stTrailingIcon />
    </div>
  );
}

function StateLayer() {
  return (
    <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="state-layer">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[4px] pr-[20px] py-[4px] relative size-full">
          <LeadingIcon />
          <Content4 />
          <TrailingElements />
        </div>
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="absolute bg-[#ece6f0] content-stretch flex h-[56px] items-center left-[24px] max-w-[720px] overflow-clip rounded-[28px] top-[132px] w-[360px]" data-name="Search bar">
      <StateLayer />
    </div>
  );
}

function ArrowBack() {
  return (
    <div className="absolute h-[26px] left-[16px] top-[43px] w-[31px]" data-name="arrow_back">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 26">
        <g id="arrow_back">
          <path d={svgPaths.p352ba080} fill="var(--fill-0, #1D1B20)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[1.4] not-italic relative shrink-0 text-[16px] w-full whitespace-pre-wrap" data-name="Content">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#303030] w-full">High Cholesterol</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#1e1e1e] w-full">{`Prescribed atorvastatin. `}</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#2c2c2c] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[8px] relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[#f5f5f5] text-[16px]">Read More</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Stack3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative" data-name="Stack">
      <Content6 />
      <Button3 />
    </div>
  );
}

function Title3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-start min-h-px min-w-px relative" data-name="Title">
      <Stack3 />
    </div>
  );
}

function Notification3() {
  return (
    <div className="absolute bg-white content-stretch flex h-[166px] items-center left-[24px] p-[16px] rounded-[8px] top-[236px] w-[352px]" data-name="Notification">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[8px]" />
      <Title3 />
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[1.4] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] w-full whitespace-pre-wrap" data-name="Content">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 w-full">Dieting Tips</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 w-full">{`Focus on eating nutrient-dense foods. `}</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#2c2c2c] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[8px] relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[#f5f5f5] text-[16px]">Read More</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Stack4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative" data-name="Stack">
      <Content7 />
      <Button4 />
    </div>
  );
}

function Title4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-start min-h-px min-w-px relative" data-name="Title">
      <Stack4 />
    </div>
  );
}

function Notification4() {
  return (
    <div className="absolute bg-white content-stretch flex h-[166px] items-center left-[24px] p-[16px] rounded-[8px] top-[437px] w-[352px]" data-name="Notification">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[8px]" />
      <Title4 />
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[1.4] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] w-full whitespace-pre-wrap" data-name="Content">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 w-full">Acid Reflux</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 w-full">Prescribed Omeprazole.</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#2c2c2c] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[8px] relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[#f5f5f5] text-[16px]">Read More</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Stack5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative" data-name="Stack">
      <Content8 />
      <Button5 />
    </div>
  );
}

function Title5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-start min-h-px min-w-px relative" data-name="Title">
      <Stack5 />
    </div>
  );
}

function Notification5() {
  return (
    <div className="absolute bg-white content-stretch flex h-[166px] items-center left-[25px] p-[16px] rounded-[8px] top-[652px] w-[352px]" data-name="Notification">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[8px]" />
      <Title5 />
    </div>
  );
}

function Check2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Check">
          <path d={svgPaths.p39be50} id="Icon" stroke="var(--stroke-0, #38EA44)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function TagToggle2() {
  return (
    <div className="absolute bg-[#c1fecc] content-stretch flex gap-[8px] h-[27px] items-center justify-center left-[233px] p-[8px] rounded-[8px] top-[756px] w-[112px]" data-name="Tag Toggle">
      <Check2 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#38ea44] text-[16px] whitespace-nowrap">
        <p className="leading-none">Prescribed</p>
      </div>
    </div>
  );
}

function Check3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Check">
          <path d={svgPaths.p39be50} id="Icon" stroke="var(--stroke-0, #38EA44)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function TagToggle3() {
  return (
    <div className="absolute bg-[#c1fecc] content-stretch flex gap-[8px] h-[27px] items-center justify-center left-[236px] p-[8px] rounded-[8px] top-[335px] w-[112px]" data-name="Tag Toggle">
      <Check3 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#38ea44] text-[16px] whitespace-nowrap">
        <p className="leading-none">Prescribed</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p32dc8f00} fill="var(--fill-0, #49454F)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function StateLayer4() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center relative shrink-0 w-full" data-name="State-layer">
      <Icon2 />
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[100px] shrink-0 w-[40px]" data-name="Content">
      <StateLayer4 />
    </div>
  );
}

function LeadingIcon1() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-16px] relative shrink-0 size-[48px]" data-name="Leading-icon">
      <Content9 />
    </div>
  );
}

function Content10() {
  return (
    <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px mr-[-16px] relative" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[20px] relative size-full">
          <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#49454f] text-[16px] tracking-[0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[24px]">Search</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.pc423380} fill="var(--fill-0, #49454F)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function StateLayer5() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center relative shrink-0 w-full" data-name="State-layer">
      <Icon3 />
    </div>
  );
}

function Content11() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[100px] shrink-0 w-[40px]" data-name="Content">
      <StateLayer5 />
    </div>
  );
}

function Component1stTrailingIcon1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[48px]" data-name="1st trailing-icon">
      <Content11 />
    </div>
  );
}

function TrailingElements1() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex items-center justify-end right-[4px] top-1/2" data-name="Trailing-Elements">
      <Component1stTrailingIcon1 />
    </div>
  );
}

function StateLayer3() {
  return (
    <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="state-layer">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[4px] pr-[20px] py-[4px] relative size-full">
          <LeadingIcon1 />
          <Content10 />
          <TrailingElements1 />
        </div>
      </div>
    </div>
  );
}

function SearchBar1() {
  return (
    <div className="absolute bg-[#ece6f0] content-stretch flex h-[56px] items-center left-[24px] max-w-[720px] overflow-clip rounded-[28px] top-[132px] w-[360px]" data-name="Search bar">
      <StateLayer3 />
    </div>
  );
}

function ArrowBack1() {
  return (
    <div className="absolute h-[26px] left-[16px] top-[43px] w-[31px]" data-name="arrow_back">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 26">
        <g id="arrow_back">
          <path d={svgPaths.p352ba080} fill="var(--fill-0, #1D1B20)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

export default function History() {
  return (
    <div className="bg-[#e8f4f4] relative size-full" data-name="History">
      <Notification />
      <Notification1 />
      <Notification2 />
      <TagToggle />
      <TagToggle1 />
      <div className="absolute h-[45px] left-[309px] top-[263px] w-[36px]" data-name="Pill">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgPill} />
      </div>
      <div className="absolute h-[45px] left-[312px] top-[685px] w-[36px]" data-name="Pill">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgPill} />
      </div>
      <div className="absolute h-[40px] left-[312px] top-[463px] w-[44px]" data-name="Cutlery">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCutlery} />
      </div>
      <SearchBar />
      <div className="absolute bg-white h-[112px] left-[-5px] top-0 w-[418px]" />
      <p className="-translate-x-1/2 absolute font-['SF_Pro:Bold',sans-serif] font-bold h-[23px] leading-[22px] left-[62.5px] text-[24px] text-black text-center top-[79px] w-[153px] whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        History
      </p>
      <ArrowBack />
      <Notification3 />
      <Notification4 />
      <Notification5 />
      <TagToggle2 />
      <TagToggle3 />
      <div className="absolute h-[45px] left-[309px] top-[263px] w-[36px]" data-name="Pill">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgPill} />
      </div>
      <div className="absolute h-[45px] left-[312px] top-[685px] w-[36px]" data-name="Pill">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgPill} />
      </div>
      <div className="absolute h-[40px] left-[312px] top-[463px] w-[44px]" data-name="Cutlery">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCutlery} />
      </div>
      <SearchBar1 />
      <div className="absolute bg-white h-[112px] left-[-5px] top-0 w-[418px]" />
      <p className="-translate-x-1/2 absolute font-['SF_Pro:Bold',sans-serif] font-bold h-[23px] leading-[22px] left-[62.5px] text-[24px] text-black text-center top-[79px] w-[153px] whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        History
      </p>
      <ArrowBack1 />
    </div>
  );
}