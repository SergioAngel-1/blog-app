import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface DarkModeStore {
  isDarkMode: boolean;
  toggle: () => void;
}

const getSystemDarkMode = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export const useDarkMode = create<DarkModeStore>()(
  persist(
    (set) => ({
      isDarkMode: getSystemDarkMode(),
      toggle: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: "dark-mode-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
