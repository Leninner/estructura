import { create } from "zustand";

const MAX_ATTEMPTS = 5;

export const useGameWorkflow = create<{
	currentWord: string;
	currentUser: string;
	setCurrentUser: (user: string) => void;
	userAttemptsLog: Record<string, { goodAttempts: string[]; badAttempts: number }>;
	userCanTry: (user: string) => boolean;
	trackUserLog: (user: string, letter: string) => void;
	trackUserError: (user: string) => void;
	trackUserSuccess: (user: string, letter: string) => void;
	resetAttempts: () => void;
	setCurrentWord: (word: string) => void;
}>((set, get) => ({
	currentUser: "",
	setCurrentUser: (user: string) => {
		set({ currentUser: user });
	},
	currentWord: "",
	userAttemptsLog: {},
	userCanTry: (user: string) => {
		const userLog = get().userAttemptsLog[user];
		if (!userLog) {
			return true;
		}
		return userLog.badAttempts < MAX_ATTEMPTS && userLog.goodAttempts.length < get().currentWord.length;
	},
	trackUserLog: (user: string, letter: string) => {
		if (get().currentWord.includes(letter.toLowerCase())) {
			get().trackUserSuccess(user, letter.toLowerCase());
		} else {
			get().trackUserError(user);
		}
	},
	trackUserError: (user: string) => {
		set((state) => {
			const userLog = state.userAttemptsLog[user] || { goodAttempts: [], badAttempts: 0 };
			return {
				userAttemptsLog: {
					...state.userAttemptsLog,
					[user]: {
						...userLog,
						badAttempts: userLog.badAttempts + 1,
					},
				},
			};
		});
	},
	trackUserSuccess: (user: string, letter: string) => {
		set((state) => {
			const userLog = state.userAttemptsLog[user] || { goodAttempts: [], badAttempts: 0 };
			return {
				userAttemptsLog: {
					...state.userAttemptsLog,
					[user]: {
						...userLog,
						goodAttempts: [...new Set([...userLog.goodAttempts, letter])],
					},
				},
			};
		});
	},
	resetAttempts: () => {
		set({ userAttemptsLog: {} });
	},
	setCurrentWord: (word: string) => {
		set({ currentWord: word.toLowerCase() });
	},
}));
