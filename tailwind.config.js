
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Include all paths that contain NativeWind classes
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'dark': '#151515',
        'fuchsia-pink': {
          '50': '#fcf7fc',
          '100': '#f9eef9',
          '200': '#f2dcf2',
          '300': '#e7c0e6',
          '400': '#d79bd5',
          '500': '#c273bf',
          '600': '#a654a1',
          '700': '#884382',
          '800': '#70386a',
          '900': '#5d3258',
          '950': '#3a1835',
        }
      },
    },
  },
  plugins: [],
};

