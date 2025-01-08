interface SummaryProps {
	word: string;
	rounds: number;
	currentRound: number;
	hasFinished: boolean;
	currentUser: string;
	leaderboard?: Map<string, { deads: number; guessed: number }>;
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
						<p className="text-xl font-bold text-purple-900 my-2">El juego está en progreso</p>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
							{/* Usuario Actual */}
							<div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-purple-200">
								<div className="text-center">
									<span className="text-black">Jugador actual: </span>
									<span className="font-bold text-purple-900 text-2xl">{currentUser}</span>
								</div>
							</div>

							{/* Ronda Actual */}
							<div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-purple-200">
								<div className="text-center">
									<span className="text-black">Ronda actual: </span>
									<span className="font-bold text-purple-900">{currentRound}</span>
								</div>
							</div>

							{/* Rondas Totales */}
							<div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-purple-200">
								<div className="text-center">
									<span className="text-black">Rondas totales: </span>
									<span className="font-bold text-purple-900">{rounds}</span>
								</div>
							</div>
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
									<span className="font-bold">{index + 1}.</span> {name} -{" "}
									<span className="text-green-700 font-bold">{score.guessed} aciertos</span>,{" "}
									<span className="text-red-700 font-bold">{score.deads} muertes</span>
								</li>
							))}
						</ul>
					</div>
					<button
						className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow-[2px_2px_0_rgba(255,255,255,1)] border-2 border-black transform hover:scale-105 transition"
						onClick={() => window.location.reload()}
					>
						Reiniciar juego
					</button>
				</div>
			)}
		</div>
	);
};
