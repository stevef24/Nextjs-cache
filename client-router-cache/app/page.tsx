import Link from "next/link";

export default function HomePage() {
	console.log("HomePage rendered/hydrated");

	return (
		<div className="bg-slate-800/50 p-8 rounded-lg shadow-xl">
			<h1 className="text-4xl font-bold mb-6 text-cyan-400">Home Page</h1>
			<p className="mb-4 text-lg text-slate-300">
				This is the main page of our application, styled with Tailwind CSS.
			</p>
			<p className="mb-6 text-slate-300">
				When you click the link below, notice how the page content changes
				without a full browser refresh. The URL will update, and the navigation
				bar from the layout will remain.
			</p>
			<Link
				href="/about"
				className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out transform hover:scale-105"
			>
				Go to About Page
			</Link>
			<p className="mt-8 text-sm text-slate-400">
				(Open your browsers developer console and network tab to observe the
				behavior)
			</p>
		</div>
	);
}
