import { useMutation } from "@tanstack/react-query";
import { folderForm } from "../../../schemas/folderSchema";
import axios from "axios";

interface NewFolderResponse {
  confirmation: string;
}

const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/folders/create`;

export default function useCreateFolder() {
  return useMutation<NewFolderResponse, unknown, folderForm>({
    mutationFn: async (newFolder) => {
      console.log("Datos a enviar:", newFolder);
      const response = await axios.post<NewFolderResponse>(url, newFolder, {
        withCredentials: true,
      });

      return response.data;
    },
  });
}