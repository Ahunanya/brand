// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        flyin: {
          '0%': { opacity: 0, transform: 'translateY(40px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        flyin: 'flyin 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
};
