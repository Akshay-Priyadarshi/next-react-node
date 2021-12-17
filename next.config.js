const withPWA = require('next-pwa')

// @ts-check
/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
	typescript: {
		tsconfigPath: './tsconfig.json',
	},
	distDir: 'dist/.next',
	reactStrictMode: true,
}

const nextConfigWithPwa = withPWA({
	pwa: {
		dest: 'public',
		register: true,
		skipWaiting: true,
		disable: process.env.NODE_ENV === 'development',
	},
	...nextConfig,
})

module.exports = nextConfigWithPwa
