module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
            colors: {
              insightsBlue: "#31c4ff",
              insightsOddTableRow: "#E8F0FE"
        }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }