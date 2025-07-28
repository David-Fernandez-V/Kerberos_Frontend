import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../states/AuthStore";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const PublicRoutes = () => {
  const { isAuthenticated, login, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get(`${API_URL}/authentication/me`, {
          withCredentials: true,
        });
        if (res.status === 200) login();
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  if (loading) {
    return <p>Cargando...</p>; // o un spinner bonito
  }

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoutes;
