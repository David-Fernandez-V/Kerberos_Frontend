import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const URL = `${API_URL}/folders/delete`;

interface FolderRequest {
  folder_id: number
}

interface DeleteResponse {
    message: string
}

export default function useDeleteFolder() {
  const toast = useToast();
  
  return useMutation({
    mutationFn: async ({ folder_id }: FolderRequest): Promise<DeleteResponse> => {
      const response = await axios.delete<DeleteResponse>(
        URL,
        {
          data: {folder_id},
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast({
          title: "Completado",
          description: "La carpeta ha sido eliminada con éxito",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "No se pudo eliminar la carpeta",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
    },
  });
}