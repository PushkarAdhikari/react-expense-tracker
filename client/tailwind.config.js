/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      colors: {
        midnight: { 50: "#e8eaf0", 100: "#c4c9d6", 200: "#9ca3b9", 300: "#737d9c", 400: "#525c7a", 500: "#343b54", 600: "#2a3047", 700: "#1e2338", 800: "#161a29", 900: "#0c0e17" },
        gold: { 50: "#fdf6e8", 100: "#fae8c4", 200: "#f5d58c", 300: "#efbc4f", 400: "#e8a72a", 500: "#d48a1a", 600: "#b86c14", 700: "#934f13", 800: "#7a4017", 900: "#6a3619" },
        rose: { 400: "#f06292", 500: "#ec407a", 600: "#d81b60" },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "scale-in": "scaleIn 0.4s ease-out forwards",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        scaleIn: { "0%": { opacity: "0", transform: "scale(0.95)" }, "100%": { opacity: "1", transform: "scale(1)" } },
      },
    },
  },
  plugins: [],
};
