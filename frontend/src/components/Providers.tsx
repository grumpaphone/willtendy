'use client';

import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';

const theme = createTheme({
	fontFamily: 'Montserrat, sans-serif',
	headings: {
		fontFamily: 'Montserrat, sans-serif',
	},
	colors: {
		brand: [
			'#f4e5e5',
			'#ecd4d4',
			'#e4c3c3',
			'#dcb6b6',
			'#d5b0b0',
			'#dea9a9', // Primary pink color
			'#c69898',
			'#ae8787',
			'#967676',
			'#7e6565',
		],
	},
	primaryColor: 'brand',
	components: {
		Container: {
			defaultProps: {
				size: 'lg',
			},
		},
		Title: {
			styles: {
				root: {
					fontWeight: 600,
				},
			},
		},
		Text: {
			styles: {
				root: {
					lineHeight: 1.6,
				},
			},
		},
	},
	colorScheme: 'light',
	white: '#dea9a9',
});

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<MantineProvider 
			theme={theme}
			cssVariablesSelector="body"
		>
			<Notifications />
			<div style={{ backgroundColor: '#dea9a9', minHeight: '100vh' }}>
				{children}
			</div>
		</MantineProvider>
	);
}
