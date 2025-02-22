'use client';

import Image from 'next/image';
import { VideoGrid } from '@/components/VideoGrid';
import { getLiveVideos, getPlayingAlongVideos, type Video } from '@/lib/api';
import { useState, useEffect } from 'react';

export default function Home() {
	const [liveVideos, setLiveVideos] = useState<Video[]>([]);
	const [playingAlongVideos, setPlayingAlongVideos] = useState<Video[]>([]);
	const [error, setError] = useState('');

	useEffect(() => {
		async function fetchData() {
			try {
				console.log('Home: Starting to fetch videos...');
				const [live, playing] = await Promise.all([
					getLiveVideos(),
					getPlayingAlongVideos(),
				]);

				console.log('Home: Raw live videos:', JSON.stringify(live, null, 2));
				console.log(
					'Home: Raw playing videos:',
					JSON.stringify(playing, null, 2)
				);

				if (!live || !Array.isArray(live)) {
					console.error('Home: Invalid live videos data:', live);
					setError('Failed to load live videos. Invalid data format.');
					return;
				}

				if (!playing || !Array.isArray(playing)) {
					console.error('Home: Invalid playing videos data:', playing);
					setError('Failed to load playing along videos. Invalid data format.');
					return;
				}

				console.log('Home: Setting state with videos:', {
					liveCount: live.length,
					playingCount: playing.length,
					firstLive: live[0],
					firstPlaying: playing[0],
				});

				setLiveVideos(live);
				setPlayingAlongVideos(playing);
			} catch (err) {
				console.error('Home: Error fetching videos:', err);
				setError('Failed to load videos. Please make sure the CMS is running.');
			}
		}

		console.log('Home: Component mounted, calling fetchData');
		fetchData();
	}, []);

	console.log('Home: Rendering with state:', {
		liveVideosCount: liveVideos.length,
		playingAlongVideosCount: playingAlongVideos.length,
		hasError: !!error,
	});

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
					<VideoGrid videos={liveVideos} type='live' error={error} />
				</div>

				{/* Playing Along Section */}
				<div className='intro-wrap'>
					<h1 className='heading-3'>Playing Along:</h1>
					<VideoGrid videos={playingAlongVideos} type='playing' error={error} />
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
