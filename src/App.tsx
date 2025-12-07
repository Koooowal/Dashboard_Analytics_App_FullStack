import { useTheme } from '@hooks/useTheme'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-theme">
      <header className="bg-[var(--bg-primary)] border-b border-[var(--border-color)] px-6 py-4 shadow-[var(--shadow-sm)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-2xl font-bold text-[var(--color-primary)]">
            Dashboard Analytics
          </h1>
          <button
            onClick={toggleTheme}
            className="rounded-lg bg-[var(--bg-tertiary)] px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--border-color)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="animate-fade-in rounded-xl bg-[var(--bg-primary)] p-8 shadow-[var(--shadow-md)]">
          <h2 className="mb-4 text-xl font-semibold">
            Welcome to Dashboard Analytics
          </h2>
          <p className="mb-6 text-[var(--text-secondary)]">
            This is a modern analytics dashboard built with React, TypeScript,
            and Tailwind CSS.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total Revenue', value: '$45,231', change: '+20.1%' },
              { label: 'Active Users', value: '2,350', change: '+15.2%' },
              { label: 'Conversion Rate', value: '3.24%', change: '+4.5%' },
              { label: 'Avg. Order Value', value: '$128', change: '+8.3%' },
            ].map((metric) => (
              <div
                key={metric.label}
                className="rounded-lg bg-[var(--bg-secondary)] p-4 transition-colors hover:bg-[var(--bg-tertiary)]"
              >
                <p className="text-sm text-[var(--text-muted)]">
                  {metric.label}
                </p>
                <p className="mt-1 text-2xl font-bold">{metric.value}</p>
                <p className="mt-1 text-sm text-[var(--color-success)]">
                  {metric.change}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-dashed border-[var(--border-color)] p-8 text-center">
            <p className="text-[var(--text-muted)]">
              📊 Charts and more features coming soon...
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-[var(--border-color)] bg-[var(--bg-primary)] px-6 py-4 text-center text-sm text-[var(--text-muted)]">
        <p>Dashboard Analytics App © {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

export default App
