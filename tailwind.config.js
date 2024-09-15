/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  lightMode:"class",
  theme: {
    extend: {
      colors: {
        primary:{
          50 : "#FF2CDF",
          100: "#1610c8",
          200: "#5a0bda",
          300: "#a706f0",
          400: "#f5e6fa",
          500: "#8b06e9",
          600: "#8859c7",
          700: "#5d18b4",
          800: "#4f189f",
          // Emerald green
          850: "##50C878",
          900: "#af90e6",
          950: "#221F3A"
        }
      },
    },
  },
  plugins: [],
}