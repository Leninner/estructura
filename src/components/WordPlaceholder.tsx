interface WordPlaceholderProps {
  word: string;
  letters: string[];
}

export const WordPlaceholder: React.FC<WordPlaceholderProps> = ({
  word,
  letters,
}) => {
  const lowerCaseWord = word.toLowerCase();
  const lowerCaseLetters = letters.map((letter) => letter.toLowerCase());

  return (
    <div className="flex gap-4 justify-center items-center">
      {lowerCaseWord.split("").map((char, index) => (
        <span
          key={index}
          className={`
            text-5xl font-extrabold py-2 px-4 rounded-lg
            ${char === " "
              ? "bg-transparent text-transparent border-none shadow-none"
              : lowerCaseLetters.includes(char)
                ? "bg-green-500 text-black border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]"
                : "bg-white text-black border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]"
            }
          `}
        >
          {char === " "
            ? "\u00A0"
            : lowerCaseLetters.includes(char)
              ? char
              : "_"}
        </span>
      ))}
    </div>
  );
};
