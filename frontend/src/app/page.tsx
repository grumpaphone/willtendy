import Image from 'next/image';
import { VideoGrid } from '@/components/VideoGrid';
import { getLiveVideos, getPlayingAlongVideos } from '@/lib/api';
import { Suspense } from 'react';

// Loading component for Suspense
function VideoSectionLoading() {
	return <div className='animate-pulse h-64 bg-gray-200 rounded-md'></div>;
}

// Error component
function ErrorDisplay({ message }: { message: string }) {
	return (
		<div className='p-4 bg-red-50 text-red-700 rounded-md'>
			<p>{message}</p>
		</div>
	);
}

// Server Component for video sections
async function VideoSection({ type }: { type: 'live' | 'playing' }) {
	try {
		const videos =
			type === 'live' ? await getLiveVideos() : await getPlayingAlongVideos();

		return <VideoGrid videos={videos} type={type} />;
	} catch (error) {
		return (
			<ErrorDisplay
				message={`Failed to load ${type} videos. Please try again later.`}
			/>
		);
	}
}

export default async function Home() {
	return (
		<div className='section'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<section className='section-2'>
					{/* Navigation */}
					<div className='navigation'>
						<div>
							<Image
								src='/wt-icon.svg'
								alt='Will Tendy'
								width={94}
								height={94}
								className='image-2'
								priority
							/>
						</div>
						<div className='navigation-items'>
							<div>
								<h1 className='heading'>Will Tendy</h1>
								<div className='text-block-2'>
									Guitar | Bass | Keys - LA/NYC
								</div>
							</div>
						</div>
					</div>

					{/* Hero Image */}
					<div className='w-layout-blockcontainer container-3'>
						<Image
							src='/wtmain.jpg'
							alt='Will Tendy performing live'
							width={1213}
							height={800}
							className='image'
							priority
							quality={100}
						/>
					</div>
				</section>

				{/* Has Performed With Section */}
				<div className='container _2'>
					<div className='carrer-headline-wrap'>
						<h2 className='heading-3-copy'>Has Performed With</h2>
						<div className='w-richtext'>
							<p className='paragraph'>
								<strong>Blame My Youth</strong> (Big Loud Rock){' '}
								<strong>Joseph</strong> (ATO Records){' '}
								<strong>Mercury Rev</strong>, <strong>Maude Latour</strong>,{' '}
								<strong>Charlie Cunningham</strong>,{' '}
								<strong>Hedwig and the Angry Inch on Broadway</strong>,{' '}
								<strong>Allen Tate</strong>, <strong>Morningwood</strong>
								(Capitol Records), <strong>Plural</strong>,{' '}
								<strong>Shontelle</strong> (Universal),{' '}
								<strong>Melissa Auf der Maur</strong>, <strong>Julietta</strong>{' '}
								(300 Entertainment) and many more.
							</p>
							<p className='paragraph'>
								Will has also performed on Conan, Ellen, Jimmy Kimmel Live, CBS
								This Morning as well as numerous national and international
								tours.
							</p>
						</div>
					</div>
				</div>

				{/* Live Videos Section */}
				<div className='intro-wrap'>
					<h1 className='heading-3'>Live</h1>
					<Suspense fallback={<VideoSectionLoading />}>
						{/* @ts-expect-error Async Server Component */}
						<VideoSection type='live' />
					</Suspense>
				</div>

				{/* Playing Along Section */}
				<div className='intro-wrap'>
					<h1 className='heading-3'>Playing Along:</h1>
					<Suspense fallback={<VideoSectionLoading />}>
						{/* @ts-expect-error Async Server Component */}
						<VideoSection type='playing' />
					</Suspense>
				</div>

				{/* Contact Section */}
				<div className='section cc-contact'>
					<div className='container'>
						<div className='contact'>
							<h3 className='heading-3'>Contact:</h3>
							<div className='contact-form-wrap'>
								<a href='mailto:wtendy@gmail.com'>Email: wtendy@gmail.com</a>
								<div>(845)242-7700</div>
								<a href='https://www.instagram.com/willtendy'>Instagram</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
