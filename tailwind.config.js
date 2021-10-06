module.exports = {
  prefix: '',
  purge: {
    content: [
      './src/**/*.{html,ts}',
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        navy: {
          DEFAULT: '#25324f'
        },
        blue: {
          light: '#85d7ff',
          DEFAULT: '#1fb6ff',
          dark: '#009eeb',
        },
        pink: {
          light: '#ff7ce5',
          DEFAULT: '#ff49db',
          dark: '#ff16d1',
        },
        gray: {
          darkest: '#1f2d3d',
          dark: '#3c4858',
          DEFAULT: '#c0ccda',
          light: '#e0e6ed',
          lightest: '#f9fafc',
        },
        white: {
          DEFAULT: '#f9f9f9'
        },
        meet: {
          DEFAULT: '#FFB703',
          light: '#40FFB703'
        },
        inform: {
          DEFAULT: '#219ebc',
          light: '#40219EBC'
        },
        play: {
          DEFAULT: '#8ecae6',
          light: '#408ecae6'
        },
        eat: {
          DEFAULT: '#fb8500',
          light: '#40fb8500'
        }
      }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['responsive', 'hover', 'focus', 'active', 'disabled'],
      textColor: ['responsive', 'hover', 'focus', 'active', 'disabled'],
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
