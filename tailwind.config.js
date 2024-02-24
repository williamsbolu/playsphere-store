/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: 'Roboto, sans-serif',
    },

    extend: {
      colors: {
        primary: '#332885',
        secondary: '#08C076',
      },
    },
  },
  plugins: [],
};
