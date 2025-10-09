import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../states/AuthStore";

const API_URL = import.meta.env.VITE_API_URL;

export default function useRefreshSession() {
  const { isAuthenticated, logout } = useAuthStore();

  const lastActivityRef = useRef<number>(Date.now());
  const lastRefreshRef = useRef<number>(Date.now());

  // Estado local para guardar el tiempo configurado (minutos)
  const [inactivityLimit, setInactivityLimit] = useState<number>(() => {
    const saved = localStorage.getItem("inactivityLimit");
    return saved ? parseInt(saved, 10) : 15; // valor por defecto: 15 minutos
  });

  useEffect(() => {
    if (!isAuthenticated) return;

    // Registrar actividad del usuario
    const updateActivity = () => {
      lastActivityRef.current = Date.now();
    };

    const activityEvents = ["mousemove", "keydown", "click", "scroll"];
    activityEvents.forEach(event =>
      window.addEventListener(event, updateActivity)
    );

    const interval = setInterval(async () => {
      const now = Date.now();

      const minutesSinceLastActivity =
        (now - lastActivityRef.current) / 1000 / 60;
      const minutesSinceLastRefresh =
        (now - lastRefreshRef.current) / 1000 / 60;

      //Cerrar sesión según el tiempo configurado
      if (minutesSinceLastActivity >= inactivityLimit) {
        console.warn("Inactividad prolongada. Cerrando sesión...");
        logout("inactivity");
        clearInterval(interval);
        return;
      }

      //Refrescar token cada 59 minutos
      if (minutesSinceLastRefresh >= 59) {
        try {
          await axios.get(`${API_URL}/authentication/refresh`, {
            withCredentials: true,
          });
          console.log("Token refrescado automáticamente");
          lastRefreshRef.current = now;
        } catch (error) {
          console.error("Error al refrescar token:", error);
          logout();
          clearInterval(interval);
        }
      }

      console.log("1 minuto");
    }, 60 * 1000); // Comprobar cada minuto

    return () => {
      clearInterval(interval);
      activityEvents.forEach(event =>
        window.removeEventListener(event, updateActivity)
      );
    };
  }, [isAuthenticated, logout, inactivityLimit]); // Se reinicia al cambia el tiempo

  return { inactivityLimit, setInactivityLimit };
}
