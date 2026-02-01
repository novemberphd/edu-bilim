module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        spotify: {
          black: "#121212",
          gray: "#181818",
          "light-gray": "#282828",
          text: "#ffffff",
          "text-secondary": "#b3b3b3",
          green: "#1DB954",
          "green-light": "#1ed760",
        },
      },
      backgroundColor: {
        "spotify-base": "#121212",
        "spotify-elevated": "#181818",
        "spotify-highlight": "#282828",
      },
      animation: {
        "playing-bar": "playing-bar 0.8s ease-in-out infinite",
        "spotify-fade": "fadeIn 0.3s ease-out",
        slideInRight: "slideInRight 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
