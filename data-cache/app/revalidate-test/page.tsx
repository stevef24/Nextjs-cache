import Link from "next/link";
import { getData } from "../helpers";
import Image from "next/image";

const DOG_API_URL = `https://dog.ceo/api/breeds/image/random`;
const REVALIDATE_SECONDS = 15;

export default async function RevalidateTestPage() {
	console.log(
		`\n--- [Revalidate Test Page (Dog API, revalidate: ${REVALIDATE_SECONDS}s)] START ---`
	);

	console.log(
		"[Revalidate Test Page] Attempting fetch with time-based revalidation..."
	);

	const dogData = await getData(DOG_API_URL, {
		next: { revalidate: REVALIDATE_SECONDS },
	});
	console.log("[Revalidate Test Page] Fetch processed.");

	const serverRenderTime = new Date().toLocaleTimeString();
	console.log(`[Revalidate Test Page] Page rendered at: ${serverRenderTime}`);
	const imageUrl = dogData?.message;
	const apiStatus = dogData?.status;

	console.log(
		`--- [Revalidate Test Page (Dog API, revalidate: ${REVALIDATE_SECONDS}s)] END ---`
	);

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6 text-center">
				Time-Based Revalidation Test ({REVALIDATE_SECONDS}s) - Dog API
			</h1>
			<p className="text-center mb-2">
				Fetching a random dog image with{" "}
				<code>next: {"{ revalidate: REVALIDATE_SECONDS }"}</code>.
			</p>
			<p className="text-center mb-4">
				Observe image change after revalidation window.
			</p>
			<p className="text-center mb-4 text-lg text-gray-500">
				Page Server-Rendered at: {serverRenderTime}
			</p>
			{apiStatus === "success" && imageUrl && (
				<div className="flex flex-col items-center">
					<p className="text-sm mb-2">Image URL: {imageUrl}</p>
					<Image
						src={imageUrl}
						alt="A random dog"
						width={400}
						height={300}
						priority
						className="rounded-lg shadow-md object-contain max-h-80"
					/>
				</div>
			)}
			{apiStatus !== "success" && (
				<p className="text-center text-red-500">Could not fetch dog image.</p>
			)}
			<div className="text-center mt-8">
				<Link href="/" className="text-blue-500 hover:underline text-xl">
					Go Home
				</Link>
			</div>
		</div>
	);
}
