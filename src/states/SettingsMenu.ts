import { create } from "zustand"

type SettingsStore = {
    activeTab: string
    setActiveTab: (name: string) => void 
};

const useSettingsMenuStore = create<SettingsStore>((set) => ({
    activeTab: "Mi cuenta",

    setActiveTab: (name: string) => {
        set({activeTab: name})
    }
}))

export default useSettingsMenuStore