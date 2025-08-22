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
  });
}