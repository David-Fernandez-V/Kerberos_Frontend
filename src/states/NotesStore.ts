import { create } from "zustand";
import { NoteItem } from "../types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const URL = `${API_URL}/notes/by-user`;

type NotesStore = {
  notes: NoteItem[];
  isLoading: boolean;
  isError: boolean;
  refreshNotes: (folderId: number) => Promise<void>;
  reset: () => void;
};

const useNotesStore = create<NotesStore>((set) => ({
  notes: [],
  isLoading: false,
  isError: false,

  refreshNotes: async (folderId: number) => {
    set({ isLoading: true, isError: false });

    try {
      const response = await axios.post<NoteItem[]>(
        URL,
        { folder_id: folderId },
        {
          withCredentials: true, 
        }
      );

      set({ notes: response.data, isLoading: false });
    } catch (error) {
      console.error("Error al obtener notas:", error);
      set({ isError: true, isLoading: false, notes: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => {
    set({
      notes: [],
      isLoading: false,
      isError: false,
    })
  },
}));

export default useNotesStore;