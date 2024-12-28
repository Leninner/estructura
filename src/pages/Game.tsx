import { useEffect } from "react";
import { GallowsComponent } from "../components/hanged/GallowsComponent";
import { Summary } from "../components/Summary";
import { WordPlaceholder } from "../components/WordPlaceholder";
import { useKeyboard } from "../shared/hooks/useKeyboard";
import { useGame } from "../store/useGame";
import { useGameWorkflow } from "../store/useGameWorkflow";
import { useWords } from "../store/useWords";

export const Game = () => {
	const { rounds, hasFinished, currentRound, participants } = useGame(
		(state) => state
	);
	const { pickWord } = useWords();
	const {
		userAttemptsLog,
		currentWord,
		currentUser,
		trackUserLog,
		setCurrentWord,
		userCanTry,
		setCurrentUser,
	} = useGameWorkflow();

	const keyPressed = useKeyboard();

	// Track user log
	useEffect(() => {
		if (keyPressed && currentUser && userCanTry(currentUser)) {
			trackUserLog(currentUser, keyPressed);

			console.log("Tecla presionada:", keyPressed);
			console.log("Log actual:", userAttemptsLog[currentUser]);
		}
	}, [keyPressed, currentUser, trackUserLog, userCanTry]);


	// Tomar una palabra cuando el juego inicia
	useEffect(() => {
		if (!currentWord) {
			const word = pickWord();
			setCurrentWord(word);
		}
	}, [currentWord, pickWord, setCurrentWord]);

	// establecer el primer usuario
	useEffect(() => {
		if (!currentUser && participants.length) {
			setCurrentUser(participants[0].name);
		}
	}, [currentUser, participants, setCurrentUser]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10">
			{/* Summary */}
			<Summary
				word={currentWord}
				hasFinished={hasFinished}
				rounds={rounds}
				currentRound={currentRound}
			/>

			{/* Gallows */}
			<div className="mt-6">
				<GallowsComponent errors={userAttemptsLog[currentUser]?.badAttempts || 0} />
			</div>

			{/* Word Placeholder */}
			<div className="mt-6">
				<WordPlaceholder word={currentWord} letters={[...(userAttemptsLog[currentUser]?.goodAttempts || '')]} />
			</div>
		</div>
	);
};
