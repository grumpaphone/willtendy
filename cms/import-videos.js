const fs = require('fs');
const { parse } = require('csv-parse');
const axios = require('axios');
const path = require('path');

const API_TOKEN =
	'3c1cad05ecce8a58be443305f18f04c05bb263c7d89fbf3d8c27a94bbb0ac4215d4a2e3639588e44e83829fd4e2a76b1a612860cac88aeb9fa13a3d7cad918f85a59b316065a50858d24952815935c7fea45315c7925e9f74976e33670f4f473a8f5546d891e8cc0ebf702f8120fc87066d16877e0f64d9058a372d50c8c7df9';

function generateSlug(title) {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

async function importVideos() {
	try {
		// Function to process each CSV file
		async function processFile(filePath, type) {
			console.log(`Processing ${filePath}...`);
			const parser = fs
				.createReadStream(path.join(__dirname, '..', filePath))
				.pipe(
					parse({
						columns: true,
						skip_empty_lines: true,
					})
				);

			for await (const record of parser) {
				try {
					const title = record.Name || record.Band;
					const slug = record.slug || generateSlug(title);
					const videoUrl = record['Video Link'] || record.Video;
					const thumbnail = record.Thumbnail;

					console.log('Importing video:', {
						title,
						slug,
						videoUrl,
						thumbnail,
						type,
						order: record.Order,
					});

					const data = {
						data: {
							text: title,
							slug: slug,
							url: videoUrl,
							thumbnail: thumbnail,
							type: type,
							order: parseInt(record.Order) || 0,
							publishedAt: new Date().toISOString(), // Set publishedAt to make it visible
						},
					};

					console.log('Sending data to Strapi:', JSON.stringify(data, null, 2));

					const response = await axios.post(
						'http://127.0.0.1:1337/api/videos',
						data,
						{
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Bearer ${API_TOKEN}`,
							},
						}
					);

					console.log(`Successfully imported: ${title}`);
					console.log('Response:', JSON.stringify(response.data, null, 2));
				} catch (error) {
					console.error(
						`Failed to import ${record.Name || record.Band}:`,
						error.response?.data?.error || error.message,
						'\nFull error:',
						error.response?.data || error
					);
				}
			}
		}

		// First, clear existing videos
		console.log('Clearing existing videos...');
		try {
			const response = await axios.get('http://127.0.0.1:1337/api/videos', {
				headers: {
					Authorization: `Bearer ${API_TOKEN}`,
				},
			});

			const existingVideos = response.data.data;
			for (const video of existingVideos) {
				await axios.delete(`http://127.0.0.1:1337/api/videos/${video.id}`, {
					headers: {
						Authorization: `Bearer ${API_TOKEN}`,
					},
				});
			}
			console.log('Cleared existing videos');
		} catch (error) {
			console.error(
				'Error clearing videos:',
				error.response?.data?.error || error.message
			);
		}

		// Process both files
		console.log('Starting import of Live Videos...');
		await processFile('Live Videos.csv', 'live');
		console.log('Starting import of Playing Along Videos...');
		await processFile('Playing Along.csv', 'playing_along');

		console.log('Import completed');
	} catch (error) {
		console.error(
			'Import failed:',
			error.response?.data?.error || error.message
		);
	}
}

importVideos();
