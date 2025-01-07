import { useState } from "react";
import { useGame } from "../store/useGame";
import { useWords } from "../store/useWords";

export const Lobby = () => {
  const {
    participants,
    setRounds,
    addParticipant,
    removeParticipant,
    startGame,
  } = useGame((state) => state);

  const {
    currentSetSize,
    addExtraWord,
    wordTree,
    extraWords,
    removeExtraWord,
  } = useWords();

  const [roundQuantity, setRoundQuantity] = useState(0);

  const handleAddParticipant = () => {
    const name = prompt("Ingrese el nombre del participante:");

    if (!name) {
      alert("El nombre del participante no puede estar vacío.");
      return;
    }

    if (participants.some((participant) => participant.name === name)) {
      alert("El nombre del participante ya existe.");
      return;
    }

    addParticipant(name);
  };

  const handleAddExtraWords = () => {
    const words = prompt("Ingrese las palabras separadas por coma:");

    if (!words) {
      alert("Las palabras no pueden estar vacías.");
      return;
    }

    const wordsArray = words
      .split(",")
      .map((word) => word.toLowerCase().trim());

    const uniqueWords = [...new Set([...wordsArray]).values()];

    const wordsFiltered = uniqueWords
      .filter(wordsInPredefinedSetFilter)
      .filter(wordsInExtraWordsFilter)
      .filter(wordsWithOneSpaceOnlyFilter)
      .filter(wordsInUnsafeLengthFilter)
      .filter(wordsWithSpecialCharactersFilter);

    if (wordsFiltered.length === 0) {
      alert(
        `No se han añadido palabras válidas. Recuerda que no pueden contener espacios, 
                  caracteres especiales o estar en el set predefinido. Además, deben tener entre 
                  3 y 12 caracteres. No deben repetirste`,
      );
      return;
    }

    let i = currentSetSize;
    wordsFiltered.forEach((word) => {
      if (i >= roundQuantity) return;

      i++;
      addExtraWord(word);
    });
  };

  const wordsInPredefinedSetFilter = (word: string) => {
    return !wordTree.inOrder().includes(word);
  };

  const wordsInExtraWordsFilter = (word: string) => {
    return !extraWords.inOrder().includes(word);
  };

  const wordsWithOneSpaceOnlyFilter = (word: string) => {
    return word.split(" ").length === 2;
  };

  const wordsWithSpecialCharactersFilter = (word: string) => {
    return !/[^a-zA-Z ]/.test(word);
  };

  const wordsInUnsafeLengthFilter = (word: string) => {
    return word.length > 3 && word.length < 12;
  };

  const handleStartGame = () => {
    if (participants.length < 2) {
      alert("Se necesitan al menos 2 participantes para iniciar el juego.");
      return;
    }

    if (roundQuantity < 1) {
      alert("Se necesita al menos una ronda para iniciar el juego.");
      return;
    }

    setRounds(roundQuantity);
    startGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-400 via-yellow-500 to-pink-500 flex items-center justify-center">
      <div className="bg-gradient-to-r from-pink-500 to-orange-400 shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-xl p-8 w-full max-w-2xl border-4 border-black">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-black drop-shadow-[2px_2px_0_rgba(255,255,255,1)] tracking-wide">
          Lobby - Juego de Ahorcado
        </h1>

        <div className="space-y-6">
          <div className="flex items-center justify-between bg-black text-white p-4 rounded-lg shadow-[2px_2px_0_rgba(255,255,255,1)] border-2 border-white">
            <label className="text-white font-bold text-lg flex items-center gap-2">
              <span>Rondas:</span>
              <span className="text-2xl font-extrabold">{roundQuantity}</span>
            </label>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setRoundQuantity((prev) => Math.max(1, prev - 1))
                }
                className="bg-pink-500 text-black px-4 py-2 rounded-lg hover:bg-pink-600 transition transform hover:scale-110 border-2 border-black shadow-[2px_2px_0_rgba(255,255,255,1)]"
              >
                -
              </button>
              <button
                onClick={() => setRoundQuantity((prev) => prev + 1)}
                className="bg-pink-500 text-black px-4 py-2 rounded-lg hover:bg-pink-600 transition transform hover:scale-110 border-2 border-black shadow-[2px_2px_0_rgba(255,255,255,1)]"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-extrabold text-black">
                Participantes ({participants.length}):
              </h2>
              <button
                onClick={handleAddParticipant}
                className="bg-green-500 text-black px-6 py-3 rounded-lg shadow-[2px_2px_0_rgba(255,255,255,1)] border-2 border-black hover:bg-green-600 transition transform hover:scale-110"
              >
                Añadir Participante
              </button>
            </div>

            <ul className="space-y-3 max-h-96 overflow-y-auto">
              {participants.map((participant, index) => (
                <li
                  key={index}
                  className="bg-yellow-500 text-black px-4 py-3 rounded-lg shadow-[2px_2px_0_rgba(255,255,255,1)] flex justify-between items-center border-2 border-black"
                >
                  <span className="font-medium">{participant.name}</span>
                  <button
                    onClick={() => removeParticipant(index)}
                    className="bg-red-500 text-black px-3 py-2 rounded-md shadow-[2px_2px_0_rgba(255,255,255,1)] hover:bg-red-600 transition transform hover:scale-110 border-2 border-black"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            {roundQuantity > currentSetSize && (
              <div>
                <p className="text-black font-bold text-lg mb-4">
                  Por favor, añade {roundQuantity - currentSetSize} palabras
                  adicionales.
                </p>

                <button
                  onClick={handleAddExtraWords}
                  className="bg-blue-500 text-black px-6 py-3 rounded-lg shadow-[2px_2px_0_rgba(255,255,255,1)] border-2 border-black hover:bg-blue-600 transition transform"
                >
                  Añadir Palabras
                </button>
              </div>
            )}

            {extraWords.size() > 0 && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-extrabold text-black">
                    Palabras Adicionales ({extraWords.size()}):
                  </h2>
                </div>

                <ul className="space-y-3 max-h-96 overflow-y-auto">
                  {extraWords.inOrder().map((word, index) => (
                    <li
                      key={index}
                      className="bg-teal-500 text-black px-4 py-3 rounded-lg shadow-[2px_2px_0_rgba(255,255,255,1)] flex justify-between items-center border-2 border-black"
                    >
                      <span className="font-medium">{word}</span>

                      <button
                        onClick={() => removeExtraWord(word)}
                        className="bg-red-500 text-black px-3 py-2 rounded-md shadow-[2px_2px_0_rgba(255,255,255,1)] hover:bg-red-600 transition transform hover:scale-110 border-2 border-black"
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <button
            className="w-full bg-purple-600 text-black px-6 py-3 rounded-lg shadow-[2px_2px_0_rgba(255,255,255,1)] hover:bg-purple-700 transition transform disabled:opacity-50 border-2 border-black"
            onClick={handleStartGame}
            disabled={
              participants.length < 2 ||
              roundQuantity < 1 ||
              roundQuantity > currentSetSize
            }
          >
            Iniciar Juego
          </button>
        </div>
      </div>
    </div>
  );
};
