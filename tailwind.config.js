/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        kanit: ["Kanit"],
      },
      colors: {
        primary: "text-slate-900",
        secondary: "text-slate-100",
        tersier: "text-orange-500",
      },
    },
  },
  plugins: [],
};
