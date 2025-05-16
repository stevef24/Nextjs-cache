export const getData = async (
	apiUrl: string = "https://rickandmortyapi.com/api/character",
	options?: {
		tags?: string[];
		revalidateTime?: number;
	}
) => {
	console.log(`[Server Helper - getData] Called for: ${apiUrl}`);
	const fetchNextOptions: { tags?: string[]; revalidate?: number } = {};
	const fetchInit: RequestInit = {};

	if (options?.tags && options.tags.length > 0) {
		console.log(
			`[Server Helper - getData] Using tags: ${options.tags.join(", ")}`
		);
		fetchNextOptions.tags = options.tags;
	}
	if (typeof options?.revalidateTime === "number") {
		console.log(
			`[Server Helper - getData] Using revalidateTime: ${options.revalidateTime}s`
		);
		fetchNextOptions.revalidate = options.revalidateTime;
	}

	if (Object.keys(fetchNextOptions).length > 0) {
		fetchInit.next = fetchNextOptions;
	}
	console.log(
		`[Server Helper - getData] fetch() called with init options: ${JSON.stringify(
			fetchInit
		)}`
	);

	const startTime = performance.now();

	const response = await fetch(apiUrl, fetchInit);

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
