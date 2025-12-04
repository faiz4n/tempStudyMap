"use client"

import { useState, useEffect, useCallback } from "react"
import { studyData } from "@/lib/study-data"

const STORAGE_KEY = "exam-study-progress"
const LAST_DAY_KEY = "exam-study-last-day"

interface ProgressState {
  [topicId: string]: boolean
}

export function useStudyProgress() {
  const [progress, setProgress] = useState<ProgressState>({})
  const [currentDay, setCurrentDay] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY)
    const savedDay = localStorage.getItem(LAST_DAY_KEY)

    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
    if (savedDay) {
      setCurrentDay(Number.parseInt(savedDay, 10))
    }
    setIsLoaded(true)
  }, [])

  // Save progress to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    }
  }, [progress, isLoaded])

  // Save current day to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(LAST_DAY_KEY, currentDay.toString())
    }
  }, [currentDay, isLoaded])

  const toggleTopic = useCallback((topicId: string) => {
    setProgress((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }))
  }, [])

  const getDayProgress = useCallback(
    (day: number) => {
      const dayData = studyData.find((d) => d.day === day)
      if (!dayData) return 0

      const checkableTopics = dayData.topics.filter((t) => !t.isHeader)
      if (checkableTopics.length === 0) return 0

      const completed = checkableTopics.filter((t) => progress[t.id]).length
      return Math.round((completed / checkableTopics.length) * 100)
    },
    [progress],
  )

  const getOverallProgress = useCallback(() => {
    const allCheckableTopics = studyData.flatMap((d) => d.topics.filter((t) => !t.isHeader))
    if (allCheckableTopics.length === 0) return 0

    const completed = allCheckableTopics.filter((t) => progress[t.id]).length
    return Math.round((completed / allCheckableTopics.length) * 100)
  }, [progress])

  return {
    progress,
    currentDay,
    setCurrentDay,
    toggleTopic,
    getDayProgress,
    getOverallProgress,
    isLoaded,
  }
}
