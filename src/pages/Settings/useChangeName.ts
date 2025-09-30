import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/users/change-name`;

interface ChangeNameRequest {
  new_name: string;
}

interface ChangeNameResponse {
  message: string;
}

export default function useChangeName() {
  const toast = useToast();

  return useMutation<ChangeNameResponse, unknown, ChangeNameRequest>({
    mutationFn: async ({ new_name }) => {
      const response = await axios.post<ChangeNameResponse>(
        url,
        { new_name },
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
          response.message || "Nombre modificado correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error.response?.data?.detail || "No se pudo modificar el nombre.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    },
  });
}
