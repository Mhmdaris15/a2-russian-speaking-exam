import { create } from 'zustand';

interface AppState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (dark: boolean) => void;
}

export const useAppStore = create<AppState>((set) => {
  // Initialize from localStorage or system preference
  const stored = localStorage.getItem('a2-dark-mode');
  const initial = stored !== null
    ? stored === 'true'
    : window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Apply immediately
  if (initial) {
    document.documentElement.classList.add('dark');
  }

  return {
    darkMode: initial,
    toggleDarkMode: () =>
      set((state) => {
        const next = !state.darkMode;
        localStorage.setItem('a2-dark-mode', String(next));
        document.documentElement.classList.toggle('dark', next);
        return { darkMode: next };
      }),
    setDarkMode: (dark: boolean) =>
      set(() => {
        localStorage.setItem('a2-dark-mode', String(dark));
        document.documentElement.classList.toggle('dark', dark);
        return { darkMode: dark };
      }),
  };
});
