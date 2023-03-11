/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "slide-in-top":
          "slide-in-top 2s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
      },
      keyframes: {
        "slide-in-top": {
          "0%": {
            transform: "translateY(-100px)",
            opacity: "0",
          },
          "20%": {
            transform: "translateY(0)",
            opacity: "1",
          },
          "80%": {
            transform: "translateY(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(-100px)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};
