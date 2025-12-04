"use client"

import { studyData, type Topic } from "@/lib/study-data"
import { Check, Moon, ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface DayContentProps {
  day: number
  progress: { [topicId: string]: boolean }
  onToggleTopic: (topicId: string) => void
  onPrevDay: () => void
  onNextDay: () => void
}

export function DayContent({ day, progress, onToggleTopic, onPrevDay, onNextDay }: DayContentProps) {
  const dayData = studyData.find((d) => d.day === day)

  if (!dayData) return null

  return (
    <div className="flex flex-col gap-6">
      {/* Day Header */}
      <div className="glass-strong rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onPrevDay}
            disabled={day === 1}
            className={cn(
              "p-2.5 rounded-xl transition-all duration-200",
              day === 1 ? "text-muted-foreground/30 cursor-not-allowed" : "text-primary hover:bg-primary/10",
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-center flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              {dayData.subject}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
              Day {dayData.day} — {dayData.title}
            </h1>
            <p className="text-muted-foreground mt-2">{dayData.subtitle}</p>
          </div>
          <button
            onClick={onNextDay}
            disabled={day === 12}
            className={cn(
              "p-2.5 rounded-xl transition-all duration-200",
              day === 12 ? "text-muted-foreground/30 cursor-not-allowed" : "text-primary hover:bg-primary/10",
            )}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Topics Checklist */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Topics</h2>
        <div className="flex flex-col gap-2">
          {dayData.topics.map((topic) => (
            <TopicItem
              key={topic.id}
              topic={topic}
              isChecked={progress[topic.id] || false}
              onToggle={() => onToggleTopic(topic.id)}
            />
          ))}
        </div>
      </div>

      {/* Night Section */}
      <div className="glass rounded-2xl p-6 border-l-4 border-accent">
        <div className="flex items-center gap-3 mb-2">
          <Moon className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-semibold text-foreground">Night (Compulsory)</h2>
        </div>
        <p className="text-muted-foreground">1–1.5 hours development practice (do not skip).</p>
      </div>
    </div>
  )
}

function TopicItem({
  topic,
  isChecked,
  onToggle,
}: {
  topic: Topic
  isChecked: boolean
  onToggle: () => void
}) {
  if (topic.isHeader) {
    return (
      <div className="pt-4 pb-2 first:pt-0">
        <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">{topic.text}</h3>
      </div>
    )
  }

  return (
    <button
      onClick={onToggle}
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200",
        isChecked ? "bg-green-500/10 text-green-500" : "hover:bg-primary/10 text-foreground/80",
      )}
    >
      <div
        className={cn(
          "w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200",
          isChecked ? "bg-green-500 text-white" : "border-2 border-primary/30",
        )}
      >
        {isChecked && <Check className="w-3.5 h-3.5" />}
      </div>
      <span className={cn("text-sm", isChecked && "line-through opacity-70")}>{topic.text}</span>
    </button>
  )
}
