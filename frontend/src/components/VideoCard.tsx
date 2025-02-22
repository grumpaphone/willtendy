'use client';

import { Card, Image, Text, AspectRatio } from '@mantine/core';
import Link from 'next/link';
import { type Video } from '@/lib/api';

interface VideoCardProps {
	video: Video;
	type: 'live' | 'playing';
}

const DEFAULT_THUMBNAIL = '/placeholder-thumbnail.jpg';

export function VideoCard({ video, type }: VideoCardProps) {
	console.log('VideoCard props:', { video, type });

	// Ensure we have a valid URL for the video
	const videoUrl = video.URL || '';
	const thumbnailUrl = video.Thumbnail || DEFAULT_THUMBNAIL;
	const title = video.Text || 'Untitled Video';
	const slug = video.Slug || video.id.toString();

	console.log('VideoCard processed values:', {
		videoUrl,
		thumbnailUrl,
		title,
		slug
	});

	return (
		<Card
			component={Link}
			href={`/${type === 'live' ? 'live-videos' : 'playing-along'}/${slug}`}
			padding='0'
			radius='md'
			className='no-underline hover:transform hover:scale-[1.02] transition-transform'>
			<AspectRatio ratio={16 / 9}>
				<div className="relative w-full h-full">
					<Image
						src={thumbnailUrl}
						alt={title}
						fill
						className='object-cover'
						onError={(e: any) => {
							console.error('Image failed to load:', thumbnailUrl);
							const target = e.target as HTMLImageElement;
							target.src = DEFAULT_THUMBNAIL;
						}}
					/>
				</div>
			</AspectRatio>
			<div className='p-4'>
				<Text size='lg' fw={500} lineClamp={2}>
					{title}
				</Text>
				<Text size='sm' c='dimmed' mt={4}>
					{type === 'live' ? 'Live Performance' : 'Playing Along'}
				</Text>
			</div>
		</Card>
	);
}
