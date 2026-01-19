import { Navigate, Outlet } from "react-router-dom";

export function PrivateLayout() {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
