/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./pages/**/*.{html,js,ts,tsx}", "./components/**/*.{html,js,ts,tsx}"],
  purge: ["./pages/**/*.{html,js,ts,tsx}", "./components/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      textColor: {
        'default-black': '#212529',
        'light-indigo': '#A5B4FC',
        'dirty-white': '#DFE0E1'
      },
      backgroundColor: {
        'dirty-white': '#DFE0E1',
        'default-white': '#F8F9FA',
        'light-indigo': '#A5B4FC',
      },
    },
  },
  plugins: [],
}

