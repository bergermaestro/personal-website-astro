/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      blue: {
        500: "#3D7EE8",
        600: "#1262E3",
      },
      orange: {
        500: "#E96B49",
        600: "#E33F12",
      },
      yellow: {
        500: "#E9BE52",
        600: "#E3A812",
      },
      livid: {
        200: "#D8E4EF",
        300: "#A6C2D6",
        500: "#577A93",
        700: "#243E50",
        900: "#192329",
      },
    },
    extend: {
      fontFamily: {
        phudu: ["Phudu", "sans-serif"],
        instrumentSans: ["'Instrument Sans'", "sans-serif"],
      },
    },
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(function ({ matchUtilities }) {
      matchUtilities({
        "font-width": (value) => ({
          fontVariationSettings: `"wdth" ${value}`,
        }),
      });
    }),
  ],
};
