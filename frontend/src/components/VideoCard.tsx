'use client';

import Image from 'next/image';
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
		slug,
	});

	return (
		<Link
			href={`/${type === 'live' ? 'live-videos' : 'playing-along'}/${slug}`}
			className='block rounded-lg overflow-hidden bg-white shadow-lg hover:transform hover:scale-[1.02] transition-transform no-underline'>
			<div className='relative aspect-video'>
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
			<div className='p-4'>
				<h3 className='text-lg font-medium line-clamp-2 text-gray-900'>
					{title}
				</h3>
				<p className='mt-1 text-sm text-gray-600'>
					{type === 'live' ? 'Live Performance' : 'Playing Along'}
				</p>
			</div>
		</Link>
	);
}
