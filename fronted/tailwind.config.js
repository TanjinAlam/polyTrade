/** @type {import('tailwindcss').Config} */
export default {
    content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
    	extend: {
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
			},
			colors: {
				primary: {
					DEFAULT: '#000000',
				},
				secondary: {
					DEFAULT: '#7d59fb',
				},
			},
			keyframes: {
				loadingBar: {
					'0%': { transform: 'translateX(-50%)' },
					'100%': { transform: 'translateX(100%)' },
				},
			},
			container: {
				center: true,
				padding: '1rem',
			},
		},
    },
    plugins: [],
}

