/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        metrys: {
          950: '#0A1128', // Deepest brand navy/black from palette
          900: '#111D38',
          800: '#1E2E4A', // Core brand navy
          700: '#2A4365',
          600: '#345279',
          500: '#476994',
          400: '#6B82A0', // Soft steel blue
          300: '#9FB2C8',
          200: '#CBD7E5',
          100: '#E2E8F0', // Light border
          50: '#F1F5F9',  // Cool light card background
          canvas: '#F8FAFC', // Ultra-clean canvas background
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(10, 17, 40, 0.05), 0 1px 2px -1px rgba(10, 17, 40, 0.05)',
        'card-hover': '0 10px 25px -5px rgba(10, 17, 40, 0.08), 0 8px 10px -6px rgba(10, 17, 40, 0.04)',
        'elevated': '0 20px 35px -10px rgba(10, 17, 40, 0.1)',
      }
    },
  },
  plugins: [],
}
