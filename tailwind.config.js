module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      keyframes: {
        'fade-appear': {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
      },
      animation: {
        'fade-appear': 'fade-appear 0.2s linear',
      },
    },
  },
};
