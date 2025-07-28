import { create } from "zustand";

type TablesStore = {
  showPasswords: boolean
  showNotes: boolean
  showCards: boolean
  activeTab: string
  setShowPasswords: () => void
  setShowNotes: () => void
  setShowCards: () => void
  setActiveTab: (name: string) => void 
  showAll: () => void
  reset: () => void
};

const useTablesStore = create<TablesStore>((set) => ({
  showPasswords: true,
  showNotes: true,
  showCards: true,
  activeTab: "Todos",

  setShowPasswords: () => {
    set({ showPasswords: true, showCards: false, showNotes: false});
  },

  setShowNotes: () => {
    set({ showPasswords: false, showCards: false, showNotes: true});
  },

  setShowCards: () => {
    set({ showPasswords: false, showCards: true, showNotes: false});
  },

  setActiveTab: (name: string) => set({ activeTab: name }),

  showAll: () => {
    set({ showPasswords: true, showCards: true, showNotes: true});
  },

  reset: () => {
    set({
      showPasswords: true,
      showNotes: true,
      showCards: true,
    })
  }
}));

export default useTablesStore;