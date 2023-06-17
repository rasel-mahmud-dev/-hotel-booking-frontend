/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2c65ec"
      },
      boxShadow: {
        sm2: "1px 3px 20px 4px #cbcbcb59",
        xxs: "0 2px 15px -4px #36363626",
        xxxs: "0 2px 13px 2px #9f9f9f05"
      },
    },
  },
  plugins: [],
}