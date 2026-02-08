import { svgPaths } from "./svg-paths";

export function ArrowBack({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-[40px] h-[40px] rounded-full flex items-center justify-center transition-all duration-200 hover:bg-[#f0f0f0] hover:scale-110 active:scale-95"
      aria-label="Go back"
    >
      <svg className="w-[31px] h-[26px]" fill="none" viewBox="0 0 31 26">
        <path d={svgPaths.arrowBack} fill="#1D1B20" />
      </svg>
    </button>
  );
}
