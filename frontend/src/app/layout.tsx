import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@mantine/core/styles.css';
import { Providers } from '@/components/Providers';
import { Header } from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Will Tendy',
	description: 'Personal website of Will Tendy',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<head>
				<link
					href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap'
					rel='stylesheet'
				/>
			</head>
			<body className={inter.className}>
				<Providers>
					<Header />
					<main>{children}</main>
				</Providers>
			</body>
		</html>
	);
}
