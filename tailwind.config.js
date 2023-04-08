/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [],
	content: [
		'./app/**/*.{ts,tsx}',
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./layouts/**/*.{ts,tsx}',
	],
	theme: {
		extend: {
			rotate: {
				270: '270deg',
			},
		},
	},
	plugins: [],
};
