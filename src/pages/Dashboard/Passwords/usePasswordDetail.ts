import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { PasswordDetailItem } from "../../../types";

const API_URL = import.meta.env.VITE_API_URL;
const URL = `${API_URL}/passwords/get_detail`;

interface PasswordRequest {
  password_id: number
  master_password?: string
}

export default function usePasswordDetail() {
  return useMutation({
    mutationFn: async ({ password_id, master_password }: PasswordRequest): Promise<PasswordDetailItem> => {
        
      const payload: any = {password_id}
      if(master_password !== undefined){
        payload.master_password = master_password
      }

      const response = await axios.post<PasswordDetailItem>(
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
