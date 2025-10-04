/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'trust-blue': '#10224E',
        'trust-cyan': '#56F0C8',
        'trust-light-blue': '#16B1F0',
        'trust-dark': '#0B1220',
        'trust-light': '#E8EEFC',
      },
    },
  },
  plugins: [],
}