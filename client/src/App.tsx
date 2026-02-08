import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Landing from "@/pages/auth/Landing";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import PatientLayout from "@/pages/patient/PatientLayout";
import Dashboard from "@/pages/patient/Dashboard";
import Chat from "@/pages/patient/Chat";
import History from "@/pages/patient/History";
import MedicationLookup from "@/pages/patient/MedicationLookup";
import Profile from "@/pages/patient/Profile";
import Appointments from "@/pages/patient/Appointments";
import DoctorLayout from "@/pages/doctor/DoctorLayout";
import DoctorDashboard from "@/pages/doctor/DoctorDashboard";
import IntakeReview from "@/pages/doctor/IntakeReview";
import PatientList from "@/pages/doctor/PatientList";
import DoctorProfile from "@/pages/doctor/DoctorProfile";

function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-dvh bg-[#e8f4f4] flex items-center justify-center">
        <p className="text-[rgba(0,0,0,0.5)] animate-pulse text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/" replace />;
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === "doctor" ? "/doctor" : "/patient"} replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Patient Routes */}
      <Route
        path="/patient"
        element={
          <ProtectedRoute requiredRole="patient">
            <PatientLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="chat" element={<Chat />} />
        <Route path="history" element={<History />} />
        <Route path="medications" element={<MedicationLookup />} />
        <Route path="profile" element={<Profile />} />
        <Route path="appointments" element={<Appointments />} />
      </Route>

      {/* Doctor Routes */}
      <Route
        path="/doctor"
        element={
          <ProtectedRoute requiredRole="doctor">
            <DoctorLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DoctorDashboard />} />
        <Route path="intake/:id" element={<IntakeReview />} />
        <Route path="patients" element={<PatientList />} />
        <Route path="profile" element={<DoctorProfile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
