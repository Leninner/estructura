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
    roundsGuessed: number;
  }[];
  dismissScore: (participant: string) => void;
  increaseScore: (participant: string) => void;
  setRounds: (rounds: number) => void;
  addParticipant: (participant: string) => void;
  removeParticipant: (participantIndex: number) => void;
  advanceRound: () => void;
  getLeaderboard: () => Record<string, number>;
  finishGame: () => void;
  getRandomParticipant: () => string;
  allHasParticipateInRound: () => boolean;
  saveUserRoundAttempt: (user: string, attempts: {badAttempts: number, goodAttempts: string[]}) => void;
}>((set, get) => ({
  hasStarted: false,
  hasFinished: false,
  startGame: () => set({ hasStarted: true }),
  saveUserRoundAttempt: (user, attempts) => {
    set((state) => {
      const participantIndex = state.participants.findIndex(
        (p) => p.name === user,
      );

      if (participantIndex === -1) {
        return state;
      }
      const score = attempts.goodAttempts.length - attempts.badAttempts;

      const newParticipants = [...state.participants];

      newParticipants[participantIndex] = {
        ...newParticipants[participantIndex],
        roundsGuessed: newParticipants[participantIndex].roundsGuessed + 1,
        score: newParticipants[participantIndex].score + (score > 0 ? score : 0),
      };

      return {
        participants: newParticipants,
      };
    });
  },
  allHasParticipateInRound: () => get().participants.every(p => p.roundsGuessed >= get().currentRound),
  getRandomParticipant: () => {
    if (get().participants.every(p => p.roundsGuessed >= get().currentRound)) {
      console.log('All participants have already guessed this round, finishing the round...');
      get().advanceRound();
      return get().getRandomParticipant();
    }

    const getParticipant = () => {
      const randomIndex = Math.floor(Math.random() * get().participants.length);
      const name = get().participants[randomIndex].name;

      if (get().participants[randomIndex].roundsGuessed >= get().currentRound) {
        console.log('This participant has already guessed this round, picking another one...');
        return getParticipant();
      }

      return name;
    }

    const participant = getParticipant();

    set((state) => {
      const participantIndex = state.participants.findIndex(
        (p) => p.name === participant,
      );

      const newParticipants = [...state.participants];

      newParticipants[participantIndex] = {
        ...newParticipants[participantIndex],
        roundsGuessed: newParticipants[participantIndex].roundsGuessed + 1,
      };

      return {
        participants: newParticipants,
      };
    });

    return participant;
  },
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

      const newParticipants = [...state.participants, { name: participant, score: 0, missed: 0, roundsGuessed: 0 }];

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

      if(state.currentRound >= state.rounds) {
        alert('The game has finished!');
        get().finishGame();
        return state;
      }

      if(get().participants.every(p => p.roundsGuessed >= state.currentRound)) {
        return {
          currentRound: newRound,
        }
      }

      alert('There are still participants that have not guessed the word, please wait for them to finish.');
      return state;
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
