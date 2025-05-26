import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
	title: "Next.js Client Router Demo (Tailwind)",
	description: "Demonstrating client-side navigation with Tailwind CSS",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="min-h-screen flex flex-col">
				<header className="bg-slate-800 shadow-md">
					<nav className="container mx-auto px-6 py-3 flex justify-between items-center">
						<Link
							href="/"
							className="text-xl font-semibold text-white hover:text-cyan-400 transition-colors"
						>
							Client Router Demo
						</Link>
						<div className="space-x-4">
							<Link
								href="/"
								className="text-slate-300 hover:text-cyan-400 transition-colors"
							>
								Home
							</Link>
						</div>
					</nav>
				</header>

				<main className="flex-grow container mx-auto px-6 py-8">
					{children}
				</main>

				<footer className="bg-slate-800 text-center py-4 text-sm text-slate-400">
					© {new Date().getFullYear()} Demo App
				</footer>
			</body>
		</html>
	);
}
