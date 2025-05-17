import { getData } from "../helpers";

const RICK_AND_MORTY_API_URL = "https://rickandmortyapi.com/api/character";

export default async function CharacterSummary() {
	console.log("\n--- [CharacterSummary Component] START ---");
	const data = await getData(RICK_AND_MORTY_API_URL);
	const characterCount = data.results?.length || 0;
	console.log("[CharacterSummary Component] Data processed.");
	console.log("--- [CharacterSummary Component] END ---");

	return (
		<div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
			<p className="text-lg font-medium text-gray-700">
				Summary: Displaying data for {characterCount} characters.
			</p>
		</div>
	);
}
