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
		saveUserRoundAttempt,
		getLeaderboard
	} = useGame();
	const { pickWord } = useWords();
	const {
		userAttemptsLog,
		currentWord,
		trackUserLog,
		setCurrentWord,
		userCanTry,
		resetAttempts,
	} = useGameWorkflow();

	const { key: keyPressed, resetKey } = useKeyboard(hasFinished);
	const [currentUser, setCurrentUser] = useState<string>("");

	// Track user log
	useEffect(() => {
		if (keyPressed && userCanTry(currentUser)) {
			trackUserLog(currentUser, keyPressed);
		}
	}, [keyPressed, currentUser, userCanTry, trackUserLog]);

	// Cambiar de usuario si ya no puede intentar más
	useEffect(() => {
		if (currentUser && !userCanTry(currentUser)) {
			saveUserRoundAttempt(currentUser, userAttemptsLog[currentUser]);
			setCurrentUser(getRandomParticipant());
		}
	}, [userAttemptsLog]);

	// Tomar una palabra cada que empieza una nueva ronda
	useEffect(() => {
		const word = pickWord();
		console.log('pickWord', word);
		setCurrentWord(word);
	}, [currentRound, pickWord, setCurrentWord]);

	// establecer el primer usuario and the rest
	useEffect(() => {
		setCurrentUser(getRandomParticipant());
	}, [getRandomParticipant, currentRound]);

	// Resetear intentos de usuario
	useEffect(() => {
		resetAttempts();
		resetKey();
	}, [currentRound, currentUser]);

	console.log('userAttemptsLog', userAttemptsLog);

	return (
		<div className="min-h-screen bg-gradient-to-r from-orange-400 via-yellow-500 to-pink-500 flex flex-col items-center justify-center py-10">
			<div className="bg-gradient-to-r from-pink-500 to-orange-400 shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-xl p-8 w-full max-w-5xl border-4 border-black">
				<Summary
					word={currentWord}
					hasFinished={hasFinished}
					rounds={rounds}
					currentRound={currentRound}
					currentUser={currentUser}
					leaderboard={hasFinished ? getLeaderboard() : undefined}
				/>

				{!hasFinished && (
					<div className="space-y-6">
						<div className="mt-6 bg-black p-6 rounded-lg shadow-[2px_2px_0_rgba(255,255,255,1)] border-2 border-white flex items-center justify-center">
							<GallowsComponent
								errors={userAttemptsLog[currentUser]?.badAttempts || 0}
							/>
						</div>

						<div className="bg-yellow-500 p-6 rounded-lg shadow-[2px_2px_0_rgba(255,255,255,1)] border-2 border-black">
							<WordPlaceholder
								word={currentWord}
								letters={[...(userAttemptsLog[currentUser]?.goodAttempts || "")]}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	)
};
