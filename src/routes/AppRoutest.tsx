// routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import Dashboard from "@/pages/Dashboard";
import Layout from "@/components/Layout";
import LoadingSpinner from "@/components/LoadingSpinner";
import Login from "@/pages/auth/Login";
import type { ReactNode } from "react";
import { UserStatistics } from "@/pages/UserStatistics";
import { Settings } from "@/pages/Settings";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

// 📌 Protected sahifalar config
const protectedRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/users",
    element: <UserStatistics />,
  },
   {
    path: "/settings",
    element: <Settings />,
  },
];

const AppRoutes = () => {
  return (
    <Routes>
      {/* Login route alohida qoldirilgan */}
      <Route path="/login" element={<Login />} />

      {/* Protected sahifalar avtomatik generatsiya qilinadi */}
      {protectedRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute>
              <Layout>{element}</Layout>
            </ProtectedRoute>
          }
        />
      ))}

      {/* Default redirects */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
