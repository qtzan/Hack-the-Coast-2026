interface StatusButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "success";
  className?: string;
}

export function StatusButton({
  children,
  onClick,
  variant = "primary",
  className = "",
}: StatusButtonProps) {
  const baseStyles =
    "font-['SF_Pro:Bold',sans-serif] font-bold text-[16px] transition-all duration-200 hover:scale-110 active:scale-95";

  const variantStyles = {
    primary: "bg-[#2c2c2c] text-white hover:bg-[#1a1a1a]",
    success: "bg-[#c1fecc] text-[#1e1e1e] hover:bg-[#aef7b9]",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={{
        fontVariationSettings: "'wdth' 100",
        borderRadius: "8px",
        padding: "8px",
      }}
    >
      {children}
    </button>
  );
}
