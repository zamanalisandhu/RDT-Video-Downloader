module.exports = {
  content: [
    "./api/**/*.php",
    "./api/includes/**/*.php",
    "./api/assets/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'brand-orange': '#FF4500',
        'brand-orange-light': '#FF5722',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
