/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#075244',
        'primary-dark-green': '#002927',
        'primary-orange': '#FEF4D4',
        'primary-dark-orange': '#f8ab1c',
      },
    },
  },
  plugins: [],
}

