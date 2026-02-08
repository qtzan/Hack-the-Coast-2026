import { ReactNode } from "react";

interface ExpandableSectionProps {
  isExpanded: boolean;
  children: ReactNode;
  maxHeight?: string;
}

export function ExpandableSection({
  isExpanded,
  children,
  maxHeight = "500px",
}: ExpandableSectionProps) {
  return (
    <div
      className="overflow-hidden transition-all duration-500 ease-in-out"
      style={{
        maxHeight: isExpanded ? maxHeight : "0px",
        opacity: isExpanded ? 1 : 0,
        transform: isExpanded ? "translateY(0)" : "translateY(-10px)",
        marginTop: isExpanded ? "8px" : "0",
      }}
    >
      {children}
    </div>
  );
}
