import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";

interface RoleProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

export default function RoleProtectedRoute({
  children,
  allowedRoles,
}: RoleProtectedRouteProps) {
  const { user } = useAuth();
  const location = useLocation();

  /*
   * User is not logged in.
   *
   * This normally shouldn't happen because this component
   * is already inside ProtectedRoute, but we keep the check
   * here for safety.
   */
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  const userRole = user.role?.toLowerCase();

  /*
   * Check whether this user's role is allowed.
   */
  const hasAccess =
    userRole &&
    allowedRoles.some(
      (role) => role.toLowerCase() === userRole
    );

  /*
   * User is logged in but doesn't have permission.
   */
  if (!hasAccess) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return <>{children}</>;
}