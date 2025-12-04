"use client"

import { useStudyProgress } from "@/hooks/use-study-progress"
import { useTheme } from "@/hooks/use-theme"
import { CountdownTimer } from "@/components/countdown-timer"
import { ProgressBar } from "@/components/progress-bars"
import { DaySidebar } from "@/components/day-sidebar"
import { DayContent } from "@/components/day-content"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { useCallback } from "react"

export default function StudyDashboard() {
  const { progress, currentDay, setCurrentDay, toggleTopic, getDayProgress, getOverallProgress, isLoaded } =
    useStudyProgress()
  const { theme, setTheme, isLoaded: themeLoaded, themeOptions } = useTheme()

  const handleDaySelect = useCallback(
    (day: number) => {
      setCurrentDay(day)
      window.scrollTo({ top: 0, behavior: "smooth" })
    },
    [setCurrentDay],
  )

  if (!isLoaded || !themeLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(135deg, var(--gradient-from), var(--gradient-via), var(--gradient-to))`,
      }}
    >
      <header className="glass-sticky sticky top-0 z-50 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <h1 className="text-sm md:text-base font-semibold text-foreground truncate">12-Day Study Plan</h1>
          <CountdownTimer />
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <ProgressBar value={getOverallProgress()} label="Overall" compact />
            </div>
            <ThemeSwitcher theme={theme} setTheme={setTheme} themeOptions={themeOptions} />
          </div>
        </div>
      </header>

      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Mobile overall progress */}
          <div className="md:hidden mb-6">
            <div className="glass rounded-2xl p-4">
              <ProgressBar value={getOverallProgress()} label="Overall Progress" />
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
            {/* Sidebar - Hidden on mobile */}
            <div className="hidden lg:block">
              <DaySidebar currentDay={currentDay} onDaySelect={handleDaySelect} getDayProgress={getDayProgress} />
            </div>

            {/* Day Content */}
            <main>
              <DayContent
                day={currentDay}
                progress={progress}
                onToggleTopic={toggleTopic}
                onPrevDay={() => handleDaySelect(Math.max(1, currentDay - 1))}
                onNextDay={() => handleDaySelect(Math.min(12, currentDay + 1))}
              />
            </main>
          </div>

          {/* Mobile Day Selector */}
          <div className="lg:hidden mt-6 glass rounded-2xl p-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((day) => {
                const dayProgress = getDayProgress(day)
                return (
                  <button
                    key={day}
                    onClick={() => handleDaySelect(day)}
                    className={`flex-shrink-0 w-12 h-12 rounded-xl font-semibold transition-all duration-200 ${
                      currentDay === day
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : dayProgress === 100
                          ? "bg-green-500/20 text-green-500"
                          : "bg-primary/10 text-foreground/70 hover:bg-primary/20"
                    }`}
                    style={
                      currentDay === day
                        ? { boxShadow: `0 4px 20px color-mix(in srgb, var(--primary) 40%, transparent)` }
                        : {}
                    }
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
