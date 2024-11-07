/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,scss}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007aff',
          dark: '#005a9e',
        },
        muted: {
          DEFAULT: '#8d9eb5',
          
          dark: '#6b7280',
        }
      },
    },
  },
  plugins: [],
}

