interface WordPlaceholderProps {
	word: string;
	letters: string[];
}

export const WordPlaceholder: React.FC<WordPlaceholderProps> = ({ word, letters }) => {
	const lowerCaseWord = word.toLowerCase();
	const lowerCaseLetters = letters.map((letter) => letter.toLowerCase());

	return (
		<div className="flex gap-4 justify-center items-center">
			{lowerCaseWord.split("").map((letter, index) => (
				<span
					key={index}
					className={`
            text-5xl font-extrabold py-2 px-4 rounded-lg
            ${lowerCaseLetters.includes(letter)
							? 'bg-green-500 text-black border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]'
							: 'bg-white text-black border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]'
						}
          `}
				>
					{lowerCaseLetters.includes(letter) ? letter : '_'}
				</span>
			))}
		</div>
	);
}
