import React, { useContext } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { PrivateAppLayout } from "@/layout/privateAppLayout";
import { AdminAppLayout } from "@/layout/adminAppLayout";
import { AuthContext } from "@/context/authContext";

import { ProDashboard, ProBalance, ProHistory, ProSettings } from "@/pages/auth/pro";
import { ClientHistory } from "@/pages/auth/client/clientHistory";

import { ClientHome } from "@/pages/auth/client/clientHome";
import { RequestCreate, RequestStatus } from "@/pages/auth/client";
import Requests from "@/pages/auth/client/requests";

import Notifications from "@/pages/auth/client/notifications";
import Profile from "@/pages/auth/client/profile";
import Addresses from "@/pages/auth/client/addresses";
import Support from "@/pages/auth/client/support";
import AvailableJobs from "@/pages/auth/pro/jobs";
import Services from "@/pages/auth/pro/services";
import Stats from "@/pages/auth/pro/stats";

import ProNotifs from "@/pages/auth/pro/notifications";
import ProProfile from "@/pages/auth/pro/profile";
import Availability from "@/pages/auth/pro/availability";
import ProSupport from "@/pages/auth/pro/support";
import {
  AdminDashboard, AdminUsers, AdminProviders, AdminRequests,
  AdminCategories, AdminServices, AdminReviews, AdminComplaints,
  AdminTickets, AdminReports, AdminSettings,
} from "@/pages/auth/admin";

function ProtectedRoute({ requiredRole }: { requiredRole?: "customer" | "provider" | "admin" }) {
  const { user, loading } = useContext(AuthContext)!;

  if (loading) return null;

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    const redirect = user.role === "provider" ? "/pro/dashboard" : user.role === "admin" ? "/admin" : "/client/dashboard";
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
}

function AuthRoutes() {
  return (
    <React.Fragment>
      <Route element={<ProtectedRoute requiredRole="customer" />}>
        <Route element={<PrivateAppLayout />}>
          <Route path="/client/dashboard" element={<ClientHome />} />
          <Route path="/client/requests" element={<Requests />} />
          <Route path="/client/request/create" element={<RequestCreate />} />
          <Route path="/client/request/:id" element={<RequestStatus />} />

          <Route path="/client/notifications" element={<Notifications />} />
          <Route path="/client/reviews" element={<ClientHistory />} />
          <Route path="/client/profile" element={<Profile />} />
          <Route path="/client/addresses" element={<Addresses />} />

          <Route path="/client/support" element={<Support />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute requiredRole="provider" />}>
        <Route element={<PrivateAppLayout />}>
          <Route path="/pro/dashboard" element={<ProDashboard />} />
          <Route path="/pro/jobs" element={<AvailableJobs />} />
          <Route path="/pro/services" element={<Services />} />
          <Route path="/pro/history" element={<ProHistory />} />
          <Route path="/pro/balance" element={<ProBalance />} />
          <Route path="/pro/earnings" element={<ProBalance />} />
          <Route path="/pro/stats" element={<Stats />} />

          <Route path="/pro/notifications" element={<ProNotifs />} />
          <Route path="/pro/profile" element={<ProProfile />} />
          <Route path="/pro/availability" element={<Availability />} />
          <Route path="/pro/settings" element={<ProSettings />} />
          <Route path="/pro/support" element={<ProSupport />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute requiredRole="admin" />}>
        <Route element={<AdminAppLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/providers" element={<AdminProviders />} />
          <Route path="/admin/requests" element={<AdminRequests />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
          <Route path="/admin/complaints" element={<AdminComplaints />} />
          <Route path="/admin/tickets" element={<AdminTickets />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
      </Route>
    </React.Fragment>
  );
}

export { AuthRoutes };
