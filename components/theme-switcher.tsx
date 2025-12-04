"use client"

import { Palette, Check } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import type { Theme, ThemeOption } from "@/hooks/use-theme"

interface ThemeSwitcherProps {
  theme: Theme
  setTheme: (theme: Theme) => void
  themeOptions: ThemeOption[]
}

export function ThemeSwitcher({ theme, setTheme, themeOptions }: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl glass hover:bg-primary/10 transition-all duration-200"
        aria-label="Change theme"
      >
        <Palette className="w-4 h-4 text-primary" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 glass rounded-xl p-2 z-50 shadow-xl">
          <p className="text-xs font-medium text-muted-foreground px-2 py-1.5 uppercase tracking-wider">Choose Theme</p>
          <div className="flex flex-col gap-1 mt-1">
            {themeOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setTheme(option.id)
                  setIsOpen(false)
                }}
                className={cn(
                  "flex items-center gap-3 px-2 py-2 rounded-lg text-left transition-all duration-200",
                  theme === option.id ? "bg-primary/20 text-foreground" : "hover:bg-primary/10 text-foreground/80",
                )}
              >
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0 ring-2 ring-offset-1 ring-offset-background"
                  style={{ backgroundColor: option.preview, ringColor: option.preview }}
                />
                <span className="text-sm font-medium flex-1">{option.name}</span>
                {theme === option.id && <Check className="w-3.5 h-3.5 text-primary" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
