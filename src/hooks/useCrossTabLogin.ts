import { useEffect } from "react";
import { useAuthStore } from "../states/AuthStore";
import { useNavigate } from "react-router-dom";

export default function useCrossTabLogin() {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "login_event") {
        navigate("/dashboard");
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [login]);
}
