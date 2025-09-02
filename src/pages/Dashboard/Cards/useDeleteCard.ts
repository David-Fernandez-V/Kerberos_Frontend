import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const URL = `${API_URL}/cards/delete`;

interface CardRequest {
  card_id: number
  master_password?: string
}

interface DeleteResponse {
    message: string
}

export default function useDeleteCard() {
  return useMutation({
    mutationFn: async ({ card_id, master_password }: CardRequest): Promise<DeleteResponse> => {
      const response = await axios.delete<DeleteResponse>(
        URL,
        {
          data: {card_id, ...master_password ? {master_password} : {}},
          withCredentials: true,
        }
      );
      return response.data;
    },
  });
}