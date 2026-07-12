import React, { useContext } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { PrivateAppLayout } from "@/layout/privateAppLayout";
import { AuthContext } from "@/context/authContext";

import { ProDashboard, ProBalance, ProHistory } from "@/pages/auth/pro";
import { ClientHistory } from "@/pages/auth/client/clientHistory";
import { ClientSettings } from "@/pages/auth/client/clientSettings";
import { ClientHome } from "@/pages/auth/client/clientHome";
import { ProSettings } from "@/pages/auth/pro/proSettings";
import { RequestCreate, RequestStatus } from "@/pages/auth/client";

function ProtectedRoute({ requiredRole }: { requiredRole?: "customer" | "provider" | "admin" }) {
  const { user, loading } = useContext(AuthContext)!;

  if (loading) return null;

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    const redirect = user.role === "provider" ? "/pro/dashboard" : "/client/dashboard";
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
}

function AuthRoutes() {
  return (
    <React.Fragment>
      <Route element={<ProtectedRoute requiredRole="customer" />}>
        <Route element={<PrivateAppLayout />}>
          <Route path="/client/history" element={<ClientHistory />} />
          <Route path="/client/settings" element={<ClientSettings />} />
          <Route path="/client/dashboard" element={<ClientHome />} />
          <Route path="/client/request/create" element={<RequestCreate />} />
          <Route path="/client/request/:id" element={<RequestStatus />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute requiredRole="provider" />}>
        <Route element={<PrivateAppLayout />}>
          <Route path="/pro/dashboard" element={<ProDashboard />} />
          <Route path="/pro/balance" element={<ProBalance />} />
          <Route path="/pro/history" element={<ProHistory />} />
          <Route path="/pro/settings" element={<ProSettings />} />
        </Route>
      </Route>
    </React.Fragment>
  );
}

export { AuthRoutes };
