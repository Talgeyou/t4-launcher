module.exports = {
  content: ['./src/renderer/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'profile-card': '1fr 1fr 90px',
      },
    },
  },
  variants: {},
  // eslint-disable-next-line global-require
  plugins: [require('tailwind-scrollbar')],
};
