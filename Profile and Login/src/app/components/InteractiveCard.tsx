import { ReactNode } from "react";

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  enableHover?: boolean;
}

export function InteractiveCard({
  children,
  className = "",
  enableHover = true,
}: InteractiveCardProps) {
  return (
    <div
      className={`bg-white rounded-lg transition-all duration-300 ${
        enableHover ? "hover:shadow-lg" : ""
      } ${className}`}
      style={{ borderRadius: "8px", padding: "16px" }}
    >
      {children}
    </div>
  );
}
