/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./pages/**/*.{html,js,ts,tsx}", "./components/**/*.{html,js,ts,tsx}"],
  purge: ["./pages/**/*.{html,js,ts,tsx}", "./components/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'dirty-white': '#DFE0E1'
      }
    },
  },
  plugins: [],
}

