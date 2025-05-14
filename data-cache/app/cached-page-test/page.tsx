import Link from "next/link";
import RickandMortyCard from "../components/RickandMortyCardProps";
import { getData } from "../helpers";

const RICK_AND_MORTY_API_URL = "https://rickandmortyapi.com/api/character";

export default async function CachedPageTest() {
	console.log("\n--- [Cached Page Test Render] START ---");

	console.log("[Cached Page Test] Attempting fetch (should hit Data Cache)...");
	const characters = await getData(RICK_AND_MORTY_API_URL, {
		cache: "force-cache",
	});
	console.log("[Cached Page Test] Fetch processed.");

	console.log("--- [Cached Page Test Render] END ---");

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6 text-center">Cached Page Test</h1>
			<p className="text-center mb-4">
				This page attempts to fetch the same data as the Home page. If the Data
				Cache is working, the fetch duration in server logs should be shorter.
			</p>
			<div className="flex flex-wrap gap-4 max-w-5xl mx-auto justify-center items-center mt-6">
				{characters.results.map(
					(post: { id: number; name: string; image: string }) => (
						<RickandMortyCard key={post.id} name={post.name} url={post.image} />
					)
				)}
			</div>
			<div className="text-center mt-8">
				<Link href="/" className="text-blue-500 hover:underline text-xl">
					Go Back Home
				</Link>
			</div>
		</div>
	);
}
