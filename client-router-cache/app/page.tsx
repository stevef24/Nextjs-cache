import Link from "next/link";

export default function HomePage() {
	return (
		<div className="space-y-6">
			<h1 className="text-3xl font-bold">Router-cache playground</h1>

			<Link
				href="/about"
				prefetch={false}
				className="px-4 py-2 bg-teal-500 text-white rounded-lg"
			>
				About
			</Link>
		</div>
	);
}
