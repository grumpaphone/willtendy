'use client';

import { useEffect, useCallback } from 'react';
import { type Video } from '@/lib/api';

interface VideoLightboxProps {
	video: Video | null;
	opened: boolean;
	onClose: () => void;
	onNext: () => void;
	onPrevious: () => void;
	hasNext: boolean;
	hasPrevious: boolean;
}

export function VideoLightbox({
	video,
	opened,
	onClose,
	onNext,
	onPrevious,
	hasNext,
	hasPrevious,
}: VideoLightboxProps) {
	if (!video || !opened) return null;

	// Extract video ID from Vimeo URL
	const vimeoId = video.URL.match(/vimeo\.com\/(\d+)/)?.[1];
	if (!vimeoId) return null;

	// Handle keyboard events
	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'ArrowRight' && hasNext) {
				onNext();
			} else if (event.key === 'ArrowLeft' && hasPrevious) {
				onPrevious();
			} else if (event.key === 'Escape') {
				onClose();
			}
		},
		[onNext, onPrevious, onClose, hasNext, hasPrevious]
	);

	useEffect(() => {
		if (opened) {
			document.addEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'hidden';
		}
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = '';
		};
	}, [opened, handleKeyDown]);

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center'>
			{/* Backdrop */}
			<div
				className='fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm'
				onClick={onClose}
			/>

			{/* Content */}
			<div className='relative w-full max-w-7xl mx-4 bg-black rounded-lg overflow-hidden shadow-2xl'>
				{/* Header */}
				<div className='flex justify-between items-center p-4 bg-black/80 border-b border-white/10'>
					<div>
						<h3 className='text-lg font-medium text-white'>{video.Text}</h3>
						<p className='text-sm text-gray-400'>Use arrow keys to navigate</p>
					</div>
					<div className='flex gap-2'>
						{hasPrevious && (
							<button
								onClick={onPrevious}
								className='p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors'
								aria-label='Previous video'>
								<svg
									className='w-5 h-5'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M15 19l-7-7 7-7'
									/>
								</svg>
							</button>
						)}
						{hasNext && (
							<button
								onClick={onNext}
								className='p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors'
								aria-label='Next video'>
								<svg
									className='w-5 h-5'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M9 5l7 7-7 7'
									/>
								</svg>
							</button>
						)}
						<button
							onClick={onClose}
							className='p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors'
							aria-label='Close'>
							<svg
								className='w-5 h-5'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</div>
				</div>

				{/* Video */}
				<div className='relative w-full aspect-video'>
					<iframe
						key={vimeoId}
						src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
						title={video.Text}
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen
						className='absolute inset-0 w-full h-full border-0 bg-black'
					/>
				</div>
			</div>
		</div>
	);
}
