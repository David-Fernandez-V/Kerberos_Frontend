import { useEffect, useRef } from "react";
import axios from "axios";
import { useAuthStore } from "../states/AuthStore";

const API_URL = import.meta.env.VITE_API_URL;

export default function useRefreshSession() {
  const { isAuthenticated, logout } = useAuthStore();
  const lastActivityRef = useRef<number>(Date.now());

  useEffect(() => {
    if (!isAuthenticated) return;

    //Actualiza el tiempo de última actividad
    const updateActivity = () => {
      lastActivityRef.current = Date.now();
    };

    const activityEvents = ["mousemove", "keydown", "click", "scroll"];
    activityEvents.forEach(event =>
      window.addEventListener(event, updateActivity)
    );

    //Verifica cada minuto
    const interval = setInterval(async () => {
      const now = Date.now();
      const minutesSinceLastActivity = (now - lastActivityRef.current) / 1000 / 60;

      //Refrescar si hubo actividad en los últimos 5 min
      if (minutesSinceLastActivity < 5) {
        try {
          await axios.get(`${API_URL}/authentication/refresh`, {
            withCredentials: true,
          });
          console.log("Token refrescado");
        } catch (error) {
          console.warn("Error al refrescar token. Cerrando sesión...");
          logout();
        }
      }

      //Cerrar sesión si pasó más de 15 min sin actividad
      if (minutesSinceLastActivity >= 15) {
        console.log("Inactividad prolongada. Cerrando sesión...");
        logout("inactivity");
      }
    }, 60 * 1000); // Cada 1 minuto

    return () => {
      clearInterval(interval);
      activityEvents.forEach(event =>
        window.removeEventListener(event, updateActivity)
      );
    };
  }, [isAuthenticated, logout]);
}