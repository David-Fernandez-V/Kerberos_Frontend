import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { cardForm } from "../../../schemas/cardSchema";

interface ModifyCardRequest {
  new_data: cardForm;
  card_request: {
    card_id: number;
    master_password?: string;
  };
}

interface ModifyCardResponse {
  confirmation: string;
}

const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/cards/modify`;

export default function useModifyCard() {
  const toast = useToast();

  return useMutation<ModifyCardResponse, unknown, ModifyCardRequest>({
    mutationFn: async ({ new_data, card_request }) => {
      const response = await axios.post<ModifyCardResponse>(
        url,
        {
          new_data,
          card_request,
        },
        {
          withCredentials: true,
        }
      );

      return response.data;
    },
    onSuccess: (response) => {
      toast({
        title: "Tarjeta modificada",
        description:
          response.confirmation || "Los datos se modificaron correctamente.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error.response?.data?.detail || "No se pudo modificar la Tarjeta",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    },
  });
}