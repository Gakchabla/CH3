/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        home: "url('/src/assets/homebg.svg')",
      },
      fontFamily: {
        gothamTitle: ["GOTHAM ROUNDED BOLD", "sans-serif"],
        gotham: ["GOTHAM ROUNDED", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
