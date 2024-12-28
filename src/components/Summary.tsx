interface SummaryProps {
	word: string;
	rounds: number;
	currentRound: number;
	hasFinished: boolean;
}

export const Summary: React.FC<SummaryProps> = ({ word, rounds, hasFinished, currentRound }) => {
	return (
		<div className="text-center bg-yellow-100 p-6 rounded-lg shadow-md">
			<h1 className="text-6xl font-extrabold text-green-600 mb-4">Palabra de {word.length} letras</h1>
			<div className="text-xl font-semibold text-gray-700">
				{hasFinished ? <p>El juego ha terminado</p> : <p>El juego ha comenzado</p>}

				<p>Rondas: {rounds}</p>
				<p>Ronda actual: {currentRound}</p>
			</div>
		</div>
	);
}
