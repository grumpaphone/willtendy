/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	output: 'export',
	basePath: process.env.NODE_ENV === 'production' ? '/willtendy' : '',
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'uploads-ssl.webflow.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'i.ytimg.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'img.youtube.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'willtendy-production.up.railway.app',
				pathname: '/**',
			},
		],
	},
};

module.exports = nextConfig;
