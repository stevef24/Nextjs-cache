import Image from "next/image";

export interface RickandMortyCardProps {
	name: string;
	url: string;
	status?: string;
	species?: string;
}

const RickandMortyCard = ({
	name,
	url,
	status = "Unknown",
	species = "Unknown",
}: RickandMortyCardProps) => {
	const statusColor =
		{
			Alive: "bg-green-500/10 text-green-400 border-green-500/20",
			Dead: "bg-red-500/10 text-red-400 border-red-500/20",
			Unknown: "bg-gray-500/10 text-gray-400 border-gray-500/20",
		}[status] || "bg-gray-500/10 text-gray-400 border-gray-500/20";

	const speciesColor = "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";

	return (
		<div className="overflow-hidden rounded-lg border border-gray-800 bg-black/40 backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300 group">
			<div className="relative h-64 overflow-hidden">
				<Image
					src={url || "/placeholder.svg"}
					alt={name}
					className="object-cover transition-transform duration-500 group-hover:scale-110"
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
			</div>
			<div className="p-4 bg-black/60">
				<h3 className="text-lg font-semibold text-white mb-2 truncate">
					{name}
				</h3>
				<div className="flex flex-wrap gap-2">
					<span
						className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full border ${statusColor}`}
					>
						{status}
					</span>
					<span
						className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full border ${speciesColor}`}
					>
						{species}
					</span>
				</div>
			</div>
		</div>
	);
};

export default RickandMortyCard;
