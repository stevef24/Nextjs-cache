import Link from "next/link";

export default function AboutPage() {
	console.log("AboutPage rendered/hydrated");

	return (
		<div className="bg-slate-800/50 p-8 rounded-lg shadow-xl">
			<h1 className="text-4xl font-bold mb-6 text-teal-400">About Page</h1>
			<p className="mb-4 text-lg text-slate-300">
				Welcome to the about page! This content was loaded client-side.
			</p>
			<p className="mb-6 text-slate-300">
				You can navigate back to the home page using the link below or the
				browsers back button. The styling is managed by Tailwind CSS.
			</p>
			<Link
				href="/"
				className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out transform hover:scale-105"
			>
				Go to Home Page
			</Link>
		</div>
	);
}
