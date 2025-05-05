export const fetchData = async (fetchUrl) => {
	const endpoint = 'https://article-extractor-and-summarizer.p.rapidapi.com/extract';
	const apiKey = import.meta.env.VITE_RAPID_API_KEY;
	const host = import.meta.env.VITE_RAPID_APP_HOST;

	if (!fetchUrl) return { error: 'No URL provided' };

	try {
		const res = await fetch(`${endpoint}?url=${encodeURIComponent(fetchUrl)}`, {
			method: 'GET',
			headers: {
				'x-rapidapi-host': host,
				'x-rapidapi-key': apiKey
			}
		});

		if (!res.ok) {
			throw new Error('API request failed');
		}

		const data = await res.json();
		return { data };
	} catch (e) {
		console.error(e);
		return { error: e.message || 'Failed to fetch data' };
	}
};
