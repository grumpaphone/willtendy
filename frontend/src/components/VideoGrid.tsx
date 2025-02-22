'use client';

import Image from 'next/image';
import { type Video } from '@/lib/api';
import { useState } from 'react';
import { VideoLightbox } from './VideoLightbox';

interface VideoGridProps {
	videos: Video[];
	type: 'live' | 'playing';
	error?: string;
	isLoading?: boolean;
}

const DEFAULT_THUMBNAIL = '/placeholder-thumbnail.jpg';

function VideoSkeleton() {
	return (
		<div className='lightbox-link'>
			<div className='imagewrapper'>
				<div className='h-48 rounded-md bg-gray-200 animate-pulse' />
			</div>
		</div>
	);
}

export function VideoGrid({ videos, type, error, isLoading }: VideoGridProps) {
	const [selectedIndex, setSelectedIndex] = useState<number>(-1);
	const [lightboxOpen, setLightboxOpen] = useState(false);

	console.log('VideoGrid props:', { videos, type, error, isLoading });

	if (error) {
		return (
			<div className='rounded-md bg-red-50 p-4'>
				<div className='flex'>
					<div className='ml-3'>
						<h3 className='text-sm font-medium text-red-800'>Error</h3>
						<div className='mt-2 text-sm text-red-700'>{error}</div>
					</div>
				</div>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className='collection-list-copy'>
				{[...Array(6)].map((_, index) => (
					<VideoSkeleton key={index} />
				))}
			</div>
		);
	}

	if (!videos || !videos.length) {
		return <p className='text-gray-500'>No videos available yet.</p>;
	}

	const handleClose = () => {
		setLightboxOpen(false);
		setSelectedIndex(-1);
	};

	const handleNext = () => {
		setSelectedIndex((current) =>
			current < videos.length - 1 ? current + 1 : 0
		);
	};

	const handlePrevious = () => {
		setSelectedIndex((current) =>
			current > 0 ? current - 1 : videos.length - 1
		);
	};

	return (
		<>
			<div className='collection-list-copy'>
				{videos.map((video, index) => (
					<button
						key={video.id}
						onClick={() => {
							setSelectedIndex(index);
							setLightboxOpen(true);
						}}
						className='lightbox-link'>
						<div className='imagewrapper'>
							<Image
								src={
									video.Thumbnail?.startsWith('http')
										? video.Thumbnail
										: DEFAULT_THUMBNAIL
								}
								alt={video.Text || 'Video thumbnail'}
								fill
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								className='livethumb'
								priority
								onError={(e: any) => {
									console.error('Image failed to load:', video.Thumbnail);
									const target = e.target as HTMLImageElement;
									target.src = DEFAULT_THUMBNAIL;
								}}
							/>
							<div className='vidtitle'>{video.Text || 'Untitled Video'}</div>
						</div>
					</button>
				))}
			</div>

			<VideoLightbox
				video={selectedIndex >= 0 ? videos[selectedIndex] : null}
				opened={lightboxOpen}
				onClose={handleClose}
				onNext={handleNext}
				onPrevious={handlePrevious}
				hasNext={videos.length > 1}
				hasPrevious={videos.length > 1}
			/>
		</>
	);
}
