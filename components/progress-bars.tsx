"use client"

interface ProgressBarProps {
  value: number
  label?: string
  variant?: "primary" | "secondary"
  compact?: boolean
  showLabel?: boolean
}

export function ProgressBar({
  value,
  label,
  variant = "primary",
  compact = false,
  showLabel = true,
}: ProgressBarProps) {
  const bgClass =
    variant === "primary"
      ? "bg-[linear-gradient(to_right,var(--progress-from),var(--progress-to))]"
      : "bg-[linear-gradient(to_right,var(--progress-secondary-from),var(--progress-secondary-to))]"

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        {showLabel && label && <span className="text-xs font-medium text-primary whitespace-nowrap">{label}</span>}
        <div className="h-1.5 w-24 md:w-32 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full ${bgClass} rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${value}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-primary tabular-nums">{value}%</span>
      </div>
    )
  }

  return (
    <div className="w-full">
      {showLabel && label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground/80">{label}</span>
          <span className="text-sm font-semibold text-primary">{value}%</span>
        </div>
      )}
      {!showLabel && (
        <div className="flex justify-end mb-1">
          <span className="text-xs font-semibold text-primary tabular-nums">{value}%</span>
        </div>
      )}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${bgClass} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export function MiniProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1 w-full bg-muted/50 rounded-full overflow-hidden">
      <div
        className="h-full bg-[linear-gradient(to_right,var(--progress-from),var(--progress-to))] rounded-full transition-all duration-500 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
