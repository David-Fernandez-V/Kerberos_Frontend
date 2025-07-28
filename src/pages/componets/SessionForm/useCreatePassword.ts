import { useMutation } from "@tanstack/react-query";
import { passwordForm } from "../../../schemas/passwordSchema";

import axios from "axios";

interface NewPasswordResponse {
  confirmation: string;
}

const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/passwords/create`;

export default function useCreatePassword() {
  return useMutation<NewPasswordResponse, unknown, passwordForm>({
    mutationFn: async (newPassword) => {
      const response = await axios.post<NewPasswordResponse>(url, newPassword, {
        withCredentials: true,
      });

      return response.data;
    },
  });
}