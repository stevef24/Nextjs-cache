import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "rickandmortyapi.com",
			},
		],
	},
};

export default nextConfig;
