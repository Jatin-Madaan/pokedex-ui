/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'theme-colour-dark': 'rgb(120, 110, 159)',
      'theme-colour-light': 'rgb(163, 157, 189)',
      'theme-colour-text-dark': 'rgb(69, 63, 117)',
      'theme-colour-text-light': 'rgb(127, 118, 162)',
      'theme-colour-gray': 'rgb(241, 241, 241)',
      'theme-colour-dim': 'rgb(200, 196, 213)',
      'theme-colour-violet': 'rgb(76, 29, 149, 0.6)',
    },
    extend: {},
  },
  plugins: [],
}

