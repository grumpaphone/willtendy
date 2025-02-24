import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion =
	process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03';

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: process.env.NODE_ENV === 'production',
});

// Helper function for generating image URLs with the Sanity Image pipeline
const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);

// Helper function to get all videos of a specific type
export async function getVideosByType(type: 'live' | 'playing_along') {
	return client.fetch(
		`*[_type == "video" && type == $type] | order(order asc)`,
		{ type }
	);
}

// Helper function to get a specific video by slug and type
export async function getVideoBySlug(
	slug: string,
	type: 'live' | 'playing_along'
) {
	return client.fetch(
		`*[_type == "video" && type == $type && slug.current == $slug][0]`,
		{ slug, type }
	);
}
