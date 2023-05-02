/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
		  colors: {
			default: {
			  300: "#1A3247",
			  400: "#15293A",
			  900: "#132434",
			},
			brandTeal: "#58B7B7",
			brandOrange: "#ED9665"
		  },
		  fontFamily: {
			  'jakarta': ["'Plus Jakarta Sans'" ,'sans-serif'],
		  }
		},
		screens: {
			'xs': '475px',
			...defaultTheme.screens
		}
	  },
	  plugins: [
		require('@tailwindcss/typography'),
	  ],
}
