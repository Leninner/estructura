import { create } from "zustand";

export const MAX_ATTEMPTS = 7;

export const useGameWorkflow = create<{
  currentWord: string;
  userAttemptsLog: Record<
    string,
    { goodAttempts: string[]; badAttempts: number }
  >;
  userCanTry: (user: string) => boolean;
  hasUserWon: (user: string) => boolean;
  hasUserLost: (user: string) => boolean;
  trackUserLog: (user: string, letter: string) => void;
  trackUserError: (user: string) => void;
  trackUserSuccess: (user: string, letter: string) => void;
  resetAttempts: () => void;
  setCurrentWord: (word: string) => void;
}>((set, get) => ({
  currentWord: "",
  userAttemptsLog: {},
  hasUserLost: (user: string) => {
    const userLog = get().userAttemptsLog[user];
    return userLog?.badAttempts >= MAX_ATTEMPTS;
  },
  hasUserWon: (user: string) => {
    const userLog = get().userAttemptsLog[user];
    if (!userLog) {
      return false;
    }

    const currentWord = get().currentWord;
    const lettersToGuess = currentWord.split("").filter((char) => char !== " ");

    return lettersToGuess.every((letter) =>
      userLog.goodAttempts.includes(letter)
    );
  },
  userCanTry: (user: string) => {
    return !get().hasUserWon(user) && !get().hasUserLost(user);
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
      const userLog = state.userAttemptsLog[user] || {
        goodAttempts: [],
        badAttempts: 0,
      };
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
      const userLog = state.userAttemptsLog[user] || {
        goodAttempts: [],
        badAttempts: 0,
      };
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
