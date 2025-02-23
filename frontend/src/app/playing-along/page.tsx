'use client';

import { VideoGrid } from '@/components/VideoGrid';
import { getPlayingAlongVideos, type Video } from '@/lib/api';
import { useState, useEffect } from 'react';

export const revalidate = 3600; // Revalidate every hour

export default function PlayingAlongPage() {
	const [videos, setVideos] = useState<Video[]>([]);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchVideos() {
			try {
				const data = await getPlayingAlongVideos();
				setVideos(data);
			} catch (err) {
				console.error('Error fetching playing along videos:', err);
				setError('Failed to load videos. Please try again later.');
			} finally {
				setIsLoading(false);
			}
		}

		fetchVideos();
	}, []);

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
			<h1 className='text-3xl font-bold mb-8'>Playing Along</h1>

			{error ? (
				<div className='rounded-md bg-red-50 p-4'>
					<div className='flex'>
						<div className='ml-3'>
							<h3 className='text-sm font-medium text-red-800'>Error</h3>
							<div className='mt-2 text-sm text-red-700'>{error}</div>
						</div>
					</div>
				</div>
			) : (
				<VideoGrid
					videos={videos}
					type='playing'
					error={error}
					isLoading={isLoading}
				/>
			)}
		</div>
	);
}
