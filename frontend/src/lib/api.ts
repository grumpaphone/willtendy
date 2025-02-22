const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
console.log('API: Using URL:', API_URL);

interface StrapiAttributes {
	text: string;
	slug: string;
	url: string;
	thumbnail: string;
	type: 'live' | 'playing_along';
	order: number;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

interface StrapiDataItem {
	id: number;
	attributes: StrapiAttributes;
}

interface StrapiResponse {
	data: StrapiDataItem[];
}

export interface Video {
	id: number;
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

function transformStrapiVideo(item: any): Video {
	console.log('Raw Strapi item:', JSON.stringify(item, null, 2));

	if (!item) {
		console.error('Invalid item:', item);
		throw new Error('Invalid item');
	}

	// Handle both direct properties and nested attributes
	const data = item.attributes || item;

	const video = {
		id: item.id,
		Text: data.Text || data.text || '',
		Slug: data.Slug || data.slug || '',
		URL: data.URL || data.url || '',
		Thumbnail: data.Thumbnail || data.thumbnail || '',
		Type: data.Type || data.type || 'live',
		Order: data.Order || data.order || 0,
		Created: data.Created || data.created || data.createdAt || '',
		Uploaded: data.Uploaded || data.uploaded || data.updatedAt || '',
		Published: data.Published || data.published || data.publishedAt || '',
	};

	console.log('Transformed video:', JSON.stringify(video, null, 2));
	return video;
}

export async function getLiveVideos(): Promise<Video[]> {
	console.log('API: getLiveVideos: Starting request');
	try {
		const response = await fetch(`${API_URL}/api/videos?filters[type][$eq]=live&sort=order:asc`);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data: StrapiResponse = await response.json();
		console.log('API: Raw response data:', JSON.stringify(data, null, 2));
		return data.data.map(transformStrapiVideo);
	} catch (error) {
		console.error('API: Error in getLiveVideos:', error);
		throw error;
	}
}

export async function getPlayingAlongVideos(): Promise<Video[]> {
	console.log('API: getPlayingAlongVideos: Starting request');
	try {
		const response = await fetch(`${API_URL}/api/videos?filters[type][$eq]=playing_along&sort=order:asc`);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data: StrapiResponse = await response.json();
		console.log('API: Raw response data:', JSON.stringify(data, null, 2));
		return data.data.map(transformStrapiVideo);
	} catch (error) {
		console.error('API: Error in getPlayingAlongVideos:', error);
		throw error;
	}
}

export async function getLiveVideoBySlug(slug: string): Promise<Video | null> {
	console.log('API: getLiveVideoBySlug: Starting request for slug:', slug);
	try {
		const response = await fetch(`${API_URL}/api/videos?filters[type][$eq]=live&filters[slug][$eq]=${slug}`);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data: StrapiResponse = await response.json();
		console.log('API: Raw response data:', JSON.stringify(data, null, 2));
		return data.data.length > 0 ? transformStrapiVideo(data.data[0]) : null;
	} catch (error) {
		console.error('API: Error in getLiveVideoBySlug:', error);
		return null;
	}
}

export async function getPlayingAlongVideoBySlug(slug: string): Promise<Video | null> {
	console.log('API: getPlayingAlongVideoBySlug: Starting request for slug:', slug);
	try {
		const response = await fetch(`${API_URL}/api/videos?filters[type][$eq]=playing_along&filters[slug][$eq]=${slug}`);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data: StrapiResponse = await response.json();
		console.log('API: Raw response data:', JSON.stringify(data, null, 2));
		return data.data.length > 0 ? transformStrapiVideo(data.data[0]) : null;
	} catch (error) {
		console.error('API: Error in getPlayingAlongVideoBySlug:', error);
		return null;
	}
}
