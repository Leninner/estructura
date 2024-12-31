import { useEffect, useState } from "react";
import { GallowsComponent } from "../components/hanged/GallowsComponent";
import { Summary } from "../components/Summary";
import { WordPlaceholder } from "../components/WordPlaceholder";
import { useKeyboard } from "../shared/hooks/useKeyboard";
import { useGame } from "../store/useGame";
import { useGameWorkflow } from "../store/useGameWorkflow";
import { useWords } from "../store/useWords";

export const Game = () => {
	const {
		rounds,
		hasFinished,
		currentRound,
		getRandomParticipant,
		advanceRound,
		allHasParticipateInRound,
		saveUserRoundAttempt
	} = useGame((state) => state);
	const { pickWord } = useWords();
	const {
		userAttemptsLog,
		currentWord,
		trackUserLog,
		setCurrentWord,
		userCanTry,
		resetAttempts,
	} = useGameWorkflow();

	const keyPressed = useKeyboard();
	const [currentUser, setCurrentUser] = useState<string>("");

	// Avanzar de ronda
	useEffect(() => {
		if (allHasParticipateInRound()) {
			resetAttempts();
			advanceRound();
		}
	}, [
		userAttemptsLog
	]);

	// Track user log
	useEffect(() => {
		if (keyPressed && userCanTry(currentUser)) {
			trackUserLog(currentUser, keyPressed);

			console.log("Tecla presionada:", keyPressed);
			console.log("Log actual:", userAttemptsLog[currentUser]);
		}
	}, [keyPressed, currentUser, userCanTry, trackUserLog]);

	// Cambiar de usuario si ya no puede intentar más
	useEffect(() => {
		if (!userCanTry(currentUser)) {
			saveUserRoundAttempt(currentUser, userAttemptsLog[currentUser]);
			setCurrentUser(getRandomParticipant());
		}
	}, [currentUser, userCanTry, getRandomParticipant]);

	// Tomar una palabra cada que empieza una nueva ronda
	useEffect(() => {
		if (currentRound > rounds) {
			alert("Fin del juego");
			return;
		}

		const word = pickWord();
		setCurrentWord(word);
	}, [currentRound, rounds, pickWord, setCurrentWord]);

	// establecer el primer usuario and the rest
	useEffect(() => {
		setCurrentUser(getRandomParticipant());
	}, [currentRound, getRandomParticipant]);

	// Resetear intentos de usuario
	useEffect(() => {
		resetAttempts();
	}, [currentRound, resetAttempts]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10">
			{/* Summary */}
			<Summary
				word={currentWord}
				hasFinished={hasFinished}
				rounds={rounds}
				currentRound={currentRound}
				currentUser={currentUser}
			/>

			{/* Gallows */}
			<div className="mt-6">
				<GallowsComponent
					errors={userAttemptsLog[currentUser]?.badAttempts || 0}
				/>
			</div>

			{/* Word Placeholder */}
			<div className="mt-6">
				<WordPlaceholder
					word={currentWord}
					letters={[...(userAttemptsLog[currentUser]?.goodAttempts || "")]}
				/>
			</div>
		</div>
	);
};
