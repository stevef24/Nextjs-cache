import Link from "next/link";
import { getData } from "../helpers";
import RickandMortyCard from "../components/RickandMortyCardProps";

const RICK_AND_MORTY_API_URL = "https://rickandmortyapi.com/api/character";
const REVALIDATE_SECONDS = 15;

export default async function RevalidateTestPage() {
	console.log(
		`\n--- [Revalidate Test Page (revalidate: ${REVALIDATE_SECONDS}s)] START ---`
	);

	console.log(
		"[Revalidate Test Page] Attempting fetch with time-based revalidation..."
	);
	const characters = await getData(RICK_AND_MORTY_API_URL, {
		next: { revalidate: REVALIDATE_SECONDS },
	});
	console.log("[Revalidate Test Page] Fetch processed.");

	const currentTime = new Date().toLocaleTimeString();
	console.log(`[Revalidate Test Page] Page rendered at: ${currentTime}`);

	console.log(
		`--- [Revalidate Test Page (revalidate: ${REVALIDATE_SECONDS}s)] END ---`
	);

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6 text-center">
				Time-Based Revalidation Test ({REVALIDATE_SECONDS}s)
			</h1>
			<p className="text-center mb-2">
				This page fetches data with{" "}
				<code>next: {"{ revalidate: { REVALIDATE_SECONDS } }"}</code>.
			</p>
			<p className="text-center mb-4">
				Observe server logs. Initial load should be long. Subsequent loads
				within {REVALIDATE_SECONDS}s should be short (cached). After{" "}
				{REVALIDATE_SECONDS}s, the first load might still be short (stale data
				served), while Next.js revalidates in the background.
			</p>
			<p className="text-center mb-4 text-sm text-gray-500">
				Page rendered at: {currentTime}
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
					Go Home
				</Link>
			</div>
		</div>
	);
}
