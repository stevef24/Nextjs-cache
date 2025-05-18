/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
import RickandMortyCard from "./components/RickandMortyCardProps";
import { getData } from "./helpers";
import CharacterSummary from "./components/CharacterSummary";

const RICK_AND_MORTY_API_URL = "https://rickandmortyapi.com/api/character";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
	console.log("\n--- [generateMetadata - Home Page] START ---");
	try {
		const data = await getData(RICK_AND_MORTY_API_URL);
		const firstCharacterName = data.results[0]?.name || "Characters";
		console.log("[generateMetadata - Home Page] Fetch for metadata processed.");
		console.log("--- [generateMetadata - Home Page] END ---");
		return {
			title: `Full Route Cache Demo: ${firstCharacterName}`,
		};
	} catch (error) {
		console.error("[generateMetadata - Home Page] Error fetching data:", error);
		console.log("--- [generateMetadata - Home Page] END ---");
		return {
			title: "Full Route Cache Demo: Rick and Morty",
		};
	}
}

export default async function Home() {
	console.log("\n--- [Home Page Component Render] START ---");
	console.log(
		"[Home Page Component] Attempting FIRST fetch call (data will be cached by default)..."
	);
	const posts1 = await getData(RICK_AND_MORTY_API_URL);
	console.log("[Home Page Component] FIRST fetch call processed.");

	console.log(
		"\n[Home Page Component] Attempting SECOND (identical) fetch call (memoized by React)..."
	);
	const posts2 = await getData(RICK_AND_MORTY_API_URL);
	console.log("[Home Page Component] SECOND (identical) fetch call processed.");

	console.log("\n--- [Home Page Component Render] END ---");

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6 text-center">
				Full Route Cache Demo (Rick and Morty)
			</h1>
			<div className="text-center mb-6 p-4 border border-blue-300 rounded-lg max-w-3xl mx-auto">
				<h2 className="text-xl font-semibold mb-2">
					Observing Full Route Cache:
				</h2>
				<ol className="list-decimal list-inside text-left text-sm">
					<li>
						Run{" "}
						<code className="border border-gray-200 px-1 rounded">
							npm run build
						</code>
						. Observe the terminal output. You should see this page (route{" "}
						<code className="border border-gray-200 px-1 rounded">/</code>)
						marked as static (●). This means Next.js has pre-rendered it and
						stored it in the Full Route Cache.
					</li>
					<li>
						The console logs from{" "}
						<code className="border border-gray-200 px-1 rounded">getData</code>
						,{" "}
						<code className="border border-gray-200 px-1 rounded">
							generateMetadata
						</code>
						, and this page component will appear during the build process.
					</li>
					<li>
						Run{" "}
						<code className="border border-gray-200 px-1 rounded">
							npm run start
						</code>{" "}
						to serve the production build.
					</li>
					<li>
						When you access this page in your browser, it's served from the Full
						Route Cache. The server-side console logs (from{" "}
						<code className="border border-gray-200 px-1 rounded">getData</code>
						, etc.) should <span className="font-bold">not</span> appear again
						in the terminal on subsequent requests, as the page is not being
						re-rendered on the server. It's served directly from the cache.
					</li>
					<li>
						To see the opposite (dynamic rendering), you can try:
						<ul className="list-disc list-inside ml-4">
							<li>
								Adding{" "}
								<code className="border border-gray-200 px-1 rounded">
									export const dynamic = 'force-dynamic';
								</code>{" "}
								to this page.
							</li>
							<li>
								Or changing{" "}
								<code className="border border-gray-200 px-1 rounded">
									fetch
								</code>{" "}
								in{" "}
								<code className="border border-gray-200 px-1 rounded">
									app/helpers.ts
								</code>{" "}
								to use{" "}
								<code className="border border-gray-200 px-1 rounded">
									{"{ cache: 'no-store' }"}
								</code>
								.
							</li>
							<li>
								Then rebuild and restart. The page will be marked dynamic (λ),
								and logs will appear on every request.
							</li>
						</ul>
					</li>
				</ol>
			</div>
			<CharacterSummary />
			<div className="flex flex-wrap gap-4 max-w-5xl mx-auto justify-center items-center">
				{posts1.results.map(
					(post: { id: number; name: string; image: string }) => (
						<RickandMortyCard key={post.id} name={post.name} url={post.image} />
					)
				)}
			</div>
		</div>
	);
}
