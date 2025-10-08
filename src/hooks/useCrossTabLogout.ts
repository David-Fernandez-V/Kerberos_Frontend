import { useEffect } from "react";
import { useAuthStore } from "../states/AuthStore";

export default function useCrossTabLogout() {
  const { logout } = useAuthStore();

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "logout_event") {
        logout();
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [logout]);
}
