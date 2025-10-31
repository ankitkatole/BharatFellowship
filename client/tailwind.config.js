/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    // CRITICAL: This line tells Tailwind to scan every file 
    // in the 'src' directory, including .jsx files.
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Momo Trust Display', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}
