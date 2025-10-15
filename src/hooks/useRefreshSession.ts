import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../states/AuthStore";

const API_URL = import.meta.env.VITE_API_URL;

export default function useRefreshSession() {
  const { isAuthenticated, logout } = useAuthStore();

  const lastActivityRef = useRef<number>(Date.now());
  const lastRefreshRef = useRef<number>(Date.now());

  // Leer configuración desde localStorage
  const [inactivityLimit, setInactivityLimit] = useState<string>(() => {
    return localStorage.getItem("inactivityLimit") || "15"; // por defecto: 15 minutos
  });

  useEffect(() => {
    if (!isAuthenticated) return;

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

      // 🔒 Solo cerrar sesión si la opción no es "never"
      if (inactivityLimit !== "never") {
        const limitMinutes = parseInt(inactivityLimit, 10);
        if (minutesSinceLastActivity >= limitMinutes) {
          console.warn("Inactividad prolongada. Cerrando sesión...");
          logout("inactivity");
          clearInterval(interval);
          return;
        }
      }

      // 🔄 Refrescar token cada 59 minutos
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

    }, 60 * 1000);

    return () => {
      clearInterval(interval);
      activityEvents.forEach(event =>
        window.removeEventListener(event, updateActivity)
      );
    };
  }, [isAuthenticated, logout, inactivityLimit]);

  // Guardar valor nuevo en localStorage
  const updateInactivityLimit = (newLimit: string) => {
    setInactivityLimit(newLimit);
    localStorage.setItem("inactivityLimit", newLimit);
  };

  return { inactivityLimit, updateInactivityLimit };
}
