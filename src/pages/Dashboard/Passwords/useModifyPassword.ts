import { useMutation } from "@tanstack/react-query";
import { passwordForm } from "../../../schemas/passwordSchema";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

interface ModifyPswRequest {
  new_data: passwordForm;
  password_request: {
    password_id: number;
    master_password?: string;
  };
}

interface ModifyPswResponse {
  confirmation: string;
}

const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/passwords/modify`;

export default function useModifyPassword() {
  const toast = useToast();

  return useMutation<ModifyPswResponse, unknown, ModifyPswRequest>({
    mutationFn: async ({ new_data, password_request }) => {
      const response = await axios.post<ModifyPswResponse>(
        url,
        {
          new_data,
          password_request,
        },
        {
          withCredentials: true,
        }
      );

      return response.data;
    },
    onSuccess: (response) => {
      toast({
        title: "Sesión modificada",
        description:
          response.confirmation || "Los datos se modificaron correctamente.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error.response?.data?.detail || "No se pudo modificar la sesión",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    },
  });
}