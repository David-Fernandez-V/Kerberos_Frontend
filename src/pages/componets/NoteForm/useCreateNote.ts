import { useMutation } from "@tanstack/react-query";
import { noteForm } from "../../../schemas/noteSchema";

import axios from "axios";


interface NewNoteResponse {
  confirmation: string;
}

const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/notes/create`;

export default function useCreateNote() {
  return useMutation<NewNoteResponse, unknown, noteForm>({
    mutationFn: async (newNote) => {
      const response = await axios.post<NewNoteResponse>(url, newNote, {
        withCredentials: true,
      });

      return response.data;
    },
  });
}