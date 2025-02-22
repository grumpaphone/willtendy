'use client';

import { Container, Title, AspectRatio, Alert } from '@mantine/core';
import { getLiveVideoBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

export const revalidate = 3600; // Revalidate every hour

interface Props {
	params: {
		slug: string;
	};
}

export default function LiveVideoPage({ params }: Props) {
	const [video, setVideo] = useState<any>(null);
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadVideo() {
			try {
				console.log('LiveVideoPage: Loading video with slug:', params.slug);
				const videoData = await getLiveVideoBySlug(params.slug);
				console.log('LiveVideoPage: Loaded video:', videoData);

				if (!videoData) {
					console.log('LiveVideoPage: Video not found');
					notFound();
					return;
				}

				setVideo(videoData);
			} catch (err) {
				console.error('LiveVideoPage: Error loading video:', err);
				setError('Failed to load video. Please try again later.');
			} finally {
				setLoading(false);
			}
		}

		loadVideo();
	}, [params.slug]);

	if (loading) {
		return (
			<Container size='lg' py='xl'>
				<Title order={1} mb='xl'>
					Loading...
				</Title>
			</Container>
		);
	}

	if (error) {
		return (
			<Container size='lg' py='xl'>
				<Alert color='red' title='Error' mb='xl'>
					{error}
				</Alert>
			</Container>
		);
	}

	if (!video) {
		return notFound();
	}

	// Extract video ID from Vimeo URL
	const vimeoId = video.URL.match(/vimeo\.com\/(\d+)/)?.[1];
	if (!vimeoId) {
		console.error('LiveVideoPage: Invalid Vimeo URL:', video.URL);
		return (
			<Container size='lg' py='xl'>
				<Alert color='red' title='Error' mb='xl'>
					Invalid video URL
				</Alert>
			</Container>
		);
	}

	return (
		<Container size='lg' py='xl'>
			<Title order={1} mb='xl'>
				{video.Text}
			</Title>
			<AspectRatio ratio={16 / 9} mb='xl'>
				<iframe
					src={`https://player.vimeo.com/video/${vimeoId}`}
					title={video.Text}
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					allowFullScreen
					className='w-full h-full border-0'
				/>
			</AspectRatio>
		</Container>
	);
}
