// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth"; // Import the useAuth hook

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // If the authentication state is still loading, show a loading indicator.
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#03547c] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-600">Please wait...</p>
        </div>
      </div>
    );
  }

  // If there is no authenticated user, redirect to the login page.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the child routes.
  return <Outlet />;
};

export default ProtectedRoute;
