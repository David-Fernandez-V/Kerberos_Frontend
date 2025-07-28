import { create } from "zustand";
import { NoteDetailItem } from "../types";

type DetailStore = {
  currentDetail: NoteDetailItem | null;
  setCurrentDetail: (noteDetail: NoteDetailItem) => void;
  reset: () => void;
};

const useCurrentNoteDetail = create<DetailStore>((set) => ({
  currentDetail: null,

  setCurrentDetail: (NoteDetail) => {
    set({currentDetail: NoteDetail})
  },

  reset: () => {
    set({
      currentDetail: null,
    })
  },
}));

export default useCurrentNoteDetail;