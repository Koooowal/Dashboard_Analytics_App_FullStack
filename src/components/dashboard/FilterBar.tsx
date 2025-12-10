import { useState, useEffect } from 'react'
import { Search, Filter, X, ChevronDown } from 'lucide-react'
import { useFilterStore } from '@/store'
import { CATEGORY_LIST } from '@/services'

interface FilterBarProps {
  showSearch?: boolean
  showCategories?: boolean
  className?: string
}

export function FilterBar({
  showSearch = true,
  showCategories = true,
  className = '',
}: FilterBarProps) {
  const {
    categories: selectedCategories,
    searchQuery,
    setSearchQuery,
    toggleCategory,
    setCategories,
  } = useFilterStore()

  const [localSearch, setLocalSearch] = useState(searchQuery)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localSearch)
    }, 300)
    return () => clearTimeout(timer)
  }, [localSearch, setSearchQuery])

  const handleClearSearch = () => {
    setLocalSearch('')
    setSearchQuery('')
  }

  const handleSelectAll = () => {
    setCategories(CATEGORY_LIST)
  }

  const handleClearAll = () => {
    setCategories([])
  }

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {showSearch && (
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search..."
            className="h-10 w-64 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] pl-9 pr-9 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors focus:border-[var(--color-primary)] focus:outline-none"
          />
          {localSearch && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <X size={16} />
            </button>
          )}
        </div>
      )}

      {showCategories && (
        <div className="relative">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="flex h-10 items-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 text-sm transition-colors hover:border-[var(--border-color-hover)]"
          >
            <Filter size={16} className="text-[var(--text-muted)]" />
            <span className="text-[var(--text-primary)]">
              Categories
              {selectedCategories.length > 0 && (
                <span className="ml-1.5 rounded-full bg-[var(--color-primary)] px-1.5 py-0.5 text-xs text-white">
                  {selectedCategories.length}
                </span>
              )}
            </span>
            <ChevronDown
              size={16}
              className={`text-[var(--text-muted)] transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isCategoryOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsCategoryOpen(false)}
              />
              <div className="absolute left-0 top-full z-50 mt-2 w-56 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] p-2 shadow-[var(--shadow-lg)]">
                <div className="mb-2 flex items-center justify-between border-b border-[var(--border-color)] pb-2">
                  <button
                    onClick={handleSelectAll}
                    className="text-xs text-[var(--color-primary)] hover:underline"
                  >
                    Select all
                  </button>
                  <button
                    onClick={handleClearAll}
                    className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:underline"
                  >
                    Clear all
                  </button>
                </div>
                <div className="space-y-1">
                  {CATEGORY_LIST.map((category) => {
                    const isSelected = selectedCategories.includes(category)
                    return (
                      <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                          isSelected
                            ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
                        }`}
                      >
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded border ${
                            isSelected
                              ? 'border-[var(--color-primary)] bg-[var(--color-primary)]'
                              : 'border-[var(--border-color)]'
                          }`}
                        >
                          {isSelected && (
                            <svg
                              className="h-3 w-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </span>
                        {category}
                      </button>
                    )
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {selectedCategories.slice(0, 3).map((category) => (
            <span
              key={category}
              className="inline-flex items-center gap-1 rounded-full bg-[var(--bg-tertiary)] px-2.5 py-1 text-xs text-[var(--text-secondary)]"
            >
              {category}
              <button
                onClick={() => toggleCategory(category)}
                className="rounded-full p-0.5 hover:bg-[var(--bg-secondary)]"
              >
                <X size={12} />
              </button>
            </span>
          ))}
          {selectedCategories.length > 3 && (
            <span className="text-xs text-[var(--text-muted)]">
              +{selectedCategories.length - 3} more
            </span>
          )}
        </div>
      )}
    </div>
  )
}
