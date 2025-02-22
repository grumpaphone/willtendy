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
	Created: string;
	Uploaded: string;
	Published: string;
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
	const url = `${API_URL}/api/videos?filters[Type][$eq]=live&sort[0]=Order:asc&populate=*`;
	console.log('API: Making request to:', url);

	try {
		const response = await fetch(url, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		console.log('API: Response status:', response.status);
		console.log(
			'API: Response headers:',
			Object.fromEntries(response.headers.entries())
		);

		if (!response.ok) {
			const errorText = await response.text();
			console.error('API: Error response:', errorText);
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		console.log('API: Raw response data:', JSON.stringify(data, null, 2));

		if (!data || !Array.isArray(data.data)) {
			console.error('API: Invalid response format:', data);
			return [];
		}

		const videos = data.data.map(transformStrapiVideo);
		console.log('API: Transformed videos:', JSON.stringify(videos, null, 2));
		return videos;
	} catch (error) {
		console.error('API: Error in getLiveVideos:', error);
		throw error;
	}
}

export async function getPlayingAlongVideos(): Promise<Video[]> {
	console.log('API: getPlayingAlongVideos: Starting request');
	const url = `${API_URL}/api/videos?filters[Type][$eq]=playing_along&sort[0]=Order:asc&populate=*`;
	console.log('API: Making request to:', url);

	try {
		const response = await fetch(url, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		console.log('API: Response status:', response.status);
		console.log(
			'API: Response headers:',
			Object.fromEntries(response.headers.entries())
		);

		if (!response.ok) {
			const errorText = await response.text();
			console.error('API: Error response:', errorText);
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		console.log('API: Raw response data:', JSON.stringify(data, null, 2));

		if (!data || !Array.isArray(data.data)) {
			console.error('API: Invalid response format:', data);
			return [];
		}

		const videos = data.data.map(transformStrapiVideo);
		console.log('API: Transformed videos:', JSON.stringify(videos, null, 2));
		return videos;
	} catch (error) {
		console.error('API: Error in getPlayingAlongVideos:', error);
		throw error;
	}
}

export async function getLiveVideoBySlug(slug: string): Promise<Video | null> {
	console.log('API: getLiveVideoBySlug: Starting request for slug:', slug);
	try {
		// First try to find by slug
		const url = `${API_URL}/api/videos?filters[Type][$eq]=live&filters[Slug][$eq]=${slug}&populate=*`;
		console.log('API: Making request to:', url);

		const response = await fetch(url, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		console.log('API: Response status:', response.status);
		console.log('API: Response headers:', Object.fromEntries(response.headers.entries()));

		if (!response.ok) {
			const errorText = await response.text();
			console.error('API: Error response:', errorText);
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		console.log('API: Raw response data:', JSON.stringify(data, null, 2));

		if (Array.isArray(data.data) && data.data.length > 0) {
			const video = transformStrapiVideo(data.data[0]);
			console.log('API: Found video by slug:', JSON.stringify(video, null, 2));
			return video;
		}

		// If not found by slug, try to find by ID
		const idUrl = `${API_URL}/api/videos/${slug}?populate=*`;
		console.log('API: Making ID request to:', idUrl);

		const idResponse = await fetch(idUrl, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		console.log('API: ID response status:', idResponse.status);

		if (!idResponse.ok) {
			console.log('API: Video not found by ID');
			return null;
		}

		const idData = await idResponse.json();
		console.log('API: Raw ID response data:', JSON.stringify(idData, null, 2));

		if (!idData.data) {
			console.log('API: No video data in ID response');
			return null;
		}

		const video = transformStrapiVideo(idData.data);
		console.log('API: Found video by ID:', JSON.stringify(video, null, 2));
		return video;
	} catch (error) {
		console.error('API: Error fetching live video:', error);
		return null;
	}
}

export async function getPlayingAlongVideoBySlug(
	slug: string
): Promise<Video | null> {
	console.log('API: getPlayingAlongVideoBySlug: Starting request for slug:', slug);
	try {
		// First try to find by slug
		const url = `${API_URL}/api/videos?filters[Type][$eq]=playing_along&filters[Slug][$eq]=${slug}&populate=*`;
		console.log('API: Making request to:', url);

		const response = await fetch(url, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		console.log('API: Response status:', response.status);
		console.log('API: Response headers:', Object.fromEntries(response.headers.entries()));

		if (!response.ok) {
			const errorText = await response.text();
			console.error('API: Error response:', errorText);
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		console.log('API: Raw response data:', JSON.stringify(data, null, 2));

		if (Array.isArray(data.data) && data.data.length > 0) {
			const video = transformStrapiVideo(data.data[0]);
			console.log('API: Found video by slug:', JSON.stringify(video, null, 2));
			return video;
		}

		// If not found by slug, try to find by ID
		const idUrl = `${API_URL}/api/videos/${slug}?populate=*`;
		console.log('API: Making ID request to:', idUrl);

		const idResponse = await fetch(idUrl, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		console.log('API: ID response status:', idResponse.status);

		if (!idResponse.ok) {
			console.log('API: Video not found by ID');
			return null;
		}

		const idData = await idResponse.json();
		console.log('API: Raw ID response data:', JSON.stringify(idData, null, 2));

		if (!idData.data) {
			console.log('API: No video data in ID response');
			return null;
		}

		const video = transformStrapiVideo(idData.data);
		console.log('API: Found video by ID:', JSON.stringify(video, null, 2));
		return video;
	} catch (error) {
		console.error('API: Error fetching playing along video:', error);
		return null;
	}
}
