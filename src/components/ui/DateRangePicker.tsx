import { useState, useRef, useEffect, useMemo } from 'react'
import { Calendar as CalendarIcon, ChevronDown, X } from 'lucide-react'
import { Calendar } from './Calendar'
import type { DateRange } from '@/types'

interface DateRangePreset {
  label: string
  getValue: () => DateRange
}

const getPresets = (): DateRangePreset[] => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  return [
    {
      label: 'Today',
      getValue: () => ({ startDate: today, endDate: today }),
    },
    {
      label: 'Yesterday',
      getValue: () => {
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        return { startDate: yesterday, endDate: yesterday }
      },
    },
    {
      label: 'Last 7 days',
      getValue: () => {
        const start = new Date(today)
        start.setDate(start.getDate() - 6)
        return { startDate: start, endDate: today }
      },
    },
    {
      label: 'Last 14 days',
      getValue: () => {
        const start = new Date(today)
        start.setDate(start.getDate() - 13)
        return { startDate: start, endDate: today }
      },
    },
    {
      label: 'Last 30 days',
      getValue: () => {
        const start = new Date(today)
        start.setDate(start.getDate() - 29)
        return { startDate: start, endDate: today }
      },
    },
    {
      label: 'Last 90 days',
      getValue: () => {
        const start = new Date(today)
        start.setDate(start.getDate() - 89)
        return { startDate: start, endDate: today }
      },
    },
    {
      label: 'This month',
      getValue: () => ({
        startDate: new Date(now.getFullYear(), now.getMonth(), 1),
        endDate: today,
      }),
    },
    {
      label: 'Last month',
      getValue: () => ({
        startDate: new Date(now.getFullYear(), now.getMonth() - 1, 1),
        endDate: new Date(now.getFullYear(), now.getMonth(), 0),
      }),
    },
    {
      label: 'This year',
      getValue: () => ({
        startDate: new Date(now.getFullYear(), 0, 1),
        endDate: today,
      }),
    },
  ]
}

interface DateRangePickerProps {
  value: DateRange
  onChange: (range: DateRange) => void
  className?: string
}

export function DateRangePicker({
  value,
  onChange,
  className = '',
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [localRange, setLocalRange] = useState<{
    start: Date | null
    end: Date | null
  } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const presets = getPresets()

  const tempRange = useMemo(
    () => localRange ?? { start: value.startDate, end: value.endDate },
    [localRange, value.startDate, value.endDate]
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setLocalRange(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const handlePresetClick = (preset: DateRangePreset) => {
    const range = preset.getValue()
    onChange(range)
    setIsOpen(false)
  }

  const handleRangeSelect = (range: { start: Date; end: Date }) => {
    setLocalRange(range)
    onChange({ startDate: range.start, endDate: range.end })
  }

  const handleApply = () => {
    if (tempRange.start && tempRange.end) {
      onChange({ startDate: tempRange.start, endDate: tempRange.end })
    }
    setIsOpen(false)
  }

  const getActivePreset = (): string | null => {
    for (const preset of presets) {
      const presetValue = preset.getValue()
      if (
        presetValue.startDate.toDateString() ===
          value.startDate.toDateString() &&
        presetValue.endDate.toDateString() === value.endDate.toDateString()
      ) {
        return preset.label
      }
    }
    return null
  }

  const activePreset = getActivePreset()

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 py-2 text-sm transition-colors hover:border-[var(--border-color-hover)] focus:border-[var(--color-primary)] focus:outline-none"
      >
        <CalendarIcon size={16} className="text-[var(--text-muted)]" />
        <span className="text-[var(--text-primary)]">
          {activePreset ||
            `${formatDate(value.startDate)} - ${formatDate(value.endDate)}`}
        </span>
        <ChevronDown
          size={16}
          className={`text-[var(--text-muted)] transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 flex rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] shadow-[var(--shadow-lg)]">
          <div className="border-r border-[var(--border-color)] p-2">
            <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Quick Select
            </div>
            <div className="space-y-0.5">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => handlePresetClick(preset)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    activePreset === preset.label
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Custom Range
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-[var(--text-muted)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
              >
                <X size={16} />
              </button>
            </div>

            <Calendar
              mode="range"
              selectedRange={{ start: tempRange.start, end: tempRange.end }}
              onRangeSelect={handleRangeSelect}
              maxDate={new Date()}
            />

            <div className="mt-4 flex items-center justify-between border-t border-[var(--border-color)] pt-4">
              <div className="text-sm text-[var(--text-muted)]">
                {tempRange.start && tempRange.end
                  ? `${formatDate(tempRange.start)} - ${formatDate(tempRange.end)}`
                  : 'Select a range'}
              </div>
              <button
                onClick={handleApply}
                disabled={!tempRange.start || !tempRange.end}
                className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
