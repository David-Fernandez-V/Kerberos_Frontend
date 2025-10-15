import { useMutation } from "@tanstack/react-query";
import { noteForm } from "../../../schemas/noteSchema";

import axios from "axios";
import { useToast } from "@chakra-ui/react";

interface NewNoteResponse {
  confirmation: string;
}

const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/notes/create`;

export default function useCreateNote() {
  const toast = useToast()
  
  return useMutation<NewNoteResponse, unknown, noteForm>({
    mutationFn: async (newNote) => {
      const response = await axios.post<NewNoteResponse>(url, newNote, {
        withCredentials: true,
      });

      return response.data;
    },
    onSuccess: (response) => {
      toast({
          title: "Nueva nota creada",
          description:
            response.confirmation || "Los datos se guardaron correctamente.",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "bottom-right",
        });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "No se pudo crear la nota",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
    },
  });
}