import { Navigate, useLocation } from "react-router-dom";
import { type ReactNode } from "react";
import { type Role } from "@/context/authContext";
//import { useAuth } from "@/hooks/useAuth";

// interface Props {
//   children: ReactNode;
//   role?: Role;
// }

// export const RequireAuth = ({ children, role }: Props) => {
//   const { user, loading} = useAuth();
//   const location = useLocation();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-background">
//         <div className="h-10 w-10 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
//       </div>
//     );
//   }

//   if (!user) {
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }

//   if (role && user.role !== role) {
//     return <Navigate to={user.role === "pro" ? "/pro" : "/app"} replace />;
//   }

//   return <>{children}</>;
// };
