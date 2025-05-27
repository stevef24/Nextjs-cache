import Link from "next/link";
import React from "react";

console.log("🧠 SERVER: About page rendered (RSC payload generated)");
const AboutPage = () => {
	return (
		<div>
			AboutPage
			<Link href="/" className="px-4 py-2 bg-teal-500 text-white rounded-lg">
				Home
			</Link>
		</div>
	);
};

export default AboutPage;
