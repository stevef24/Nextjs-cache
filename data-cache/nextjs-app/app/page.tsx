import Link from "next/link";
import { revalidatePath, revalidateTag } from "next/cache";
import RevalidateAPITimeButton from "@/components/RevalidateApiTimeButton";
import { fetchTimeFromHonoApi } from "./helpers";

export default async function HomePage() {
	const homePageRenderTime = new Date().toLocaleTimeString();
	const { time: homeApiTime } = await fetchTimeFromHonoApi(
		{
			next: { tags: ["hono-api-time-tag"] },
		},
		"HomePage"
	);
	console.log(
		`[nextjs-app/HomePage] Page rendered at ${homePageRenderTime}. API time for home: ${homeApiTime}`
	);

	async function onRevalidateApiPathAction() {
		"use server";
		const path = "/api-time";
		console.log(
			`[nextjs-app/HomePage - Server Action] Attempting to revalidate path: ${path}`
		);
		revalidatePath(path);
		console.log(
			`[nextjs-app/HomePage - Server Action] revalidatePath('${path}') called.`
		);
	}

	async function onRevalidateApiTagAction() {
		"use server";
		const tag = "hono-api-time-tag";
		console.log(
			`[nextjs-app/HomePage - Server Action] Attempting to revalidate tag: '${tag}'`
		);
		revalidateTag(tag);
		console.log(
			`[nextjs-app/HomePage - Server Action] revalidateTag('${tag}') called.`
		);
	}

	return (
		<main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
			<div className="max-w-4xl mx-auto p-6 space-y-8">
				<header className="text-center py-8">
					<h1 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
						Hono & Next.js Caching
					</h1>
					<p className="text-lg text-slate-600 max-w-2xl mx-auto">
						Interactive demonstrations of Next.js caching strategies with Hono
						API integration
					</p>
				</header>

				<section className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl shadow-sm border border-emerald-100 transition-all hover:shadow-md">
					<h2 className="text-2xl font-semibold mb-3 text-emerald-800 flex items-center">
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
						Current API Time
					</h2>
					<div className="p-4 bg-white rounded-lg shadow-inner border border-emerald-100">
						<p className="text-3xl font-mono font-bold text-emerald-700 break-all tracking-wide">
							{homeApiTime}
						</p>
					</div>
					<div className="mt-3 flex justify-between items-center text-sm">
						<p className="text-slate-600">
							<span className="font-medium">Page rendered:</span>{" "}
							<span className="font-mono">{homePageRenderTime}</span>
						</p>
						<p className="text-slate-500">
							<span className="px-2 py-1 bg-emerald-100 rounded-full text-xs font-mono">
								hono-api-time-tag
							</span>
						</p>
					</div>
				</section>

				<section className="grid md:grid-cols-2 gap-6">
					<div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 transition-all hover:shadow-md">
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
									d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
								/>
							</svg>
							API Time Demo
						</h2>
						<p className="text-slate-600 mb-4">
							Explore different caching options for data fetched from the Hono
							API.
						</p>
						<Link
							href="/api-no-store"
							className="group inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all hover:from-purple-700 hover:to-pink-700 shadow-sm hover:shadow"
						>
							<span>Visit API Time Demo</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M14 5l7 7m0 0l-7 7m7-7H3"
								/>
							</svg>
						</Link>
					</div>

					<div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 transition-all hover:shadow-md">
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
									d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
								/>
							</svg>
							On-Demand Revalidation
						</h2>
						<div className="space-y-3">
							<div>
								<RevalidateAPITimeButton
									onRevalidateAction={onRevalidateApiPathAction}
									buttonText="Revalidate Path: /api-time"
									className="cursor-pointer w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all shadow-sm hover:shadow flex items-center justify-center"
								/>
								<p className="text-xs text-slate-500 mt-1 ml-1">
									Revalidates only the{" "}
									<code className="px-1 py-0.5 bg-slate-100 rounded">
										/api-time
									</code>{" "}
									route
								</p>
							</div>
							<div>
								<RevalidateAPITimeButton
									onRevalidateAction={onRevalidateApiTagAction}
									buttonText="Revalidate Tag: 'hono-api-time-tag'"
									className="cursor-pointer w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-medium py-2 px-4 rounded-lg transition-all shadow-sm hover:shadow flex items-center justify-center"
								/>
								<p className="text-xs text-slate-500 mt-1 ml-1">
									Revalidates all data fetched with this tag
								</p>
							</div>
						</div>
					</div>
					<div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 transition-all hover:shadow-md">
						<h2 className="text-2xl font-semibold mb-3 text-slate-800 flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 mr-2 text-sky-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" // Re-using clock icon
								/>
							</svg>
							Time-Based Revalidation
						</h2>
						<p className="text-slate-600 mb-4">
							Data is re-fetched periodically from the API after a set time
							interval.
						</p>
						<Link
							href="/api-time-based"
							className="group inline-flex items-center justify-center bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-medium py-3 px-6 rounded-lg transition-all hover:from-sky-600 hover:to-cyan-600 shadow-sm hover:shadow"
						>
							<span>Visit Revalidation Demo</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M14 5l7 7m0 0l-7 7m7-7H3"
								/>
							</svg>
						</Link>
					</div>
				</section>

				<footer className="mt-12 pt-6 border-t border-slate-200 text-center">
					<p className="text-sm text-slate-500">
						For accurate revalidation timing, use a production build
						<code className="mx-1 px-2 py-0.5 bg-slate-100 rounded text-xs">
							pnpm build && pnpm start
						</code>
					</p>
					<div className="mt-2 flex items-center justify-center space-x-2 text-slate-400">
						<span className="text-xs">Built with</span>
						<span className="text-pink-500">♥</span>
						<span className="text-xs">using Next.js and Hono</span>
					</div>
				</footer>
			</div>
		</main>
	);
}
