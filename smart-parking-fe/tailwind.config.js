/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F97316',
          red: '#EF4444',
          green: '#22C55E',
          blue: '#3B82F6',
          purple: '#7C3AED',
          gray: '#6B7280',
        }
      }
    },
  },
  plugins: [],
}
