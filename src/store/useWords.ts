import { INITIAL_WORDS } from "../shared/constants";
import { create } from "zustand";

export const useWords = create<{
  words: string[];
  extraWords: string[];
  pickedWords: string[];
  restart: () => void;
  addExtraWord: (word: string) => void;
  pickWord: () => string;
}>((set, get) => ({
  words: INITIAL_WORDS,
  extraWords: [],
  pickedWords: [],
  restart: () => set({ pickedWords: [], extraWords: [] }),
  addExtraWord: (word: string) =>
    set((state) => ({ extraWords: [...state.extraWords, word] })),
  pickWord: () => {
    const word = resolveUnusedWord([...get().extraWords, ...get().words]);

    set((state) => ({
      pickedWords: [...state.pickedWords, word],
    }));
    
    return word;
  },
}));

const generateRandomIndex = (size: number): number => {
  return Math.floor(Math.random() * size);
};

const resolveUnusedWord = (words: string[], extraWords: string[] = [], pickedWords = []): string => {
  const randomIndex = generateRandomIndex(
    words.length + extraWords.length,
  );

  const alreadyUsed = pickedWords.find(
    (word) =>
      word === words[randomIndex] ||
      word === extraWords[randomIndex - words.length],
  );

  if (alreadyUsed) {
    return resolveUnusedWord(words, extraWords);
  }

  return (
    words[randomIndex] ||
    extraWords[randomIndex - words.length] || ""
  );
};
