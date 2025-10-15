import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/users/change-email`;

interface ChangeEmailRequest {
   token: string;
}

interface ChangeEmailResponse {
  message: string;
}

export default function useChangeEmail() {
  const toast_hook = useToast();
  const toast_info = useToast();
  
  return useMutation<ChangeEmailResponse, Error, ChangeEmailRequest>({
    mutationFn: async (data: ChangeEmailRequest) => {
      const response = await axios.post<ChangeEmailResponse>(
        url,
        null,
        {
          params: { token: data.token },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast_hook({
        id: "correo-verificado",
        title: "Correo verificado",
        description: data.message || "Tu correo ha sido modificado correctamente.",
        status: "success",
        duration: 15000,
        isClosable: true,
        position: "bottom-right",
      });
      setTimeout(() => {
        toast_info({
          id: "sesiones-cerradas",
          title: "Sesiones cerradas",
          description: "Por seguridad se han cerrado todas la sesiones activas. Inicia sesión con tu nuevo correo",
          status: "info",
          duration: 15000,
          isClosable: true,
          position: "bottom-right",
        });
      }, 100)
    },
    onError: (error: any) => {
      toast_hook({
        title: "Error",
        description: error.response?.data?.detail || error.message || "Ocurrió un error al verificar el correo",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    },
  });
}
