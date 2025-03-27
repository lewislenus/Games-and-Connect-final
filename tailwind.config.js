/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#f05053",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a",
        },
        secondary: {
          50: "#f7fee7",
          100: "#e1eec3",
          200: "#bef264",
          300: "#a3e635",
          400: "#84cc16",
          500: "#65a30d",
          600: "#4d7c0f",
          700: "#3f6212",
          800: "#365314",
          900: "#1a2e05",
          950: "#0c1a02",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
