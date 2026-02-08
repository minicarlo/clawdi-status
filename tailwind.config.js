/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clawdi: {
          // Dark mode colors (default)
          bg: 'var(--clawdi-bg)',
          card: 'var(--clawdi-card)',
          border: 'var(--clawdi-border)',
          text: 'var(--clawdi-text)',
          muted: 'var(--clawdi-muted)',
          primary: '#3b82f6',
          success: '#22c55e',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#06b6d4'
        }
      }
    },
  },
  plugins: [],
}
