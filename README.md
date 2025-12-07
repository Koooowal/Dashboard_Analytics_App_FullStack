# Dashboard Analytics App

A modern, responsive analytics dashboard built with React, TypeScript, and Tailwind CSS. Features interactive charts, real-time data updates, and a beautiful dark/light mode.

## 🚀 Features

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning fast build tool
- **Tailwind CSS 4** - Utility-first CSS framework
- **Dark/Light Mode** - Theme switching with system preference detection
- **Responsive Design** - Works on all device sizes
- **ESLint + Prettier** - Code quality and formatting

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (buttons, inputs, etc.)
│   ├── charts/         # Chart components (line, bar, pie, area)
│   ├── layout/         # Layout components (header, sidebar, footer)
│   └── dashboard/      # Dashboard-specific components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
│   ├── formatters.ts   # Number, date, currency formatting
│   └── helpers.ts      # General helper functions
├── types/              # TypeScript type definitions
│   ├── dashboard.ts    # Dashboard-related types
│   ├── chart.ts        # Chart-related types
│   └── api.ts          # API-related types
├── services/           # API services and data fetching
├── store/              # State management (Zustand)
└── assets/             # Static assets (images, fonts)
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/dashboard-analytics.git
cd dashboard-analytics
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run type-check` | Run TypeScript type checking |

## 🎨 Theming

The app supports dark and light modes with CSS custom properties. Theme colors are defined in `src/index.css` and can be customized.

### Color Variables

- `--color-primary` - Primary brand color
- `--color-success` - Success/positive states
- `--color-warning` - Warning states
- `--color-danger` - Error/danger states
- `--bg-primary` - Main background
- `--bg-secondary` - Secondary background
- `--text-primary` - Primary text color

## 🗺️ Roadmap

- [ ] Interactive charts with Recharts
- [ ] Date range picker
- [ ] Data export (PDF/CSV)
- [ ] Real-time data updates
- [ ] User performance comparison
- [ ] Multiple time frame views

## 📄 License

This project is licensed under the MIT License.
