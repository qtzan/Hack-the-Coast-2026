import { ArrowBack } from "./ArrowBack";

interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightContent?: React.ReactNode;
}

export function Header({ title, onBack, rightContent }: HeaderProps) {
  return (
    <div className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="relative h-[70px] flex items-center px-4">
        {onBack && (
          <div className="absolute left-4">
            <ArrowBack onClick={onBack} />
          </div>
        )}
        <h1
          className="font-bold text-[24px] text-[#1e1e1e] text-center flex-1"
        >
          {title}
        </h1>
        {rightContent && <div className="absolute right-4">{rightContent}</div>}
      </div>
    </div>
  );
}
