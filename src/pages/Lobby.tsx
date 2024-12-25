import { useState } from "react";
import { useGame } from "../store/useGame";

export const Lobby = () => {
	const { participants, setRounds, addParticipant, removeParticipant, startGame } = useGame(
		(state) => state
	);

	const [roundQuantity, setRoundQuantity] = useState(0);

	const handleAddParticipant = () => {
		const name = prompt("Ingrese el nombre del participante:");

		if (!name) {
			alert("El nombre del participante no puede estar vacío.");
			return;
		}

		addParticipant(name);
	};

	const handleStartGame = () => {
		if (participants.length < 2) {
			alert("Se necesitan al menos 2 participantes para iniciar el juego.");
			return;
		}

		if (roundQuantity < 1) {
			alert("Se necesita al menos una ronda para iniciar el juego.");
			return;
		}

		setRounds(roundQuantity);
		startGame();
	}

	return (
		<div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
			<div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
				<h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
					Lobby - Juego de Ahorcado
				</h1>

				<div className="space-y-6">

					<div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-md">
						<label className="text-gray-800 font-medium text-lg flex items-center gap-2">
							<span className="text-gray-600">Rondas:</span>
							<span className="text-xl font-bold text-gray-900">{roundQuantity}</span>
						</label>
						<div className="flex gap-2">
							<button
								onClick={() => setRoundQuantity((prev) => Math.max(1, prev - 1))}
								className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition transform hover:scale-105 shadow-sm"
							>
								-
							</button>
							<button
								onClick={() => setRoundQuantity((prev) => prev + 1)}
								className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition transform hover:scale-105 shadow-sm"
							>
								+
							</button>
						</div>
					</div>

					<div>
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-semibold text-gray-800 mb-4">
								Participantes ({participants.length}):
							</h2>
							<button
								onClick={handleAddParticipant}
								className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition transform hover:scale-105 max-w-fit"
							>
								Añadir Participante
							</button>
						</div>

						<ul className="space-y-3 max-h-96 overflow-y-auto">
							{participants.map((participant, index) => (
								<li
									key={index}
									className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg shadow-md flex justify-between items-center"
								>
									<span className="font-medium">{participant.name}</span>
									<button
										onClick={() => removeParticipant(index)}
										className="bg-red-500 text-white px-3 py-2 rounded-md shadow-md hover:bg-red-600 transition transform hover:scale-105"
									>
										Eliminar
									</button>
								</li>
							))}
						</ul>
					</div>
					<button
						className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition transform hover:scale-105"
						onClick={handleStartGame}
					>
						Iniciar Juego
					</button>
				</div>
			</div>
		</div>
	)
};
