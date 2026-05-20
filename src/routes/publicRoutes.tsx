import { Route } from "react-router-dom";

import {
  Home,
  Login,
  Register,
  ForgotPassword,
  About,
  BePro,
  Verify,
} from "@/pages/public";

function PublicRoutes() {
  return (
    <>
      <Route path="/sobre" element={<About />} />
      <Route path="/profissionais" element={<BePro />} />
      <Route path="/login" element={<Login />} />

      <Route path="/verify" element={<Verify />} />
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
     { /*<Route path="/auth/register" element={<Register />} />*/}
      <Route path="/registro" element={<Register />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
    </>
  );
}

export { PublicRoutes };
