import React, { useEffect } from "react";

interface RoundResultProps {
	isWinner: boolean;
	onConfirm: () => void;
}

export const RoundResult: React.FC<RoundResultProps> = ({ isWinner, onConfirm }) => {
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === "Enter" || event.key === "Escape") {
				onConfirm();
			}
		};

		document.addEventListener("keydown", handleKeyPress);

		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, [onConfirm]);

	return (
		<div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
			<div className="bg-gradient-to-r from-pink-500 to-orange-400 p-8 rounded-lg shadow-[6px_6px_0_rgba(0,0,0,1)] border-8 border-double border-black text-center">
				<div className="bg-black border-4 border-white rounded-lg p-4">
					<h2 className="text-white text-3xl font-extrabold mb-6">
						{isWinner ? "🏆 ¡Campeón del Ahorcado! 🏆" : "💀 ¡Ahorcado Extremo! 💀"}
					</h2>
					<p className="text-white mb-8 text-lg font-semibold">
						{isWinner
							? "¡Lo lograste! La palabra tembló ante tu genialidad."
							: "Te quedaste sin intentos... pero oye, ¡hiciste tu mejor esfuerzo!"}
					</p>
					<button
						onClick={onConfirm}
						className="bg-white text-black font-bold py-3 px-8 rounded-lg shadow-[4px_4px_0_rgba(0,0,0,1)] border-4 border-black hover:bg-gray-200 hover:scale-105 transform transition-transform"
					>
						OK
					</button>
				</div>
			</div>
		</div>
	);
};
