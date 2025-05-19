import { getData } from "../helpers";

const RICK_AND_MORTY_API_URL = "https://rickandmortyapi.com/api/character";

export default async function CharacterSummary() {
	console.log("\n--- [CharacterSummary Component] START ---");
	const data = await getData(RICK_AND_MORTY_API_URL);
	const characterCount = data.results?.length || 0;
	console.log("[CharacterSummary Component] Data processed.");
	console.log("--- [CharacterSummary Component] END ---");

	return (
		<div className="relative overflow-hidden rounded-xl bg-black/20 backdrop-blur-sm border border-gray-800 p-6 text-center">
			<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27 width=%2732%27 height=%2732%27 fill=%27none%27 stroke=%27rgb(255 255 255 / 0.05)%27%3e%3cpath d=%27M0 .5H31.5V32%27/%3e%3c/svg%3e')] [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
			<div className="relative z-10">
				<span className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-2 bg-green-500/10 text-green-400 border border-green-500/20">
					Portal C-137
				</span>
				<h2 className="text-xl font-medium text-gray-200 mb-2">
					Character Database
				</h2>
				<p className="text-gray-400">
					Currently displaying{" "}
					<span className="text-green-400 font-semibold">{characterCount}</span>{" "}
					interdimensional beings
				</p>
			</div>
		</div>
	);
}
