import {
	getVideosByType as getSanityVideosByType,
	getVideoBySlug as getSanityVideoBySlug,
} from './sanity';

// Only log in development
if (process.env.NODE_ENV !== 'production') {
	console.log('API: Using Sanity.io as CMS');
}

export interface Video {
	id: number | string;
	Text: string;
	Slug: string;
	URL: string;
	Thumbnail: string;
	Type: 'live' | 'playing_along';
	Order: number;
	Created?: string;
	Uploaded?: string;
	Published?: string;
}

function transformSanityVideo(item: any): Video {
	if (!item) {
		throw new Error('Invalid item');
	}

	return {
		id: item._id || '',
		Text: item.text || '',
		Slug: item.slug?.current || '',
		URL: item.url || '',
		Thumbnail: item.thumbnail || '',
		Type: item.type || 'live',
		Order: item.order || 0,
		Created: item.created || '',
		Uploaded: item.uploaded || '',
		Published: item.published || '',
	};
}

// Cache for API responses (5 minute TTL)
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Helper to get cached data or fetch new data
async function getCachedData<T>(
	cacheKey: string,
	fetchFn: () => Promise<T>
): Promise<T> {
	const now = Date.now();
	const cachedItem = cache.get(cacheKey);

	// Return cached data if valid
	if (cachedItem && now - cachedItem.timestamp < CACHE_TTL) {
		return cachedItem.data as T;
	}

	// Fetch fresh data
	const data = await fetchFn();

	// Store in cache
	cache.set(cacheKey, { data, timestamp: now });

	return data;
}

// Public API functions
export async function getLiveVideos(): Promise<Video[]> {
	const cacheKey = 'videos-live';

	return getCachedData(cacheKey, async () => {
		try {
			const videos = await getSanityVideosByType('live');
			return videos.map(transformSanityVideo);
		} catch (error) {
			// Only log in development
			if (process.env.NODE_ENV !== 'production') {
				console.error(`API Error (live):`, error);
			}
			return [];
		}
	});
}

export async function getPlayingAlongVideos(): Promise<Video[]> {
	const cacheKey = 'videos-playing_along';

	return getCachedData(cacheKey, async () => {
		try {
			const videos = await getSanityVideosByType('playing_along');
			return videos.map(transformSanityVideo);
		} catch (error) {
			// Only log in development
			if (process.env.NODE_ENV !== 'production') {
				console.error(`API Error (playing_along):`, error);
			}
			return [];
		}
	});
}

export async function getLiveVideoBySlug(slug: string): Promise<Video | null> {
	const cacheKey = `videos-live-${slug}`;

	return getCachedData(cacheKey, async () => {
		try {
			const video = await getSanityVideoBySlug(slug, 'live');
			return video ? transformSanityVideo(video) : null;
		} catch (error) {
			// Only log in development
			if (process.env.NODE_ENV !== 'production') {
				console.error(`API Error (live, slug: ${slug}):`, error);
			}
			return null;
		}
	});
}

export async function getPlayingAlongVideoBySlug(
	slug: string
): Promise<Video | null> {
	const cacheKey = `videos-playing_along-${slug}`;

	return getCachedData(cacheKey, async () => {
		try {
			const video = await getSanityVideoBySlug(slug, 'playing_along');
			return video ? transformSanityVideo(video) : null;
		} catch (error) {
			// Only log in development
			if (process.env.NODE_ENV !== 'production') {
				console.error(`API Error (playing_along, slug: ${slug}):`, error);
			}
			return null;
		}
	});
}
