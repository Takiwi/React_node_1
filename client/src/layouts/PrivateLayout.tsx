import { Navigate, Outlet } from "react-router-dom";
import authApi from "../api/auth.api";
import { useEffect, useState } from "react";

export function PrivateLayout() {
  const [isAuth, setAuth] = useState<boolean | null>(null);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const checkAuth = async () => {
      if (!accessToken) {
        setAuth(false);
        return;
      }

      const res = await authApi.auth(accessToken);

      setAuth(res.success);
    };

    checkAuth();
  }, [accessToken]);

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}
