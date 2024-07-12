/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        contrast: "#019ACA",
        shipping: "#00ABFB",
        blacks: "#1D1D1D",
        prices: "#2C3E50"
      },
      fontFamily:{
        elegant: 'system-ui'
      }
    },
  },
  plugins: [],
}