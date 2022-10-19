const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  future: {},
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ...colors,
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      2: '2px',
      3: '3px',
      4: '4px',
      5: '5px',
      6: '6px',
      7: '7px',
      8: '8px',
    },
    extend: {
      fontFamily: {
        sans: ['acumin-pro', ...defaultTheme.fontFamily.sans], // overide system default with 'AcuminPro-Regular'
      },
      lineClamp: {
        10: '10',
        12: '12',
        13: '13',
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
      },
      colors: {
        mwgray: {
          eel: '#CCC',
          el: '#DDD',
          l: '#A3A5A8',
          xl: '#F2F6FA',
          DEFAULT: '#707070',
          d: '#585858',
          xd: '#404040',
          xxd: '#404040',
        },
        mwgrey: {
          eel: '#DDD',
          el: '#CCC',
          l: '#A3A5A8',
          DEFAULT: '#707070',
          d: '#585858',
          xd: '#404040',
          xxd: '#404040',
        },
        mwblue: {
          hl: '#0054C3',
          el: '#20AAE6',
          l: '#007bff',
          DEFAULT: '#143b8f',
          d: '#009eeb',
          xd: '#0B2388',
        },
        mwcyan: {
          el: '#05FDEC',
          l: '#00B4B0',
          r: '#015E81',
          DEFAULT: '#038987',
          herol: '#005e7c',
          heror: '#05b9b5',
        },
        mworange: {
          l: '#f8811b',
          DEFAULT: '#f96914',
          d: '#e95d1f',
          ctal: '#BF2F2E',
          ctar: '#FB7945',
        },
        mwred: {
          l: '#F8811B',
          DEFAULT: '#CE1926',
          d: '#CE1926',
          ctal: '#BF2F2E',
          ctar: '#FB7945',
        },
        mwvumareach: {
          l: '#F96914',
          DEFAULT: '#CE1926',
          d: '#CE1926',
        },
        mwgreen: {
          DEFAULT: '#67cc29',
        },
        mwteal: {
          DEFAULT: '#00b3b0',
        },
        mwpink: {
          DEFAULT: '#EB0D8C',
          l: '#ffbad0',
        },
        mwyellow: {
          DEFAULT: '#F3ED3C',
          d: '#F8811B',
        },
      },
      zIndex: {
        '-10': '-10',
        '-20': '-20',
        '-30': '-30',
        '-40': '-40',
        '-50': '-50',
      },
      spacing: {
        c1: '33rem',
      },
      inset: {
        'c-30': '30%',
        'c-29': '29%',
        'c-28': '28%',
        'c-27': '27%',
        'c-26': '26%',
        'c-25': '25%',
        'c-24': '24%',
        'c-23': '23%',
        'c-22': '22%',
        'c-21': '21%',
        'c-20': '20%',
        'c-15': '15%',
        'c-14': '14%',
        'c-13': '13%',
        'c-12': '12%',
        'c-11': '11%',
        'c-10': '10%',
        'c-9': '9%',
        'c-8': '8%',
        'c-7': '7%',
        'c-6': '6%',
        'c-5': '5%',
      },
      width: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '47.5%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
        '1/8': '36%',
        'mw-width-95': '95%',
        'mw-width-97': '97%',
      },
      height: {
        '3/7': '47.5%',
      },
      vumaReachBgStepOne: {
        'vuma-reach-step-one': "url('/next-public/images/vuma-reach/images/Step1x2.png')",
      },
      minWidth: {
        'mw-card-min-width': '300px',
      },
      minHeight: {
        'mw-card-min-height': '340px',
      },
      borderWidth: {
        'mw-border-b-6': '6px',
      },
      fontSize: {
        xxs: '.60rem',
      },

      screens: {
        xsphone: '320px',
        phone: '480px',
        tablet: '768px',
        smallScreen: '992px',
        laptop: '1025px',
        desktop: '1920px',
        mediumScreen: '640px',
        '2k': '2048px',
        '4k': '3840px',
        portrait: { raw: '(orientation: portrait)' },
        landscape: { raw: '(orientation: landscape)' },
      },
      margin: {
        18: '4.5rem',
        '-18': '-4.5rem',
      },
      keyframes: {
        productCardEntry: {
          from: { transform: 'scaleY(0.1)' },
          to: { transform: 'scaleY(1)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        productCardEntry: 'productCardEntry 0.4s ease',
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      boxShadow: {
        '2xl': '0px 4px 4px rgba(0, 0, 0, 0.25)',
        mw: '0 2px 8px rgba(0, 0, 0, 0.2)',
        mwHover: '0 6px 8px rgba(0, 0, 0, 0.4)',
        mwts: '0 2px 8px rgba(0, 0, 0, 0.2)',
        mwtsHover: '0 6px 8px rgba(0, 0, 0, 0.4)',
        mwFooter: '0 0 24px rgba(0, 0, 0, 0.15)',
      },
      listStyleType: {
        square: 'square',
      },
    },
  },
  variants: {
    extend: {
      grayscale: ['hover', 'focus'],
      dropShadow: {
        mwDS: '0 35px 35px rgba(0, 0, 0, 0.25)',
      },
    },
    lineClamp: ['responsive'],
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp'), require('@tailwindcss/typography')],
};
