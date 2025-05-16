import Link from "next/link";
import { revalidateTag } from "next/cache";
import { getData } from "../helpers";
import RickandMortyCard from "../components/RickandMortyCardProps";

const RICK_AND_MORTY_API_URL = "https://rickandmortyapi.com/api/character";
const ON_DEMAND_TAG = "rick-and-morty-characters";

async function revalidateCharactersAction() {
	"use server";
	console.log(`\n--- [Server Action - revalidateCharactersAction] START ---`);
	console.log(`[Server Action] Attempting to revalidate tag: ${ON_DEMAND_TAG}`);
	revalidateTag(ON_DEMAND_TAG);
	console.log(`[Server Action] Tag ${ON_DEMAND_TAG} revalidation triggered.`);
	console.log(`--- [Server Action - revalidateCharactersAction] END ---`);
}

export async function generateMetadata() {
	console.log(
		"\n--- [generateMetadata - OnDemandRevalidateTestPage] START ---"
	);
	try {
		const data = await getData(RICK_AND_MORTY_API_URL + "?page=1&count=1", {
			tags: [ON_DEMAND_TAG],
		});
		const firstCharacterName = data.results[0]?.name || "Characters";
		console.log(
			"[generateMetadata - OnDemandRevalidateTestPage] Fetch for metadata processed."
		);
		console.log("--- [generateMetadata - OnDemandRevalidateTestPage] END ---");
		return {
			title: `On-Demand Reval: ${firstCharacterName}`,
		};
	} catch (error) {
		console.error(
			"[generateMetadata - OnDemandRevalidateTestPage] Error fetching data:",
			error
		);
		console.log("--- [generateMetadata - OnDemandRevalidateTestPage] END ---");
		return {
			title: "On-Demand Revalidation Test",
		};
	}
}

export default async function OnDemandRevalidateTestPage() {
	console.log("\n--- [OnDemandRevalidateTestPage Component Render] START ---");
	const serverRenderTime = new Date().toLocaleTimeString();

	console.log(
		`[OnDemandRevalidateTestPage] Fetching data with tag: ${ON_DEMAND_TAG}`
	);
	const characters = await getData(RICK_AND_MORTY_API_URL, {
		tags: [ON_DEMAND_TAG],
	});
	console.log("[OnDemandRevalidateTestPage] Data fetched.");
	console.log(
		`[OnDemandRevalidateTestPage] Page rendered at: ${serverRenderTime}`
	);
	console.log("--- [OnDemandRevalidateTestPage Component Render] END ---");

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-2 text-center">
				On-Demand Revalidation Test (<code>revalidateTag</code>)
			</h1>
			<p className="text-center mb-1">
				Page Server-Rendered at:{" "}
				<span className="font-semibold">{serverRenderTime}</span>
			</p>
			<p className="text-center mb-4">
				This page fetches Rick and Morty characters. The data is tagged with{" "}
				<code>{ON_DEMAND_TAG}</code>. Click the button below to trigger
				revalidation for this tag. Observe server logs and the timestamp above.
			</p>

			<form action={revalidateCharactersAction} className="text-center mb-6">
				<button
					type="submit"
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-lg"
				>
					Revalidate Characters (Tag: {ON_DEMAND_TAG})
				</button>
			</form>

			<div className="flex flex-wrap gap-4 max-w-5xl mx-auto justify-center items-center mt-6">
				{characters.results
					.slice(0, 6)
					.map((character: { id: number; name: string; image: string }) => (
						<RickandMortyCard
							key={character.id}
							name={character.name}
							url={character.image}
						/>
					))}
			</div>
			<div className="text-center mt-8 flex gap-4 justify-center">
				<Link href="/" className="text-blue-500 hover:underline text-xl">
					Go Home
				</Link>
				<Link
					href="/revalidate-test"
					className="text-blue-500 hover:underline text-xl"
				>
					Go to Time-Based Revalidate Test
				</Link>
			</div>
		</div>
	);
}
