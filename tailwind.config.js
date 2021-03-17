module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'gold': '#FFD700',
        'silver': '#C0C0C0',
        'bronze': '#A97142'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
