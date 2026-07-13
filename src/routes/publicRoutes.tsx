import { Route } from "react-router-dom";

import {
  Home,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  About,
  BePro,
  Verify,
} from "@/pages/public";
import { ServicesCatalog } from "@/pages/public/servicesCatalog";
import { PublicAppLayout } from "@/layout/publicAppLayout";

function PublicRoutes() {
  return (
    <>
      <Route element={<PublicAppLayout />}>
        <Route path="/sobre" element={<About />} />
        <Route path="/profissionais" element={<BePro />} />
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="/verify" element={<Verify />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route path="/services-catalog" element={<ServicesCatalog />} />
    </>
  );
}

export { PublicRoutes };
