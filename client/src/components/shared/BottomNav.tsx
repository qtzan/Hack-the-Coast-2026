import { useLocation, useNavigate } from "react-router-dom";
import { Home, MessageSquare, Clock, Pill, User } from "lucide-react";

const navItems = [
  { path: "/patient", icon: Home, label: "Home" },
  { path: "/patient/chat", icon: MessageSquare, label: "Chat" },
  { path: "/patient/history", icon: Clock, label: "History" },
  { path: "/patient/medications", icon: Pill, label: "Meds" },
  { path: "/patient/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto flex items-center justify-around h-[64px]">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-1 px-3 py-1 transition-all duration-200 ${
                isActive ? "text-[#f29d38]" : "text-gray-400"
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-[10px] font-semibold">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
