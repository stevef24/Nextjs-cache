import React from "react";
import Image from "next/image";

export interface RickandMortyCardProps {
	name: string;
	url: string;
}

const RickandMortyCard = ({ name, url }: RickandMortyCardProps) => {
	return (
		<div className="border border-gray-200 rounded-xl p-5 m-2 text-center bg-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 ease-in-out w-56 flex flex-col items-center">
			<Image
				src={url}
				alt={name}
				className="w-32 h-32 mb-4 object-contain"
				width={128}
				height={128}
			/>
			<h3 className="text-xl font-semibold text-gray-800 capitalize">{name}</h3>
		</div>
	);
};

export default RickandMortyCard;
