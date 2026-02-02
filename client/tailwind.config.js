/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "spotify-green": "#1DB954",
        "spotify-black": "#121212",
        "spotify-base": "#181818",
        "spotify-elevated": "#282828",
        "spotify-highlight": "#3E3E3E",
        "spotify-secondary": "#B3B3B3",
      },
    },
  },
  plugins: [],
};
