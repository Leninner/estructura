import { INITIAL_WORDS } from "../shared/constants";
import { create } from "zustand";

export const useWords = create<{
  words: string[];
  extraWords: string[];
  pickedWords: string[];
  restart: () => void;
  addExtraWord: (word: string) => void;
  pickWord: () => void;
}>((set) => ({
  words: INITIAL_WORDS,
  extraWords: [],
  pickedWords: [],
  restart: () => set({ pickedWords: [], extraWords: [] }),
  addExtraWord: (word: string) =>
    set((state) => ({ extraWords: [...state.extraWords, word] })),
  pickWord: () => {
    set((state) => {
      const pickedWord = resolveUnusedWord(state);

      return {
        pickedWords: [...state.pickedWords, pickedWord],
      };
    });
  },
}));

const generateRandomIndex = (size: number): number => {
  return Math.floor(Math.random() * size);
};

const resolveUnusedWord = (state: ReturnType<typeof useWords.getState>): string => {
  const randomIndex = generateRandomIndex(
    state.words.length + state.extraWords.length,
  );

  const alreadyUsed = state.pickedWords.find(
    (word) =>
      word === state.words[randomIndex] ||
      word === state.extraWords[randomIndex - state.words.length],
  );

  if (alreadyUsed) {
    return resolveUnusedWord(state);
  }

  return (
    state.words[randomIndex] ||
    state.extraWords[randomIndex - state.words.length]
  );
};
