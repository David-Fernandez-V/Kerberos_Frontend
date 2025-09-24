import { useMutation } from "@tanstack/react-query";
import { noteForm } from "../../../schemas/noteSchema";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

interface ModifyNoteRequest {
  new_data: noteForm;
  note_request: {
    note_id: number;
    master_password?: string;
  };
}

interface ModifyNoteResponse {
  confirmation: string;
}

const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/notes/modify`;

export default function useModifyNote() {
  const toast = useToast();

  return useMutation<ModifyNoteResponse, unknown, ModifyNoteRequest>({
    mutationFn: async ({ new_data, note_request }) => {
      const response = await axios.post<ModifyNoteResponse>(
        url,
        {
          new_data,
          note_request,
        },
        {
          withCredentials: true,
        }
      );

      return response.data;
    },
    onSuccess: (response) => {
      toast({
        title: "Nota modificada",
        description:
          response.confirmation || "Los datos se modificaron correctamente.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error.response?.data?.detail || "No se pudo modificar la nota",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    },
  });
}