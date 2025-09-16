import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const URL = `${API_URL}/notes/delete`;

interface NoteRequest {
  note_id: number
  master_password?: string
}

interface DeleteResponse {
    message: string
}

export default function useNoteDelete() {
  const toast = useToast();
  
  return useMutation({
    mutationFn: async ({ note_id, master_password }: NoteRequest): Promise<DeleteResponse> => {
      const response = await axios.delete<DeleteResponse>(
        URL,
        {
          data: {note_id, ...master_password ? {master_password} : {}},
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast({
          title: "Completado",
          description: "La nota ha sido eliminada con éxito",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "No se pudo eliminar la nota",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    },
  });
}