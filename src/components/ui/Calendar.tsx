import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CalendarProps {
  selectedDate?: Date | null
  selectedRange?: { start: Date | null; end: Date | null }
  onDateSelect?: (date: Date) => void
  onRangeSelect?: (range: { start: Date; end: Date }) => void
  minDate?: Date
  maxDate?: Date
  mode?: 'single' | 'range'
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export function Calendar({
  selectedDate,
  selectedRange,
  onDateSelect,
  onRangeSelect,
  minDate,
  maxDate,
  mode = 'single',
}: CalendarProps) {
  const [viewDate, setViewDate] = useState(() => {
    if (selectedDate) return new Date(selectedDate)
    if (selectedRange?.start) return new Date(selectedRange.start)
    return new Date()
  })

  const [hoverDate, setHoverDate] = useState<Date | null>(null)
  const [rangeStart, setRangeStart] = useState<Date | null>(
    selectedRange?.start || null
  )

  const { year, month, days } = useMemo(() => {
    const y = viewDate.getFullYear()
    const m = viewDate.getMonth()
    const firstDay = new Date(y, m, 1)
    const lastDay = new Date(y, m + 1, 0)
    const startPadding = firstDay.getDay()
    const totalDays = lastDay.getDate()

    const daysArray: (Date | null)[] = []

    for (let i = 0; i < startPadding; i++) {
      daysArray.push(null)
    }

    for (let i = 1; i <= totalDays; i++) {
      daysArray.push(new Date(y, m, i))
    }

    return { year: y, month: m, days: daysArray }
  }, [viewDate])

  const goToPrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1))
  }

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    return false
  }

  const isDateSelected = (date: Date) => {
    if (mode === 'single' && selectedDate) {
      return date.toDateString() === selectedDate.toDateString()
    }
    if (mode === 'range' && selectedRange) {
      if (
        selectedRange.start &&
        date.toDateString() === selectedRange.start.toDateString()
      ) {
        return true
      }
      if (
        selectedRange.end &&
        date.toDateString() === selectedRange.end.toDateString()
      ) {
        return true
      }
    }
    return false
  }

  const isInRange = (date: Date) => {
    if (mode !== 'range') return false

    const start = rangeStart || selectedRange?.start
    const end = selectedRange?.end || hoverDate

    if (!start || !end) return false

    const dateTime = date.getTime()
    const startTime = start.getTime()
    const endTime = end.getTime()

    return (
      dateTime > Math.min(startTime, endTime) &&
      dateTime < Math.max(startTime, endTime)
    )
  }

  const isRangeStart = (date: Date) => {
    if (mode !== 'range') return false
    const start = rangeStart || selectedRange?.start
    return start ? date.toDateString() === start.toDateString() : false
  }

  const isRangeEnd = (date: Date) => {
    if (mode !== 'range') return false
    const end = selectedRange?.end
    return end ? date.toDateString() === end.toDateString() : false
  }

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return

    if (mode === 'single') {
      onDateSelect?.(date)
    } else {
      if (!rangeStart) {
        setRangeStart(date)
      } else {
        const start = rangeStart < date ? rangeStart : date
        const end = rangeStart < date ? date : rangeStart
        onRangeSelect?.({ start, end })
        setRangeStart(null)
      }
    }
  }

  const isToday = (date: Date) => {
    return date.toDateString() === new Date().toDateString()
  }

  return (
    <div className="w-72 select-none">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={goToPrevMonth}
          className="rounded-lg p-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm font-semibold text-[var(--text-primary)]">
          {MONTHS[month]} {year}
        </span>
        <button
          onClick={goToNextMonth}
          className="rounded-lg p-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1">
        {DAYS.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-xs font-medium text-[var(--text-muted)]"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="h-9" />
          }

          const disabled = isDateDisabled(date)
          const selected = isDateSelected(date)
          const inRange = isInRange(date)
          const rangeStartDay = isRangeStart(date)
          const rangeEndDay = isRangeEnd(date)
          const today = isToday(date)

          return (
            <button
              key={date.toISOString()}
              onClick={() => handleDateClick(date)}
              onMouseEnter={() =>
                mode === 'range' && rangeStart && setHoverDate(date)
              }
              onMouseLeave={() => setHoverDate(null)}
              disabled={disabled}
              className={`relative h-9 rounded-lg text-sm font-medium transition-all ${
                disabled
                  ? 'cursor-not-allowed text-[var(--text-muted)] opacity-40'
                  : selected
                    ? 'bg-[var(--color-primary)] text-white'
                    : inRange
                      ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                      : today
                        ? 'border border-[var(--color-primary)] text-[var(--color-primary)]'
                        : 'text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
              } ${rangeStartDay ? 'rounded-r-none' : ''} ${rangeEndDay ? 'rounded-l-none' : ''} ${inRange ? 'rounded-none' : ''}`}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
