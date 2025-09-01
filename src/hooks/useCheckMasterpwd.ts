import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { NoteDetailItem } from "../types";

const API_URL = import.meta.env.VITE_API_URL;
const URL = `${API_URL}/users/check-masterpassword`;

interface UserRequest {
  master_password: string
}

export default function useCheckMasterpwd() {
  return useMutation({
    mutationFn: async ({ master_password }: UserRequest) => {
              
      const response = await axios.post<NoteDetailItem>(
        URL,
        master_password,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
  });
}