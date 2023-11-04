/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./pages/**/*.{html,js,ts,tsx}", "./components/**/*.{html,js,ts,tsx}"],
  purge: ["./pages/**/*.{html,js,ts,tsx}", "./components/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      textColor: {
        'light-indigo': '#A5B4FC',
        'dirty-white': '#DFE0E1'
      },
      backgroundColor: {
        'dirty-white': '#DFE0E1',
        'light-indigo': '#A5B4FC',
      },
    },
  },
  plugins: [],
}

