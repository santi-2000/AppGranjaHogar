const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/index.jsx',
    './App.jsx',
    './app/**.{js,jsx}',
    './app/**/*.{js,jsx}',
    './components/**/*.{ts,jsx}',
     './node_modules/nativewind/**/*.js',
    './node_modules/@rnr/**/*.{ts,jsx}'
  ],
  presets: [require('nativewind/preset')],
  theme: {},
  plugins: [],
};