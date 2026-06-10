/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0D0D14",
          secondary: "#16161F",
          card: "#1E1E2A",
          elevated: "#252533",
        },
        brand: {
          pink: "#FF3B6F",
          teal: "#4ECDC4",
          muted: "#8B8B9E",
        },
        role: {
          single: "#FF3B6F",
          wing: "#4ECDC4",
          taken: "#8B8B9E",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#B0B0C3",
          muted: "#6B6B80",
        },
        border: {
          subtle: "#2A2A3A",
          default: "#3A3A4A",
        },
      },
      fontFamily: {
        sans: ["Inter", "System"],
      },
    },
  },
  plugins: [],
};
