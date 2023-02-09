const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {

  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: "class", // or 'media' or 'class',
  mode: "jit",
  theme: {
    fontFamily: {
     'sans': ['Graphik', ...defaultTheme.fontFamily.sans],
    },
    extend: {
        screens: {
          'xxl': {'min': '1400px'},
        },
        fontSize: {
          'xxxs': '0.625rem',
          'xxs': '.688rem',
          'base-x': '1.125rem'
        },
        padding: {
          '1/2': '50%',
          full: '100%'
        },
        borderWidth: {
          '1.5': '1.5px'
        },
        zIndex: {
          '60': '60',
          '70': '70',
          '80': '80',
          '90': '90',
          '100': '100',
          '110': '110',
          '120': '120',
         },
        colors: {
          primary: {
            light: "#F2F7FE",
            DEFAULT: '#3581F3',
            1: "#4F91F5",
            dark: "#2C6CCA"
          },
          secondary: {
            light: "#F5F5F5",
            DEFAULT: '#F0F0F0',
          },
          grey: {
            1: "#F6F7FA",
            2: "#91979E",
            3: "#AEB5BE",
          },
          black: {
            1: "#02050A"
          },
          success: {
            light: "#E2FCF2",
            DEFAULT: "#1DC286",
            1: "#23E9A1"
          },
          danger: {
            faint: "#FEF2F2",
            light: "#FEE6E4",
            DEFAULT: "#F34035",
            1: "#EC191C",
          },
          warn: {
            light: "#FEF0E4",
            DEFAULT: "#F39035"
          },
          dark: {
            DEFAULT: '#212326',
            1: "#0B0D0F",
            2: "#5C6166",
            3: "#111E31",
            4: "#E7E7E7",

          }
        }
      }
  },
  variants: {
    
    extend: {
      borderColor: ['valid', 'invalid', 'dark'],
      backgroundColor: ['disabled', 'dark'],
      textColor: ['disabled', 'dark']

    },
  },
  plugins: [],
}