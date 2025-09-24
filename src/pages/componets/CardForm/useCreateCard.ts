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
    onSuccess: (response) => {
      toast({
          title: "Nueva tarjeta creada",
          description:
            response.confirmation || "Los datos se guardaron correctamente.",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "No se pudo crear la tarjeta",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    },
  });
}