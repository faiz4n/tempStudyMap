"use client"

import { useState, useEffect, useCallback } from "react"

export type Theme = "indigo" | "midnight" | "emerald" | "rose" | "light" | "light-warm"

export interface ThemeOption {
  id: Theme
  name: string
  preview: string
  isDark: boolean
}

export const themeOptions: ThemeOption[] = [
  { id: "indigo", name: "Indigo Night", preview: "#818cf8", isDark: true },
  { id: "midnight", name: "Midnight Blue", preview: "#3b82f6", isDark: true },
  { id: "emerald", name: "Emerald Dark", preview: "#10b981", isDark: true },
  { id: "rose", name: "Rose Dark", preview: "#f43f5e", isDark: true },
  { id: "light", name: "Light Indigo", preview: "#6366f1", isDark: false },
  { id: "light-warm", name: "Light Warm", preview: "#f59e0b", isDark: false },
]

const THEME_KEY = "exam-study-theme"

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("indigo")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null
    if (savedTheme && themeOptions.some((t) => t.id === savedTheme)) {
      setThemeState(savedTheme)
      document.documentElement.setAttribute("data-theme", savedTheme === "indigo" ? "" : savedTheme)
    }
    setIsLoaded(true)
  }, [])

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem(THEME_KEY, newTheme)
    document.documentElement.setAttribute("data-theme", newTheme === "indigo" ? "" : newTheme)
  }, [])

  const currentThemeOption = themeOptions.find((t) => t.id === theme) || themeOptions[0]

  return { theme, setTheme, isLoaded, currentThemeOption, themeOptions }
}
