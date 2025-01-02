interface SummaryProps {
	word: string;
	rounds: number;
	currentRound: number;
	hasFinished: boolean;
	currentUser: string;
	leaderboard?: Map<string, number>; // Nuevo campo para mostrar el marcador
}

export const Summary: React.FC<SummaryProps> = ({
	word,
	rounds,
	hasFinished,
	currentRound,
	currentUser,
	leaderboard = new Map(),
}) => {
	return (
		<div className="bg-gradient-to-r from-yellow-500 to-orange-400 p-6 rounded-xl shadow-[4px_4px_0_rgba(0,0,0,1)] border-4 border-black text-center">
			{!hasFinished ? (
				<>
					<h1 className="text-6xl font-extrabold text-black mb-4 drop-shadow-[2px_2px_0_rgba(255,255,255,1)]">
						Palabra de {word.length} letras
					</h1>
					<div className="space-y-2">
						<p className="text-xl font-bold text-purple-900">El juego está en progreso</p>
						<p className="text-lg">
							<span className="text-black">Usuario actual: </span>
							<span className="font-bold text-purple-900">{currentUser}</span>
						</p>
						<div className="mt-4 text-lg">
							<p>Rondas totales: {rounds}</p>
							<p>Ronda actual: {currentRound}</p>
						</div>
					</div>
				</>
			) : (
				<div className="space-y-4">
					<h1 className="text-5xl font-extrabold text-black mb-2 drop-shadow-[2px_2px_0_rgba(255,255,255,1)]">
						Leaderboard
					</h1>
					<h2 className="text-xl font-bold">Rondas totales: {rounds}</h2>
					<div className="max-h-96 overflow-y-auto">
						<ul className="text-left space-y-2">
							{Array.from(leaderboard.entries()).map(([name, score], index) => (
								<li
									key={name}
									className="bg-white/30 p-3 rounded-lg shadow-[2px_2px_0_rgba(0,0,0,1)] border-2 border-black"
								>
									<span className="font-bold">{index + 1}.</span> {name} - {score} puntos
								</li>
							))}
						</ul>
					</div>
					<button
						className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow-[2px_2px_0_rgba(255,255,255,1)] border-2 border-black transform hover:scale-105 transition"
					>
						Reiniciar juego
					</button>
				</div>
			)}
		</div>
	);
};
