import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const URL = `${API_URL}/passwords/delete`;

interface PasswordRequest {
  password_id: number
  master_password?: string
}

interface DeleteResponse {
    message: string
}

export default function useDeletePassword() {
  const toast = useToast();
  
  return useMutation({
    mutationFn: async ({ password_id, master_password }: PasswordRequest): Promise<DeleteResponse> => {
      const response = await axios.delete<DeleteResponse>(
        URL,
        {
          data: {password_id, ...master_password ? {master_password} : {}},
          withCredentials: true,
        }
      );
      return response.data;
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "No se pudo eliminar la sesión",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
    },
    
  });
}