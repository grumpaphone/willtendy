import { getPlayingAlongVideoBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';

export const revalidate = 3600; // Revalidate every hour
export const dynamic = 'force-static'; // Force full static generation for GitHub Pages

// Generate static params for export mode. Replace the hardcoded value with dynamic data if available.
export async function generateStaticParams() {
	// TODO: Replace with actual fetching of available slugs, e.g., await getAllPlayingAlongVideoSlugs();
	return [{ slug: 'example-slug' }];
}

// Server component that fetches video data at build time
export default async function PlayingAlongVideoPage({
	params,
}: {
	params: { slug: string };
}) {
	const video = await getPlayingAlongVideoBySlug(params.slug);

	if (!video) {
		notFound();
		return null;
	}

	const match = video.URL.match(/vimeo\.com\/(\d+)/);
	if (!match) {
		console.error('PlayingAlongVideoPage: Invalid Vimeo URL:', video.URL);
		notFound();
		return null;
	}
	const vimeoId = match[1];

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
