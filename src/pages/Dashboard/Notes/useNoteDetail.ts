import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { NoteDetailItem } from "../../../types";

const API_URL = import.meta.env.VITE_API_URL;
const URL = `${API_URL}/notes/get_detail`;

interface NoteRequest {
  note_id: number
  master_password?: string
}

export default function useNoteDetail() {
  return useMutation({
    mutationFn: async ({ note_id, master_password }: NoteRequest): Promise<NoteDetailItem> => {
      
      const payload: any = {note_id}
      if(master_password !== undefined){
        payload.master_password = master_password
      }
        
      const response = await axios.post<NoteDetailItem>(
        URL,
        payload,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
  });
}