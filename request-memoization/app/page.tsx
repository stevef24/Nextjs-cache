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
			description: "Explore characters from Rick and Morty universe",
		};
	} catch (error) {
		console.error("[generateMetadata - Home Page] Error fetching data:", error);
		console.log("--- [generateMetadata - Home Page] END ---");
		return {
			title: "Rick and Morty Characters",
			description: "Explore characters from Rick and Morty universe",
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
		<div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-6 md:p-8">
			<div className="max-w-7xl mx-auto">
				<header className="mb-12 text-center">
					<h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400">
						Rick and Morty
					</h1>
					<p className="text-gray-400 text-lg">
						Memoization Demo — Check server logs for fetch durations
					</p>
				</header>

				<CharacterSummary />

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
					{posts1.results.map(
						(character: {
							id: number;
							name: string;
							image: string;
							status: string;
							species: string;
						}) => (
							<RickandMortyCard
								key={character.id}
								name={character.name}
								url={character.image}
								status={character.status}
								species={character.species}
							/>
						)
					)}
				</div>
			</div>
		</div>
	);
}
