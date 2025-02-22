'use client';

import { Container, SimpleGrid, Title, Alert, Text } from '@mantine/core';
import { VideoCard } from '@/components/VideoCard';
import { getLiveVideos, type Video } from '@/lib/api';
import { useState, useEffect } from 'react';

export const revalidate = 3600; // Revalidate every hour

export default function LiveVideosPage() {
	const [videos, setVideos] = useState<Video[]>([]);
	const [error, setError] = useState('');

	useEffect(() => {
		async function fetchData() {
			try {
				console.log('Fetching live videos...');
				const data = await getLiveVideos();
				console.log('Received live videos:', JSON.stringify(data, null, 2));
				setVideos(data || []);
			} catch (err) {
				console.error('Error fetching live videos:', err);
				setError(
					'Failed to load videos. Please make sure the CMS is running at http://localhost:1337'
				);
			}
		}
		fetchData();
	}, []);

	return (
		<Container size='lg' py='xl'>
			<Title order={1} mb='xl'>
				Live Videos
			</Title>

			{error ? (
				<Alert color='red' title='Error' mb='xl'>
					{error}
				</Alert>
			) : videos.length > 0 ? (
				<SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing='lg'>
					{videos.map((video) => (
						<div key={video.id}>
							<pre>{JSON.stringify(video, null, 2)}</pre>
							<VideoCard video={video} type='live' />
						</div>
					))}
				</SimpleGrid>
			) : (
				<Text c='dimmed'>No live videos available yet.</Text>
			)}
		</Container>
	);
}
