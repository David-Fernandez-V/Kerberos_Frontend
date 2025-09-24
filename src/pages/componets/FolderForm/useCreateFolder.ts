import { useMutation } from "@tanstack/react-query";
import { folderForm } from "../../../schemas/folderSchema";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

interface NewFolderResponse {
  confirmation: string;
}

const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/folders/create`;

export default function useCreateFolder() {
  const toast = useToast()
  
  return useMutation<NewFolderResponse, unknown, folderForm>({
    mutationFn: async (newFolder) => {
      const response = await axios.post<NewFolderResponse>(url, newFolder, {
        withCredentials: true,
      });

      return response.data;
    },
        onSuccess: (response) => {
      toast({
          title: "Nueva carpeta creada",
          description:
            response.confirmation || "Los datos se guardaron correctamente.",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "No se pudo crear la carpeta",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    },
  });
}