import { useMutation } from "@tanstack/react-query";
import { generatePswForm } from "../../../schemas/generatePswSchema";

import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/passwords/generate_passwords`;

interface GeneratedResponse {
  password: string;
}

export default function useGeneratePassword() {
  return useMutation<GeneratedResponse, unknown, generatePswForm>({
    mutationFn: async (passwordConfig) => {
      const response = await axios.post<GeneratedResponse>(url, passwordConfig, {
        withCredentials: true,
      });
      
      return response.data;
    },
  });
}
