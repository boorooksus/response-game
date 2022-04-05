module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    ripple: (theme) => ({
      colors: theme("colors"),
    }),
    extend: {},
  },
  plugins: [require("tailwindcss-ripple")()],
};
