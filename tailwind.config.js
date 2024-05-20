/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: 'Nunito Sans, sans-serif',
      heading: 'Montserrat, sans-serif',
    },

    extend: {
      colors: {
        primary: '#08C076',
        body: '#677279',
        secondary: '#332885',
      },
      keyframes: {
        fadeInBottom: {
          '0%': {
            opacity: 0,
            transform: 'translateY(50px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        fadeInBottom: 'fadeInBottom 1s ease-in-out',
      },
    },
  },
  plugins: [],
};
