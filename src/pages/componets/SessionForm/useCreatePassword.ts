import { useMutation } from "@tanstack/react-query";
import { passwordForm } from "../../../schemas/passwordSchema";

import axios from "axios";
import { useToast } from "@chakra-ui/react";

interface NewPasswordResponse {
  confirmation: string;
}

const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/passwords/create`;

export default function useCreatePassword() {
  const toast = useToast()

  return useMutation<NewPasswordResponse, unknown, passwordForm>({
    mutationFn: async (newPassword) => {
      const response = await axios.post<NewPasswordResponse>(url, newPassword, {
        withCredentials: true,
      });

      return response.data;
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "No se pudo guardar la sesión",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
    },
  });
}