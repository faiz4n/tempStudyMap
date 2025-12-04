"use client"

import { cn } from "@/lib/utils"
import { studyData } from "@/lib/study-data"
import { CheckCircle2 } from "lucide-react"
import { MiniProgressBar } from "./progress-bars"

interface DaySidebarProps {
  currentDay: number
  onDaySelect: (day: number) => void
  getDayProgress: (day: number) => number
}

export function DaySidebar({ currentDay, onDaySelect, getDayProgress }: DaySidebarProps) {
  return (
    <aside className="glass rounded-2xl p-4 h-fit sticky top-20">
      <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 px-2">Study Plan</h2>
      <nav className="flex flex-col gap-1.5">
        {studyData.map((day) => {
          const progress = getDayProgress(day.day)
          const isComplete = progress === 100
          const isActive = currentDay === day.day

          return (
            <button
              key={day.day}
              onClick={() => onDaySelect(day.day)}
              className={cn(
                "flex flex-col gap-2 px-3 py-3 rounded-xl text-left transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "hover:bg-primary/10 text-foreground/80 hover:text-foreground",
              )}
              style={isActive ? { boxShadow: `0 4px 20px color-mix(in srgb, var(--primary) 40%, transparent)` } : {}}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-semibold text-sm">Day {day.day}</span>
                {isComplete ? (
                  <CheckCircle2 className={cn("w-4 h-4", isActive ? "text-primary-foreground" : "text-green-500")} />
                ) : progress > 0 ? (
                  <span className={cn("text-xs font-medium", isActive ? "text-primary-foreground/80" : "text-primary")}>
                    {progress}%
                  </span>
                ) : null}
              </div>
              <div className={cn("w-full", isActive ? "opacity-80" : "opacity-100")}>
                <MiniProgressBar value={progress} />
              </div>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
