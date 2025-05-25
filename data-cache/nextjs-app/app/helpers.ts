/* eslint-disable @typescript-eslint/no-explicit-any */
const HONO_API_TIME_URL = "http://localhost:8080/time";

interface TimeResponse {
	time: string;
}

interface ErrorResponse {
	time: string; // To match the expected structure, even for errors
}

/**
 * Fetches time from the Hono API.
 * @param options - RequestInit options for the fetch call.
 * @param callerName - A string to identify the caller in logs, e.g., "HomePage" or "APITimePage".
 * @returns A promise that resolves to an object with a 'time' property.
 */
export async function fetchTimeFromHonoApi(
	options: RequestInit = {},
	callerName: string = "UnknownCaller"
): Promise<TimeResponse | ErrorResponse> {
	console.log(
		`[nextjs-app/${callerName}] Fetching time from ${HONO_API_TIME_URL} with options: ${JSON.stringify(
			options
		)}`
	);
	try {
		const response = await fetch(HONO_API_TIME_URL, options);
		if (!response.ok) {
			const errorText = await response.text();
			console.error(
				`[nextjs-app/${callerName}] API request failed: ${response.status}, ${errorText}`
			);
			return {
				time: `Error: API (${response.status})${
					callerName === "APITimePage" ? ". Is Hono API running?" : ""
				}`,
			};
		}
		const data: TimeResponse = await response.json();
		return data;
	} catch (error: any) {
		console.error(`[nextjs-app/${callerName}] Fetch error:`, error.message);
		return {
			time: `Error: Could not connect to Hono API. ${error.message}`,
		};
	}
}
