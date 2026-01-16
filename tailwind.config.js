/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        tech: ['Rajdhani', 'sans-serif'],
        brush: ['Comforter Brush', 'cursive'],
      },
    },
  },
  plugins: [],
}