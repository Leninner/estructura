interface Player {
	name: string;
	score: number;
}

interface LeaderboardListProps {
	leaderboard: Player[];
}

export const LeaderboardList: React.FC<LeaderboardListProps> = ({ leaderboard }) => {
	return (
		<div className="p-6 space-y-4">
			{leaderboard.map((player, index) => (
				<div key={index} className="bg-white shadow-md rounded-lg p-6 mb-4 w-full max-w-md mx-auto">
					<div className="flex justify-between items-center">
						<div className="text-lg font-semibold text-gray-800">{player.name}</div>
						<div className="text-xl font-bold text-green-600">{player.score} pts</div>
					</div>
					<div className="mt-2 h-1 bg-gray-300 rounded-full"></div>
				</div>
			))}
		</div>
	);
};
