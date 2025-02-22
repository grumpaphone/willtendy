'use client';

import {
	Modal,
	AspectRatio,
	Title,
	ActionIcon,
	Group,
	Text,
} from '@mantine/core';
import { IconX, IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
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
	hasPrevious
}: VideoLightboxProps) {
	if (!video) return null;

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
			}
		},
		[onNext, onPrevious, hasNext, hasPrevious]
	);

	useEffect(() => {
		if (opened) {
			document.addEventListener('keydown', handleKeyDown);
		}
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [opened, handleKeyDown]);

	return (
		<Modal
			opened={opened}
			onClose={onClose}
			size='xl'
			padding={0}
			radius='md'
			centered
			lockScroll
			closeOnEscape
			transitionProps={{
				duration: 300,
				transition: 'fade',
			}}
			overlayProps={{
				blur: 5,
				opacity: 0.7,
				color: '#000',
			}}
			withCloseButton={false}
			styles={{
				header: {
					padding: '1rem',
					marginBottom: 0,
					backgroundColor: 'rgba(0, 0, 0, 0.8)',
					borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
				},
				body: {
					padding: 0,
					backgroundColor: '#000',
				},
				content: {
					overflow: 'hidden',
					borderRadius: '8px',
					boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)',
				},
				overlay: {
					backdropFilter: 'blur(5px)',
				},
			}}>
			<div className='video-lightbox'>
				<Group justify='space-between' p='md' className='video-header'>
					<div>
						<Title order={3} c='white' size='h4'>
							{video.Text}
						</Title>
						<Text size='sm' c='dimmed'>
							Use arrow keys to navigate
						</Text>
					</div>
					<Group>
						{hasPrevious && (
							<ActionIcon
								variant='subtle'
								color='gray'
								onClick={onPrevious}
								aria-label='Previous video'
								className='nav-button'>
								<IconArrowLeft size={20} />
							</ActionIcon>
						)}
						{hasNext && (
							<ActionIcon
								variant='subtle'
								color='gray'
								onClick={onNext}
								aria-label='Next video'
								className='nav-button'>
								<IconArrowRight size={20} />
							</ActionIcon>
						)}
						<ActionIcon
							variant='subtle'
							color='gray'
							onClick={onClose}
							aria-label='Close'
							className='nav-button'>
							<IconX size={20} />
						</ActionIcon>
					</Group>
				</Group>

				<AspectRatio ratio={16 / 9}>
					<iframe
						key={vimeoId}
						src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
						title={video.Text}
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen
						style={{
							border: 'none',
							width: '100%',
							height: '100%',
							backgroundColor: '#000',
						}}
					/>
				</AspectRatio>
			</div>
		</Modal>
	);
}
