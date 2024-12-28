import { create } from "zustand";

export const useGame = create<{
  rounds: number;
  currentRound: number;
  hasStarted: boolean;
  hasFinished: boolean;
  startGame: () => void;
  participants: {
    name: string;
    score: number;
  }[];
  dismissScore: (participant: string) => void;
  increaseScore: (participant: string) => void;
  setRounds: (rounds: number) => void;
  addParticipant: (participant: string) => void;
  removeParticipant: (participantIndex: number) => void;
  advanceRound: () => void;
  getLeaderboard: () => Record<string, number>;
  finishGame: () => void;
}>((set, get) => ({
  hasStarted: false,
  hasFinished: false,
  startGame: () => set({ hasStarted: true }),
  rounds: 0,
  currentRound: 0,
  participants: [],
  setRounds: (rounds: number) => set({ rounds, currentRound: 1 }),
  addParticipant: (participant: string) =>
    set((state) => {
      const alreadyInGame = state.participants.some(
        (p) => p.name === participant,
      );
      
      if (alreadyInGame) {
        return state;
      }

      const newParticipants = [...state.participants, { name: participant, score: 0, missed: 0 }];

      return {
        participants: newParticipants,
      };
    }),
  removeParticipant: (participantIndex) =>
    set((state) => {
      const newParticipants = state
        .participants
        .filter((_, index) => index !== participantIndex);

      return {
        participants: newParticipants
      }
    }),
  advanceRound: () =>
    set((state) => {
      const newRound = state.currentRound + 1;

      if (newRound > state.rounds) {
        get().finishGame();
      }

      return {
        currentRound: newRound,
      };
    }),
  finishGame: () =>
    set({
      hasFinished: true,
    }),
  dismissScore: (participant) =>
    set((state) => {
      const participantIndex = state.participants.findIndex(
        (p) => p.name === participant,
      );

      if (participantIndex === -1) {
        return state;
      }

      const newParticipants = [...state.participants];

      newParticipants[participantIndex] = {
        ...newParticipants[participantIndex],
        score: newParticipants[participantIndex].score - 1,
      };

      return {
        participants: newParticipants,
      };
    }),
  increaseScore: (participant: string) =>
    set((state) => {
      const participantIndex = state.participants.findIndex(
        (p) => p.name === participant,
      );

      if (participantIndex === -1) {
        return state;
      }

      const newParticipants = [...state.participants];

      newParticipants[participantIndex] = {
        ...newParticipants[participantIndex],
        score: newParticipants[participantIndex].score + 1,
      };

      return {
        participants: newParticipants,
      };
    }),
  getLeaderboard: () => {
      const leaderboard: Record<string, number> = {};

      get().participants.forEach(({ name, score }) => {
        leaderboard[name] = score;
      });

      return orderLeaderboard(leaderboard);
    }
}));

const orderLeaderboard = (leaderboard: Record<string, number>): Record<string, number> => {
  return Object.fromEntries(
    Object.entries(leaderboard).sort(([, a], [, b]) => b - a),
  );
}
