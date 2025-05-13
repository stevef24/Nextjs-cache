import PokemonCard from "./components/PokemonCard";

export default async function Home() {
	const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
	const posts = await data.json();
	console.log(posts.results);
	return (
		<div className="flex flex-wrap gap-4 max-w-5xl mx-auto justify-center items-center">
			{posts.results.map((post: { name: string; url: string }) => (
				<PokemonCard key={post.name} name={post.name} url={post.url} />
			))}
		</div>
	);
}
