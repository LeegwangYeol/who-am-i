"use client"

import { useThemeStore } from "@/store/theme";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { isDarkTheme } = useThemeStore();
  
  return (
    <div className={isDarkTheme ? 'dark-theme' : 'light-theme'}>
      {children}
    </div>
  );
}
