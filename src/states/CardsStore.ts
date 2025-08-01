import { create } from "zustand";
import { CardItem } from "../types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const URL = `${API_URL}/cards/by-user`;

type CardsStore = {
  cards: CardItem[];
  isLoading: boolean;
  isError: boolean;
  refreshCards: (folderId: number) => Promise<void>;
  reset: () => void;
};

const useCardsStore = create<CardsStore>((set) => ({
  cards: [],
  isLoading: false,
  isError: false,

  refreshCards: async (folderId: number) => {
    set({ isLoading: true, isError: false });

    try {
      const response = await axios.post<CardItem[]>(
        URL,
        { folder_id: folderId },
        {
          withCredentials: true, 
        }
      );

      set({ cards: response.data, isLoading: false });
    } catch (error) {
      console.error("Error al obtener tarjetas:", error);
      set({ isError: true, isLoading: false, cards: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => {
    set({
      cards: [],
      isLoading: false,
      isError: false,
    })
  },
}));

export default useCardsStore;