import { create  } from "zustand";

type Participant = { name: string; roundsGuessed: number, deads: number, guessed: number };

export const useGame = create<{
  rounds: number;
  currentRound: number;
  hasStarted: boolean;
  hasFinished: boolean;
  participants: Participant[];
  startGame: () => void;
  setRounds: (rounds: number) => void;
  addParticipant: (participant: string) => void;
  removeParticipant: (participantIndex: number) => void;
  advanceRound: () => void;
  getLeaderboard: () => Map<string, { deads: number; guessed: number }>;
  finishGame: () => void;
  getRandomParticipant: () => string;
  allHasParticipateInRound: () => boolean;
  saveUserRoundAttempt: (
    user: string,
    won: boolean
  ) => void;
}>((set, get) => ({
  hasStarted: false,
  hasFinished: false,
  rounds: 0,
  currentRound: 1,
  participants: [],
  startGame: () => set({ hasStarted: true }),
  saveUserRoundAttempt: (user, won) => {
    set((state) => {
      const participantIndex = state.participants.findIndex(
        (p) => p.name === user
      );

      if (participantIndex === -1) {
        return state;
      }
      const newParticipants = [...state.participants];

      newParticipants[participantIndex] = {
        ...newParticipants[participantIndex],
        roundsGuessed: newParticipants[participantIndex].roundsGuessed + 1,
        deads: newParticipants[participantIndex].deads + (won ? 0 : 1),
        guessed: newParticipants[participantIndex].guessed + (won ? 1 : 0),
      };

      return {
        participants: newParticipants,
      };
    });
  },
  allHasParticipateInRound: () =>
    get().participants.every((p) => p.roundsGuessed >= get().currentRound),
  getRandomParticipant: () => {
    if (
      get().participants.every((p) => p.roundsGuessed >= get().currentRound)
    ) {
      console.log(
        "All participants have already guessed this round, finishing the round...",
        get().currentRound,
        get().participants
      );
      get().advanceRound();

      return "";
    }

    const getParticipant = () => {
      const randomIndex = Math.floor(Math.random() * get().participants.length);
      const name = get().participants[randomIndex].name;

      // Pick another participant if the current one has already guessed the word
      if (get().participants[randomIndex].roundsGuessed >= get().currentRound) {
        return getParticipant();
      }

      return name;
    };

    return getParticipant();
  },
  setRounds: (rounds: number) => set({ rounds }),
  addParticipant: (participant: string) =>
    set((state) => {
      const alreadyInGame = state.participants.some(
        (p) => p.name === participant
      );

      if (alreadyInGame) {
        return state;
      }

      const newParticipants = [
        ...state.participants,
        { name: participant, roundsGuessed: 0, deads: 0, guessed: 0 },
      ];

      return {
        participants: newParticipants,
      };
    }),
  removeParticipant: (participantIndex) =>
    set((state) => {
      const newParticipants = state.participants.filter(
        (_, index) => index !== participantIndex
      );

      return {
        participants: newParticipants,
      };
    }),
  advanceRound: () =>
    set((state) => {
      const newRound = state.currentRound + 1;

      if (state.currentRound >= state.rounds) {
        console.log("The game has finished!");
        get().finishGame();
        return get();
      }

      if (
        get().participants.every((p) => p.roundsGuessed >= state.currentRound)
      ) {
        return {
          currentRound: newRound,
        };
      }

      alert(
        "There are still participants that have not guessed the word, please wait for them to finish."
      );
      return state;
    }),
  finishGame: () =>
    set({
      hasFinished: true,
    }),
  getLeaderboard: () => {
    const leaderboard = new Map<string, { deads: number; guessed: number; }>();

    // Crear los nodos del grafo
    get().participants.forEach(({ name, deads, guessed }) => {
      leaderboard.set(name, { deads, guessed });
    });

    // Ordenar los nodos por puntuación
    const sortedLeaderboard = orderLeaderboard(leaderboard);

    // Imprimir conexiones del grafo para visualización (opcional)
    console.log("Leaderboard Graph:");
    sortedLeaderboard.forEach((score, name) => {
      console.log(`${name} -> ${score}`);
    });

    return sortedLeaderboard;
  },
}));

const orderLeaderboard = (
  leaderboard: Map<string, { deads: number; guessed: number }>
): Map<string, { deads: number; guessed: number }> => {
  return new Map(
    [...leaderboard.entries()].sort((a, b) => {
      if (a[1].guessed === b[1].guessed) {
        return a[1].deads - b[1].deads;
      }

      return b[1].guessed - a[1].guessed;
    })
  );
};
