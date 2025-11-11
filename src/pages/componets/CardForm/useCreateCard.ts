import { useMutation } from "@tanstack/react-query";
import { cardForm } from "../../../schemas/cardSchema";
import axios from "axios";
import { useToast } from "@chakra-ui/react";


interface NewCardResponse {
  confirmation: string;
}

const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/cards/create`;

export default function useCreateCard() {
  const toast = useToast()

  return useMutation<NewCardResponse, unknown, cardForm>({
    mutationFn: async (newCard) => {
      const response = await axios.post<NewCardResponse>(url, newCard, {
        withCredentials: true,
      });

      return response.data;
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "No se pudo crear la tarjeta",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
    },
  });
}