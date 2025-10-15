import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/users/change-password`;

interface ChangePasswordRequest {
  new_password: string;
  master_password: string;
  //confirm_password: string;
}

interface ChangePasswordResponse {
  message: string;
}

export default function useChangePassword() {
  const toast = useToast();

  return useMutation<ChangePasswordResponse, unknown, ChangePasswordRequest>({
    mutationFn: async ({ new_password, master_password, /*confirm_password*/ }) => {
      const response = await axios.post<ChangePasswordResponse>(
        url,
        { new_password, master_password, /*confirm_password*/},
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (response) => {
      toast({
        title: "Éxito",
        description:
        response.message || "Contraseña maestra modificada correctamente.",
        status: "success",
        duration: 15000,
        isClosable: true,
        position: "bottom-right",
      });
      toast({
        id: "sesiones-cerradas",
        title: "Sesiones cerradas",
        description: "Por seguridad se han cerrado todas la sesiones activas. Inicia sesión con tu nueva contraseña",
        status: "info",
        duration: 15000,
        isClosable: true,
        position: "bottom-right",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error.response?.data?.detail || "No se pudo modificar la contraseña.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    },
  });
}
