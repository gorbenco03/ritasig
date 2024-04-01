const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  // mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './sections/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    // We add colors here so we disable all other default Tailwind colors

    extend: {
      fontFamily: {
        sans: [
          /**
           * Font faces for Montserrat were added in files below
           * Storybook: packages/frontend/.storybook/preview-head.html
           * Next.js: packages/frontend/pages/_app.tsx
           */
          'Montserrat',
          ...defaultTheme.fontFamily.sans,
        ],
      },
      lineHeight: {
        11: '2.75rem',
        12: '3.00rem',
        13: '3.25rem',
        14: '3.50rem',
        15: '3.75rem',
        16: '4.00rem',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      borderColor: ['active'],
      textColor: ['active'],
    },
  },
  plugins: [],
};
