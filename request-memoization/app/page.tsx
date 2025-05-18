import RickandMortyCard from "./components/RickandMortyCardProps";
import { getData } from "./helpers";
import CharacterSummary from "./components/CharacterSummary";

const RICK_AND_MORTY_API_URL = "https://rickandmortyapi.com/api/character";

export async function generateMetadata() {
	console.log("\n--- [generateMetadata - Home Page] START ---");
	try {
		const data = await getData(RICK_AND_MORTY_API_URL);
		const firstCharacterName = data.results[0]?.name || "Characters";
		console.log("[generateMetadata - Home Page] Fetch for metadata processed.");
		console.log("--- [generateMetadata - Home Page] END ---");
		return {
			title: `Rick and Morty: ${firstCharacterName}`,
		};
	} catch (error) {
		console.error("[generateMetadata - Home Page] Error fetching data:", error);
		console.log("--- [generateMetadata - Home Page] END ---");
		return {
			title: "Rick and Morty Characters",
		};
	}
}

export default async function Home() {
	console.log("\n--- [Home Page Component Render] START ---");

	console.log("[Home Page Component] Attempting FIRST fetch call...");
	const posts1 = await getData(RICK_AND_MORTY_API_URL);
	console.log("[Home Page Component] FIRST fetch call processed.");

	console.log(
		"\n[Home Page Component] Attempting SECOND (identical) fetch call..."
	);
	const posts2 = await getData(RICK_AND_MORTY_API_URL);
	console.log("[Home Page Component] SECOND (identical) fetch call processed.");

	console.log("\n--- [Home Page Component Render] END ---");

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6 text-center">
				Rick and Morty (Memoization Demo)
			</h1>
			<p className="text-center mb-4">
				Observe server terminal logs for fetch durations.
			</p>
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
