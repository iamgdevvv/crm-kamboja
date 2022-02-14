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
					350: '#dcdcdc',
					500: '#7d7d7d',
				},
				pink: {
					100: '#fff2f7',
					200: '#ffe7f1',
					500: '#d23574'
				},
				green: {
					50: '#e7ffee',
					400: '#4bac60'
				},
				yellow: {
					400: '#f5be34'
				},
				fuchsia: {
					600: '#b44198',
				},
				cyan: {
					400: '#2dc6df'
				}
			},
		},
	},
	shortcuts: {
		'flexs': 'flex flex-row flex-wrap items-center',
		'flexs-center': 'flexs justify-center',
		'cta': 'flex items-center justify-center text-18px py-18px px-16px border rounded-10px transition duration-300',
		'cta-primary' : 'cta border-pink-500 bg-pink-500 text-white',
		'cta-secondary' : 'cta border-gray-300',
		'cta-icon' : 'after:(content-a text-0px inline-block w-10px h-16px mt-1px bg-contain bg-no-repeat bg-center transform-gpu transition duration-300)',
		'cta-iconright' : 'cta-icon after:ml-12px hover:after:(translate-x-3px) after:order-last',
		'cta-iconleft' : 'cta-icon after:mr-12px hover:after:(-translate-x-3px) after:order-first',
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