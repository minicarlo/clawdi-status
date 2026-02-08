/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clawdi: {
          bg: '#0f172a',
          card: '#1e293b',
          border: '#334155',
          text: '#f1f5f9',
          muted: '#94a3b8',
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
