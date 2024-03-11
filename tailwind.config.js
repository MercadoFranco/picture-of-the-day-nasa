/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#030637",
        primaryLight: "#444778",
        secondary: "#3c0753",
        blackLowOpacity: "#00000033",
      },
      fontFamily: {
        manrope: ["Manrope", "Arial", "sans-serif"],
        roboto: ["Roboto", "Arial", "sans-serif"],
        strait: ["Strait", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
