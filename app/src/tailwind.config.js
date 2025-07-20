/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          customYellow: '#FACC15',
          customCyan: '#06B6D4',
          customGray: '#4B5563',
        },
      },
    },
    plugins: [],
  }