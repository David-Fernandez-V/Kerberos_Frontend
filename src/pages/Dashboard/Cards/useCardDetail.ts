import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CardDetailItem } from "../../../types";

const API_URL = import.meta.env.VITE_API_URL;
const URL = `${API_URL}/cards/get_detail`;

interface CardRequest {
  card_id: number
  master_password?: string
}

export default function useCardDetail() {
  return useMutation({
    mutationFn: async ({ card_id, master_password }: CardRequest): Promise<CardDetailItem> => {
      
      const payload: any = {card_id}
      if(master_password !== undefined){
        payload.master_password = master_password
      }
        
      const response = await axios.post<CardDetailItem>(
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