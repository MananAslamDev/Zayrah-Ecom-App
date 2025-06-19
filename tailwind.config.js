module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: "#4b0d0d",
        },
      },
    },
    plugins: [],
  };
  const { parkui } = require('@park-ui/tailwind-plugin');
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  plugins: [parkui()],
};
