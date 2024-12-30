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
        600: "#3D5D72",
        700: "#243E50",
        800: "#1F333F",
        900: "#192329",
      },
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",
    },
    extend: {
      fontFamily: {
        phudu: ["Phudu", "sans-serif"],
        instrumentSans: ["'Instrument Sans'", "sans-serif"],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.livid.300"),
            h1: {
              color: theme("colors.yellow.600"),
              fontFamily: "phudu",
            },
            h2: {
              color: theme("colors.yellow.600"),
              fontFamily: "phudu",
            },
            h3: {
              color: theme("colors.yellow.600"),
            },
            h4: {
              color: theme("colors.yellow.600"),
            },
            a: {
              color: theme("colors.livid.500"),
              "&:hover": {
                color: theme("colors.livid.600"),
              },
            },
            blockquote: {
              color: theme("colors.livid.200"),
              borderInlineStartColor: theme("colors.livid.500"),
            },
            code: {
              color: theme("colors.livid.200"),
              backgroundColor: "#263238", // to match material theme background
              padding: `2px ${theme("spacing.1")}`,
              borderRadius: theme("borderRadius.DEFAULT"),
              fontWeight: "400",
            },
            "code::before": {
              content: "",
            },
            "code::after": {
              content: "",
            },
          },
        },
      }),
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
