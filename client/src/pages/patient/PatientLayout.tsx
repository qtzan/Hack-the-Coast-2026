import { Outlet } from "react-router-dom";
import { BottomNav } from "@/components/shared/BottomNav";

export default function PatientLayout() {
  return (
    <div className="bg-[#e8f4f4] min-h-dvh pb-[72px]">
      <Outlet />
      <BottomNav />
    </div>
  );
}
