const strapi = require('@strapi/strapi');

async function createToken() {
	try {
		// Initialize Strapi
		await strapi().load();

		// Create a new API token
		const token =
			(await strapi().admin.services.api) -
			token.create({
				name: 'import-token',
				description: 'Token for importing videos',
				type: 'full-access',
				lifespan: null,
			});

		console.log('Token created successfully:');
		console.log('Token:', token.accessKey);

		// Exit cleanly
		process.exit(0);
	} catch (error) {
		console.error('Error creating token:', error);
		process.exit(1);
	}
}

createToken();
