import { useMutation } from "@tanstack/react-query";
import { loginForm } from "../../schemas/loginSchema";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/authentication/login`;

export default function useLogin(onSuccess: () => void) {
  return useMutation({
    mutationFn: (loginData: loginForm) =>
      axios.post(url, loginData, { withCredentials: true }),

    onSuccess: () => {
      onSuccess(); // No necesitas token
    },

    onError: (error) => {
      console.error("Error en login:", error);
    },
  });
}
