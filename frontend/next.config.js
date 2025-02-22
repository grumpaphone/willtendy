/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
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
				protocol: 'http',
				hostname: 'localhost',
				port: '1337',
				pathname: '/**',
			},
			{
				protocol: 'http',
				hostname: '127.0.0.1',
				port: '1337',
				pathname: '/**',
			},
		],
	},
};

module.exports = nextConfig;
