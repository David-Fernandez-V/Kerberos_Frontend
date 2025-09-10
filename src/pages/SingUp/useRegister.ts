import { useMutation } from "@tanstack/react-query";
import { registrationForm } from "../../schemas/registrationSchema";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/users/register`;

export default function useRegister() {
  return useMutation({
    mutationFn: (registerData: registrationForm) =>
      axios.post(url, registerData, { withCredentials: true }),

    onError: (error) => {
      console.error("Error en register:", error);
    },
  });
}
