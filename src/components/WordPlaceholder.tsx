interface WordPlaceholderProps {
	word: string;
	letters: string[];
}

export const WordPlaceholder: React.FC<WordPlaceholderProps> = ({ word, letters }) => {
	const lowerCaseWord = word.toLowerCase();
	const lowerCaseLetters = letters.map((letter) => letter.toLowerCase());

	return (
		<div className="flex space-x-4 justify-center items-center">
			{lowerCaseWord.split("").map((letter, index) => (
				<span
					key={index}
					className={`text-5xl font-semibold ${lowerCaseLetters.includes(letter) ? 'text-green-600 bg-yellow-100 border-2 border-green-600 shadow-md' : 'text-gray-300 bg-gray-200 border-2 border-gray-400 shadow-sm'} py-2 px-4 rounded-md tracking-wider`}
				>
					{lowerCaseLetters.includes(letter) ? letter : '_'}
				</span>
			))}
		</div>
	);
}
