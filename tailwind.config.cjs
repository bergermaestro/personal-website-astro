/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
		  colors: {
			default: {
			  400: "#15293A",
			  900: "#132434",
			},
			brandTeal: "#58B7B7",
			brandOrange: "#ED9665"
		  },
		  fontFamily: {
			'poppins': ["Poppins", 'sans-serif'],
			'crete-round': ['"Crete Round"', 'serif']
		  }
		},
	  },
	  plugins: [
		require('@tailwindcss/typography'),
	  ],
}
