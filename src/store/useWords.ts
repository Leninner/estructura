import { INITIAL_WORDS } from "../shared/constants";
import { create } from "zustand";
import { WordTree } from "../utils/word-tree";

export const useWords = create<{
  currentSetSize: number;
  wordTree: WordTree;
  extraWords: WordTree;
  pickedWords: string[];
  restart: () => void;
  addExtraWord: (word: string) => void;
  pickWord: () => string;
  removeExtraWord: (word: string) => void;
}>((set, get) => ({
  currentSetSize: INITIAL_WORDS.length,
  wordTree: new WordTree(INITIAL_WORDS),
  extraWords: new WordTree([]),
  pickedWords: [],
  restart: () =>
    set({
      pickedWords: [],
      extraWords: new WordTree([]),
      wordTree: new WordTree(INITIAL_WORDS),
    }),
  addExtraWord: (word: string) =>
    set((state) => {
      const tree = state.extraWords;
      tree.insert(word);
      return { extraWords: tree, currentSetSize: state.currentSetSize + 1 };
    }),
  pickWord: () => {
    const { wordTree, extraWords, pickedWords } = get();

    const word = wordTree.pickRandom() || extraWords.pickRandom();
    if(!word) return 'NO_WORDS';

    set({ pickedWords: [...pickedWords, word] });
    return word;
  },
  removeExtraWord: (word: string) =>
    set((state) => {
      const tree = state.extraWords;
      tree.delete(word);
      return { extraWords: tree, currentSetSize: state.currentSetSize - 1 };
    }),
}));
