/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";

async function getTimeFromApi(options: RequestInit = {}) {
	const fetchUrl = "http://localhost:8080/time";
	console.log(
		`[nextjs-app/api-time/page.tsx] Fetching time from ${fetchUrl} with options: ${JSON.stringify(
			options
		)}`
	);
	try {
		const response = await fetch(fetchUrl, options);
		if (!response.ok) {
			const errorText = await response.text();
			console.error(
				`[nextjs-app/api-time/page.tsx] API request failed: ${response.status}, ${errorText}`
			);
			return { time: `Error: API (${response.status}). Is Hono API running?` };
		}
		const data = await response.json();
		return data;
	} catch (error: any) {
		console.error(`[nextjs-app/api-time/page.tsx] Fetch error:`, error.message);
		return { time: "Error: Could not connect to Hono API." };
	}
}

export default async function APITimePage() {
	const { time } = await getTimeFromApi({ cache: "force-cache" });

	const pageRenderTime = new Date().toLocaleTimeString();
	console.log(
		`[nextjs-app/api-time/page.tsx] Page rendered at ${pageRenderTime}. API time fetched: ${time}`
	);

	return (
		<main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
			<div className="max-w-4xl mx-auto p-6 space-y-8">
				<header className="py-8">
					<h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
						Time From Hono API
					</h1>
					<p className="text-lg text-slate-600">
						Demonstrating Next.js data fetching and caching with a Hono API
						endpoint
					</p>
				</header>

				<section className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-sm border border-slate-200 transition-all hover:shadow-md">
					<h2 className="text-2xl font-semibold mb-3 text-slate-800 flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 mr-2"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						API Response
					</h2>
					<div className="p-4 bg-white rounded-lg shadow-inner border border-slate-100">
						<p className="text-4xl font-mono font-bold text-slate-800 break-all tracking-wide">
							{time}
						</p>
					</div>
					<div className="mt-3 flex justify-between items-center text-sm">
						<p className="text-slate-600">
							<span className="font-medium">Page rendered:</span>{" "}
							<span className="font-mono">{pageRenderTime}</span>
						</p>
						<p className="text-slate-500">
							<span className="px-2 py-1 bg-slate-100 rounded-full text-xs font-mono">
								cache: force-cache
							</span>
						</p>
					</div>
				</section>

				<section className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
					<h2 className="text-xl font-semibold mb-3 text-slate-800 flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 mr-2"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						About This Demo
					</h2>
					<div className="space-y-3 text-slate-600">
						<p>
							This page demonstrates static data fetching with{" "}
							<code className="px-1.5 py-0.5 bg-slate-100 rounded text-pink-600 text-sm">
								cache: "force-cache"
							</code>
							. The time shown above is cached at build time or during
							revalidation.
						</p>
						<p>
							Check the Next.js server console and Hono API console for detailed
							logs about when the data is fetched.
						</p>
					</div>
				</section>

				<nav className="mt-8">
					<Link
						href="/"
						className="group inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all hover:from-purple-700 hover:to-pink-700 shadow-sm hover:shadow"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10 19l-7-7m0 0l7-7m-7 7h18"
							/>
						</svg>
						<span>Back to Demo Hub</span>
					</Link>
				</nav>

				<footer className="mt-12 pt-6 border-t border-slate-200 text-center">
					<p className="text-sm text-slate-500">
						To modify caching behavior, edit{" "}
						<code className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">
							app/api-time/page.tsx
						</code>
					</p>
				</footer>
			</div>
		</main>
	);
}
