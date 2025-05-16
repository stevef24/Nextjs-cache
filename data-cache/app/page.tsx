import Link from "next/link";
import RickandMortyCard from "./components/RickandMortyCardProps";
import { getData } from "./helpers";

const RICK_AND_MORTY_API_URL = "https://rickandmortyapi.com/api/character";

export default async function Home() {
	console.log("\n--- [Home Page Render - Data Cache Demo] START ---");

	console.log("[Home Page] Attempting initial fetch to populate cache...");
	const characters = await getData(RICK_AND_MORTY_API_URL);
	console.log("[Home Page] Initial fetch processed.");

	console.log("--- [Home Page Render - Data Cache Demo] END ---");

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6 text-center">
				Home Page (Data Cache Populator)
			</h1>
			<p className="text-center mb-4">
				This page fetches data, populating the Data Cache. Check server logs for
				fetch duration.
			</p>
			<div className="flex flex-wrap gap-4 max-w-5xl mx-auto justify-center items-center mt-6">
				{characters.results.map(
					(post: { id: number; name: string; image: string }) => (
						<RickandMortyCard key={post.id} name={post.name} url={post.image} />
					)
				)}
			</div>
			<div className="text-center mt-8 flex gap-4 justify-center">
				<Link
					href="/cached-page-test"
					className="text-blue-500 hover:underline text-xl"
				>
					Go to Cached Page Test
				</Link>
				<Link
					href="/no-store-test"
					className="text-blue-500 hover:underline text-xl"
				>
					Go to No-Store Test
				</Link>
				<Link
					href="/revalidate-test"
					className="text-blue-500 hover:underline text-xl"
				>
					Go to Revalidate Test
				</Link>
				<Link
					href="/on-demand-revalidate-test"
					className="text-blue-500 hover:underline text-xl"
				>
					Go to On-Demand Revalidate Test
				</Link>
			</div>
		</div>
	);
}
