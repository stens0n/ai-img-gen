/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      animation: {
        'loadingEffect': 'loadingEffect 10s ease-in-out infinite',
      },
      keyframes: {
        loadingEffect: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
    },
  },
}