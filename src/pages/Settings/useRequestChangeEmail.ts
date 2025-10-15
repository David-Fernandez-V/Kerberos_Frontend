import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/users/request-email-change`;

interface ChangeEmailRequest {
  new_email: string;
  master_password: string
}

interface ChangeEmailResponse {
  message: string;
}

export default function useRequestChangeEmail() {
  const toast = useToast()

  return useMutation<ChangeEmailResponse, unknown, ChangeEmailRequest>({
    mutationFn: async ({ new_email, master_password }) => {
      const response = await axios.post<ChangeEmailResponse>(
        url,
        { new_email, master_password },
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (response) => {
      toast({
        title: " !Solicitud enviada!",
        description:
          response.message || "Revise su correo para la verificación.",
        status: "success",
        duration: 6000,
        isClosable: true,
        position: "bottom-right",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error.response?.data?.detail || "No se pudo enviar la solicitud de cambio.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    },
  });
}
