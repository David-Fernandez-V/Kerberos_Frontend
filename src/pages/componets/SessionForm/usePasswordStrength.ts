import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_AI_URL;
const url = `${API_URL}/passwords/analyze`;

interface StrengthResponse {
  strength_level: number;
}

export default function usePasswordStrength() {
  return useMutation<StrengthResponse, unknown, string>({
    mutationFn: async (password) => {
      const response = await axios.post(url, {
        password,
      });
      return response.data;
    },
  });
}
