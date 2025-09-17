import { create } from "zustand";
import { FolderItem } from "../types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const URL = `${API_URL}/folders/by-user`;

type FoldersStore = {
  folders: FolderItem[] | null;
  currentFolder: number;
  isLoading: boolean;
  isError: boolean;
  refreshFolders: () => Promise<void>;
  setCurrentFolder: (id: number) => void;
  reset: () => void;
};

const useFoldersStore = create<FoldersStore>((set) => ({
  folders: null,
  currentFolder: -1,
  isLoading: false,
  isError: false,

  refreshFolders: async () => {
    set({ isLoading: true, isError: false });

    try {
      const response = await axios.post<FolderItem[]>(URL, {}, {
        withCredentials: true,
      });

      set({ folders: response.data, isLoading: false });
    } catch (error) {
      console.error("Error al obtener folders:", error);
      set({ isError: true, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  setCurrentFolder: (id) => {
    console.log("Cambiando: "+id)
    set({ currentFolder: id });
  },

  reset: () => {
    set({
      folders: null,
      currentFolder: -1,
      isLoading: false,
      isError: false,
    })
  }
}));

export default useFoldersStore;

