/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        epilogue: ['Epilogue', 'sans-serif'],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: '#2563eb',
        secondary: '#1f2937',
        warning: 'rgb(220 38 38)',
        green: 'rgb(74 222 128)',
        red: 'rgb(220 38 38)',  
      },
      boxShadow: {
        secondary: '10px 10px 20px rgba(2, 2, 2, 0.25)',
      },
    },
  },
  plugins: [],
}