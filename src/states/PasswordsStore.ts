import { create } from "zustand";
import { PasswordItem } from "../types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const URL = `${API_URL}/passwords/by-user`;

type PasswordsStore = {
  passwords: PasswordItem[];
  isLoading: boolean;
  isError: boolean;
  refreshPasswords: (folderId: number) => Promise<void>;
  reset: () => void;
};

const usePasswordsStore = create<PasswordsStore>((set) => ({
  passwords: [],
  isLoading: false,
  isError: false,

  refreshPasswords: async (folderId: number) => {
    set({ isLoading: true, isError: false });

    try {
      const response = await axios.post<PasswordItem[]>(
        URL,
        { folder_id: folderId },
        {
          withCredentials: true, 
        }
      );

      set({ passwords: response.data, isLoading: false });
    } catch (error) {
      console.error("Error al obtener contraseñas:", error);
      set({ isError: true, isLoading: false, passwords: [] });
    } finally {
      set({ isLoading: false });
    }
  },
  reset: () => {
    set({
      passwords: [],
      isLoading: false,
      isError: false,
    })
  }
}));

export default usePasswordsStore;