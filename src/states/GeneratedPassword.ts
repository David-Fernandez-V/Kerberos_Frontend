import { create } from "zustand";

type GeneratedStore = {
  generatedPasword: string | null
  setGeneratedPassword: (password: string) => void;
  reset: () => void;
};

const useGeneratedStore = create<GeneratedStore>((set) => ({
  generatedPasword: null,

  setGeneratedPassword: (password) => {
    set({generatedPasword: password})
  },

  reset: () => {
    set({
      generatedPasword: null,
    })
  },
}));

export default useGeneratedStore;

