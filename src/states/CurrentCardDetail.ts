import { create } from "zustand";
import { CardDetailItem } from "../types";

type DetailStore = {
  currentDetail: CardDetailItem | null;
  setCurrentDetail: (cardDetail: CardDetailItem) => void;
  reset: () => void;
};

const useCurrentCardDetail = create<DetailStore>((set) => ({
  currentDetail: null,

  setCurrentDetail: (CardDetail) => {
    set({currentDetail: CardDetail})
  },

  reset: () => {
    set({
      currentDetail: null,
    })
  },
}));

export default useCurrentCardDetail;