/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: '#000',
			white: '#fff',
			// https://colorhunt.co/palette/dddddd22283130475ef05454
			primary: {
				DEFAULT: '#30475E'
			},
			accent: {
				DEFAULT: '#F05454'
			},
			dark: {
				DEFAULT: '#222831'
			},
			light: {
				DEFAULT: '#DDDDDD'
			},
			success: {
				DEFAULT: '#54F0A2'
			},
			warning: {
				DEFAULT: '#F0E654'
			},
			danger: {
				DEFAULT: '#F05454'
			},
			disabled: {
				DEFAULT: '#DDDDDD'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Raleway', 'sans-serif']
			}
		}
	},
	plugins: []
};
