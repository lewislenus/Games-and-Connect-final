/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f4ff",
          100: "#d6e1ff",
          200: "#adc3ff",
          300: "#84a5ff",
          400: "#5b87ff",
          500: "#2a5fdd",  // blue base
          600: "#1c47aa",
          700: "#122f77",
          800: "#091944",
          900: "#020b1a",  // near black-blue
          950: "#000509",  // darkest
        },
        secondary: {
          50: "#fff8f1",
          100: "#feecdc",
          200: "#fcd9bd",
          300: "#fdba8c",
          400: "#ff8a4c",
          500: "#ff5a1f",  // orange base
          600: "#d03801",
          700: "#b43403",
          800: "#8a2c0d",
          900: "#73230d",
        },    
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0) scale(0)', opacity: 0 },
          '10%': { opacity: 0.3 },
          '50%': { transform: 'translateY(-100px) scale(1)', opacity: 0.6 },
          '90%': { opacity: 0.1 },
          '100%': { transform: 'translateY(-200px) scale(0.5)', opacity: 0 }
        }
      },
      animation: {
        'float': 'float 20s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
