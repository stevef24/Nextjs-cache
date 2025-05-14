/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import RickandMortyCard from "../components/RickandMortyCardProps";
import { getData } from "../helpers";

const RICK_AND_MORTY_API_URL = "https://rickandmortyapi.com/api/character";

export default async function NoStoreTestPage() {
	console.log("\n--- [No-Store Test Page Render] START ---");

	console.log("[No-Store Test Page] Attempting fetch with 'no-store'...");
	// Fetch data with cache: 'no-store'
	const characters = await getData(RICK_AND_MORTY_API_URL, {
		cache: "no-store",
	});
	console.log("[No-Store Test Page] Fetch processed.");

	console.log("--- [No-Store Test Page Render] END ---");

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6 text-center">
				No-Store Cache Test Page
			</h1>
			<p className="text-center mb-4">
				This page fetches data using <code>cache: 'no-store'</code>. Each
				load/refresh should result in a "long" fetch duration in server logs,
				indicating a fresh network request.
			</p>
			<div className="flex flex-wrap gap-4 max-w-5xl mx-auto justify-center items-center mt-6">
				{characters.results.map(
					(post: { id: number; name: string; image: string }) => (
						<RickandMortyCard key={post.id} name={post.name} url={post.image} />
					)
				)}
			</div>
			<div className="text-center mt-8">
				<Link href="/" className="text-blue-500 hover:underline text-xl mr-4">
					Go Home
				</Link>
				<Link
					href="/cached-page-test"
					className="text-blue-500 hover:underline text-xl"
				>
					Go to Cached Page Test
				</Link>
			</div>
		</div>
	);
}
