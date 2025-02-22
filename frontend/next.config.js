/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	basePath: process.env.NODE_ENV === 'production' ? '/willtendy' : '',
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
};

module.exports = nextConfig;
