import { create } from "zustand";
import { User } from "../types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const URL = `${API_URL}/users/me`;

type SettingsStore = {
  username: string;
  email: string;
  setUsername: (name: string) => void;
  refreshUsername: () => Promise<void>;
  setEmail: (email: string) => void
};

const useSettings = create<SettingsStore>((set) => ({

  username: "",
  email: "D@d.com",

  setUsername: (name: string) => {
    set({username: name})
  },

  refreshUsername: async () => {
    try {
      const response = await axios.get<User>(URL, { withCredentials: true });
      set({ username: response.data.name });
    } catch (err) {
      console.error("Error refrescando username:", err);
    }
  },

  setEmail: (email: string) => {
    set({email: email})
  },

}));

export default useSettings;