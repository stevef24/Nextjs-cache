/* eslint-disable react/no-unescaped-entities */
import RickandMortyCard from "./components/RickandMortyCardProps";
import { getData } from "./helpers";
// import { cookies, headers } from "next/headers";

// export const dynamic = "force-dynamic";

// export const revalidate = 0;

const RICK_AND_MORTY_API_URL = "https://rickandmortyapi.com/api/character";

export default async function Home() {
	// const cookieStore = cookies();

	// const headerList = headers();

	// const pageData = await getData(RICK_AND_MORTY_API_URL, { cache: 'no-store' });

	// const pageData = await getData(RICK_AND_MORTY_API_URL, { revalidate: 0 });

	const pageData = await getData(RICK_AND_MORTY_API_URL);

	const characters = pageData?.results || [];

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6 text-center">
				Minimal Cache Demo (Rick and Morty)
			</h1>
			<div className="text-center mb-6 p-4 border border-blue-300 rounded-lg max-w-3xl mx-auto">
				<h2 className="text-xl font-semibold mb-2">Observing Caching:</h2>
				<ol className="list-decimal list-inside text-left text-sm space-y-1">
					<li>
						<strong>Build (`npm run build`):</strong> Page (route `/`) becomes
						static (●). The `getData` helper (in `helpers.ts`) logs its fetch to
						the API during this build.
					</li>
					<li>
						<strong>Start (`npm run start`):</strong> Serve the production
						build.
					</li>
					<li>
						<strong>Browser:</strong> Access this page. It's served from the
						cache. The `getData` log from the build time{" "}
						<span className="font-bold">does not</span> reappear in the terminal
						on requests.
					</li>
					<li>
						<strong>Make it Dynamic (Try ONE of these methods):</strong>
						<ul className="list-disc list-inside ml-4 mt-1 space-y-2">
							<li>
								<strong>
									Method A (Route Segment Config - `force-dynamic`):
								</strong>{" "}
								In this file (`app/page.tsx`), uncomment the line:
								<br />
								<code className="bg-gray-200/10 px-1 rounded text-xs">
									{'// export const dynamic = "force-dynamic";'}
								</code>
							</li>
							<li>
								<strong>
									Method B (Route Segment Config - `revalidate = 0`):
								</strong>{" "}
								In this file (`app/page.tsx`), uncomment the line:
								<br />
								<code className="bg-gray-200/10 px-1 rounded text-xs">
									{"// export const revalidate = 0;"}
								</code>
							</li>
							<li>
								<strong>Method C (Dynamic Function Usage):</strong> In this file
								(`app/page.tsx`), inside the `Home` component, uncomment one of
								the blocks for `cookies()` or `headers()`. Remember to also
								uncomment the corresponding import at the top of the file:
								<br />
								<code className="bg-gray-200/10 px-1 rounded text-xs">
									{"// import { cookies, headers } from 'next/headers';"}
								</code>
								<br />
								then, for example:
								<br />
								<code className="bg-gray-200/10 px-1 rounded text-xs">
									{"// const cookieStore = cookies();"}
								</code>
							</li>
							<li>
								<strong>Method D (Data Fetching - `cache: 'no-store'`):</strong>{" "}
								In `app/helpers.ts`, change the `fetch` call inside `getData`
								from `fetch(url)` to:
								<br />
								<code className="bg-gray-200/10 px-1 rounded text-xs">
									{"fetch(url, { cache: 'no-store' })"}
								</code>
							</li>
							<li>
								<strong>Method E (Data Fetching - `revalidate: 0`):</strong> In
								`app/helpers.ts`, change the `fetch` call inside `getData` from
								`fetch(url)` to:
								<br />
								<code className="bg-gray-200/10 px-1 rounded text-xs">
									{"fetch(url, { next: { revalidate: 0 } })"}
								</code>
							</li>
						</ul>
					</li>
					<li>
						<strong>Rebuild & Restart:</strong> After applying a dynamic method,
						rebuild (`npm run build`) and restart the server (`npm run start`).
						The page will be marked dynamic (λ). The `getData` log (and any new
						console logs you added) will now appear in the terminal on{" "}
						<span className="font-bold">every request</span> to this page.
					</li>
				</ol>
			</div>

			{characters.length > 0 ? (
				<div className="flex flex-wrap gap-4 max-w-5xl mx-auto justify-center items-center">
					{characters.map(
						(character: { id: number; name: string; image: string }) => (
							<RickandMortyCard
								key={character.id}
								name={character.name}
								url={character.image}
							/>
						)
					)}
				</div>
			) : (
				<p className="text-center text-red-500">
					No characters found or error fetching data. Ensure the API is
					reachable.
				</p>
			)}
		</div>
	);
}
