"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const examDate = new Date("2025-12-16T00:00:00")
      const now = new Date()
      const difference = examDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center gap-4 md:gap-6">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-indigo-400" />
        <span className="text-xs font-medium text-indigo-300 uppercase tracking-wider hidden sm:inline">Exam in</span>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <TimeBlock value={timeLeft.days} label="D" />
        <Separator />
        <TimeBlock value={timeLeft.hours} label="H" />
        <Separator />
        <TimeBlock value={timeLeft.minutes} label="M" />
        <Separator />
        <TimeBlock value={timeLeft.seconds} label="S" />
      </div>
    </div>
  )
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-baseline gap-0.5">
      <span className="text-lg md:text-xl font-bold text-indigo-300 tabular-nums">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-[10px] text-indigo-400/70 font-medium">{label}</span>
    </div>
  )
}

function Separator() {
  return <span className="text-sm text-indigo-500/50 font-light">:</span>
}
