import { create } from 'zustand';
import axios from 'axios';

import useFoldersStore from './FoldersStore';
import useTablesStore from './TablesStore';
import usePasswordsStore from './PasswordsStore';
import useNotesStore from './NotesStore';
import useCardStore from './CardsStore';
import useSettings from './SettingsStore';


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

  login: () => {
    localStorage.setItem("login_event", Date.now().toString());
    set({ isAuthenticated: true })
  },

  logout: async (reason = "manual") => {
    try {
      await axios.post(`${API_URL}/authentication/logout`, null, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    } finally {
      useFoldersStore.getState().reset?.();
      useTablesStore.getState().reset?.();
      usePasswordsStore.getState().reset?.();
      useNotesStore.getState().reset?.();
      useCardStore.getState().reset?.();
      useSettings.getState().reset?.();
      
      localStorage.removeItem("isAuthenticated");
      localStorage.setItem("logout_event", Date.now().toString());

      set({ isAuthenticated: false, logoutReason: reason });
    }
  },

  clearLogoutReason: () => set({ logoutReason: null }),
}));

