import Link from "next/link";
import { fetchTimeFromHonoApi } from "../helpers";

const REVALIDATE_SECONDS = 10;

export default async function APITimeRevalidatedPage() {
	const { time } = await fetchTimeFromHonoApi(
		{
			next: { revalidate: REVALIDATE_SECONDS },
		},
		"APITimeRevalidatedPage"
	);

	const pageRenderTime = new Date().toLocaleTimeString();
	console.log(
		`[nextjs-app/api-time-revalidated/page.tsx] Page rendered at ${pageRenderTime}. API time fetched: ${time} (revalidates every ${REVALIDATE_SECONDS}s)`
	);

	return (
		<main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
			<div className="max-w-4xl mx-auto p-6 space-y-8">
				<header className="py-8">
					<h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-cyan-500">
						Time-Based Revalidation
					</h1>
					<p className="text-lg text-slate-600">
						Demonstrating Next.js data fetching with time-based revalidation
						from a Hono API.
					</p>
				</header>

				<section className="p-6 bg-gradient-to-br from-sky-50 to-cyan-50 rounded-xl shadow-sm border border-sky-100 transition-all hover:shadow-md">
					<h2 className="text-2xl font-semibold mb-3 text-sky-800 flex items-center">
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
						API Response (Revalidated)
					</h2>
					<div className="p-4 bg-white rounded-lg shadow-inner border border-sky-100">
						<p className="text-4xl font-mono font-bold text-sky-700 break-all tracking-wide">
							{time}
						</p>
					</div>
					<div className="mt-3 flex justify-between items-center text-sm">
						<p className="text-slate-600">
							<span className="font-medium">Page rendered:</span>{" "}
							<span className="font-mono">{pageRenderTime}</span>
						</p>
						<p className="text-slate-500">
							<span className="px-2 py-1 bg-sky-100 rounded-full text-xs font-mono">
								revalidate: {REVALIDATE_SECONDS}s
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
							This page demonstrates time-based revalidation using{" "}
							<code className="px-1.5 py-0.5 bg-slate-100 rounded text-sky-600 text-sm">
								next: {"{ revalidate: "}
								{REVALIDATE_SECONDS}
								{" }"}
							</code>
							.
						</p>
						<p>
							The data from the Hono API is fetched and cached. After{" "}
							{REVALIDATE_SECONDS} seconds, the next request will trigger a
							revalidation in the background. Subsequent requests within the{" "}
							{REVALIDATE_SECONDS}-second window will serve the cached (stale)
							data while the new data is fetched. Once revalidated, fresh data
							will be served.
						</p>
						<p>
							Observe the API time. It should update automatically if you
							refresh the page after {REVALIDATE_SECONDS} seconds (plus a little
							time for the revalidation to complete). Check the Next.js server
							console and Hono API console for detailed logs.
						</p>
					</div>
				</section>

				<nav className="mt-8">
					<Link
						href="/"
						className="group inline-flex items-center justify-center bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-medium py-3 px-6 rounded-lg transition-all hover:from-sky-700 hover:to-cyan-700 shadow-sm hover:shadow"
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
						To modify revalidation time, edit{" "}
						<code className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">
							REVALIDATE_SECONDS
						</code>{" "}
						in{" "}
						<code className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">
							app/api-time-revalidated/page.tsx
						</code>
					</p>
				</footer>
			</div>
		</main>
	);
}
