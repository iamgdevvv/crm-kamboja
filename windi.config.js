export default {
	darkMode: 'theme-dark',
	theme: {
		extend: {
			screens: {
				'sm': '375px',
				'md': '600px',
				'lg': '900px',
				'xl': '1200px',
				'2xl': '1600px',
			},
			fontFamily: {
				sans: ['Nunito', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
			},
			colors: {
				dark: {
					400: '#263238',
				},
				gray: {
					200: '#e8e8e8',
					300: '#c4c4c4',
					500: '#7d7d7d',
				},
				pink: {
					100: '#fff2f7',
					200: '#ffe7f1',
					500: '#d23574'
				},
				green: {
					400: '#4bac60'
				},
				cyan: {
					400: '#2dc6df'
				}
			},
		},
	},
	shortcuts: {
		'flexs': 'flex flex-row flex-wrap items-center',
		'cta-fill-pinks' : 'flex items-center justify-center text-18px py-18px px-20px border border-pink-500 rounded-10px bg-pink-500 text-white transition duration-300 hover:after:(translate-x-3px) after:(content-a text-0px inline-block w-10px h-18px ml-14px bg-contain bg-no-repeat bg-center transform-gpu transition duration-300)',
	},
	corePlugins: {
		outline: false
	},
	variants: {
		extend: {
			outline: [],
		},
	},
	plugins: [
		require('windicss/plugin/line-clamp'),
		require('windicss/plugin/aspect-ratio'),
	],
}