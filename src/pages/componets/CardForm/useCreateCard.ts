import { useMutation } from "@tanstack/react-query";
import { cardForm } from "../../../schemas/cardSchema";
import axios from "axios";


interface NewCardResponse {
  confirmation: string;
}

const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/cards/create`;

export default function useCreateCard() {
  return useMutation<NewCardResponse, unknown, cardForm>({
    mutationFn: async (newCard) => {
      const response = await axios.post<NewCardResponse>(url, newCard, {
        withCredentials: true,
      });

      return response.data;
    },
  });
}