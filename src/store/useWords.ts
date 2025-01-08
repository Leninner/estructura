import { INITIAL_WORDS } from "../shared/constants";
import { create } from "zustand";
import { WordTree } from "../utils/word-tree";

export const useWords = create<{
  currentSetSize: number;
  wordTree: WordTree;
  extraWords: WordTree;
  pickedWords: { user: string; word: string }[];
  restart: () => void;
  addExtraWord: (word: string) => void;
  pickWord: (user: string, currentWord: string) => string;
  removeExtraWord: (word: string) => void;
  mergeExtraWords: () => void;
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
  mergeExtraWords: () =>
    set((state) => {
      const words = state.extraWords.inOrder();
      const newTree = new WordTree([...state.wordTree.inOrder(), ...words]);
      return { wordTree: newTree, extraWords: new WordTree([]) };
    }),
  pickWord: (user: string, currentWord: string) => {
    if (!user) {
      return "";
    }
    
    const { wordTree, pickedWords } = get();
    const word = wordTree.pickRandom();

    if (!word) {
      throw new Error("No more words available");
    }

    if (word.toLowerCase() === currentWord.toLowerCase()) {
      return get().pickWord(user, currentWord);
    }

    if (
      pickedWords.some(
        (pickedWord) => pickedWord.word === word && pickedWord.user === user
      )
    ) {
      return get().pickWord(user, currentWord);
    }

    set({ pickedWords: [...pickedWords, { user, word }] });

    return word;
  },
  removeExtraWord: (word: string) =>
    set((state) => {
      const tree = state.extraWords;
      tree.delete(word);
      return { extraWords: tree, currentSetSize: state.currentSetSize - 1 };
    }),
}));
