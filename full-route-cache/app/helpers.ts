export const getData = async (
	apiUrl: string = "https://rickandmortyapi.com/api/character"
) => {
	console.log(`[Server Helper - getData] Called for: ${apiUrl}`);

	const startTime = performance.now();

	// This fetch call is automatically memoized by Next.js for identical requests
	// within the same render pass.
	const response = await fetch(apiUrl);

	const endTime = performance.now();
	const duration = (endTime - startTime).toFixed(2);

	console.log(
		`[Server Helper - getData] fetch() for ${apiUrl} completed. Duration: ${duration}ms. Status: ${response.status}`
	);

	if (!response.ok) {
		console.error(`[Server Helper - getData] API request failed for ${apiUrl}`);
		throw new Error(
			`Failed to fetch data from ${apiUrl}. Status: ${response.status}`
		);
	}

	const data = await response.json();
	console.log(`[Server Helper - getData] JSON parsing complete for ${apiUrl}.`);
	return data;
};
