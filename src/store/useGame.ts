import { create } from "zustand";

export const useGame = create<{
  rounds: number;
  hasStarted: boolean;
  startGame: () => void;
  participants: {
    name: string;
    score: number;
    missed: number;
  }[];
  dismissScore: (participant: string) => void;
  increaseScore: (participant: string) => void;
  setRounds: (rounds: number) => void;
  addParticipant: (participant: string) => void;
  removeParticipant: (participantIndex: number) => void;
  finishRound: () => void;
  getLeaderboard: () => Record<string, number>;
}>((set, get) => ({
  hasStarted: false,
  startGame: () => set({ hasStarted: true }),
  rounds: 0,
  participants: [],
  setRounds: (rounds: number) => set({ rounds }),
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
  finishRound: () =>
    set((state) => {
      const newRounds = state.rounds - 1;

      return {
        rounds: newRounds,
      };
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
        missed: newParticipants[participantIndex].missed + 1,
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
