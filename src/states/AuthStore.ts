import { create } from 'zustand';
import axios from 'axios';

import useFoldersStore from './FoldersStore';
import useTablesStore from './TablesStore';
import usePasswordsStore from './PasswordsStore';
import useNotesStore from './NotesStore';
import useCardStore from './CardsStore';


const API_URL = import.meta.env.VITE_API_URL;

type LogoutReason = "manual" | "inactivity" | "expired" | null;

interface AuthStore {
  isAuthenticated: boolean;
  logoutReason: LogoutReason;
  login: () => void;
  logout: (reason?: LogoutReason) => void;
  clearLogoutReason: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,

  logoutReason: null,

  login: () => set({ isAuthenticated: true }),

  logout: async (reason = "manual") => {
    try {
      await axios.post(`${API_URL}/authentication/logout`, null, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    } finally {
      set({ isAuthenticated: false, logoutReason: reason });

      useFoldersStore.getState().reset?.();
      useTablesStore.getState().reset?.();
      usePasswordsStore.getState().reset?.();
      useNotesStore.getState().reset?.();
      useCardStore.getState().reset?.();
    }
  },

  clearLogoutReason: () => set({ logoutReason: null }),
}));

