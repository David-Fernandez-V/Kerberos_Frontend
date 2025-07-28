import { create } from "zustand";
import { PasswordDetailItem } from "../types";

type DetailStore = {
  currentDetail: PasswordDetailItem | null;
  setCurrentDetail: (passwordDetail: PasswordDetailItem) => void;
  reset: () => void;
};

const useCurrentPswDetail = create<DetailStore>((set) => ({
  currentDetail: null,

  setCurrentDetail: (passwordDetail) => {
    set({currentDetail: passwordDetail})
  },

  reset: () => {
    set({
      currentDetail: null,
    })
  },
}));

export default useCurrentPswDetail;

