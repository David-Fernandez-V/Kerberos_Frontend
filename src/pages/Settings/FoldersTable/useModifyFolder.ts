import { useMutation } from "@tanstack/react-query";
import {folderForm} from "../../../schemas/folderSchema"
import axios from "axios";
import { useToast } from "@chakra-ui/react";

interface ModifyFolderRequest {
  new_data: folderForm;
  folder_request: {
    folder_id: number;
  };
}

interface ModifyFolderResponse {
  confirmation: string;
}

const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/folders/modify`;

export default function useModifyFolder() {
  const toast = useToast();

  return useMutation<ModifyFolderResponse, unknown, ModifyFolderRequest>({
    mutationFn: async ({ new_data, folder_request }) => {
      const response = await axios.post<ModifyFolderResponse>(
        url,
        {
          new_data,
          folder_request,
        },
        {
          withCredentials: true,
        }
      );

      return response.data;
    },
    onSuccess: (response) => {
      toast({
        title: "Carpeta modificada",
        description:
          response.confirmation || "Los datos se modificaron correctamente.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom-right",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error.response?.data?.detail || "No se pudo modificar la Carpeta",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
    },
  });
}