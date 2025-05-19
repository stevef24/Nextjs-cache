interface RevalidateAPITimeButtonProps {
	onRevalidateAction: () => Promise<void>;
	buttonText?: string;
	className?: string;
}

export default function RevalidateAPITimeButton({
	onRevalidateAction,
	buttonText = "Revalidate Action",
	className = "bg-sky-600 hover:bg-sky-700 text-white",
}: RevalidateAPITimeButtonProps) {
	return (
		<form action={onRevalidateAction} className="hover:pointer">
			<button type="submit" className={`mt-2 ${className}`}>
				{buttonText}
			</button>
		</form>
	);
}
