'use client';

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
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<h1 className='text-2xl font-bold mb-8'>Loading...</h1>
			</div>
		);
	}

	if (error) {
		return (
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<div className='rounded-md bg-red-50 p-4 mb-8'>
					<div className='flex'>
						<div className='ml-3'>
							<h3 className='text-sm font-medium text-red-800'>Error</h3>
							<div className='mt-2 text-sm text-red-700'>{error}</div>
						</div>
					</div>
				</div>
			</div>
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
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<div className='rounded-md bg-red-50 p-4 mb-8'>
					<div className='flex'>
						<div className='ml-3'>
							<h3 className='text-sm font-medium text-red-800'>Error</h3>
							<div className='mt-2 text-sm text-red-700'>Invalid video URL</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
			<h1 className='text-2xl font-bold mb-8'>{video.Text}</h1>
			<div className='relative w-full aspect-video mb-8'>
				<iframe
					src={`https://player.vimeo.com/video/${vimeoId}`}
					title={video.Text}
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					allowFullScreen
					className='absolute inset-0 w-full h-full border-0'
				/>
			</div>
		</div>
	);
}
