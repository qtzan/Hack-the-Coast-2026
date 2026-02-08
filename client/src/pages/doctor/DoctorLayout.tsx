import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Home, Users, User, LogOut } from "lucide-react";

export default function DoctorLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { path: "/doctor", icon: Home, label: "Dashboard" },
    { path: "/doctor/patients", icon: Users, label: "Patients" },
    { path: "/doctor/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="bg-[#e8f4f4] min-h-dvh pb-[72px]">
      <Outlet />
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
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 px-3 py-1 text-gray-400 transition-all"
          >
            <LogOut size={22} strokeWidth={1.5} />
            <span className="text-[10px] font-semibold">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
