import React, { useState, useEffect } from "react";
import { Clock, AlertTriangle } from "lucide-react";

const BasketballScoreboard = () => {
	const [homeScore, setHomeScore] = useState(0);
	const [awayScore, setAwayScore] = useState(0);
	const [time, setTime] = useState(720); // 12 minutes in seconds
	const [shotClock, setShotClock] = useState(24);
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		let interval;
		if (isRunning) {
			interval = setInterval(() => {
				setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
				setShotClock((prevClock) => (prevClock > 0 ? prevClock - 1 : 0));
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [isRunning]);

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs
			.toString()
			.padStart(2, "0")}`;
	};

	const toggleTimer = () => setIsRunning(!isRunning);
	const resetShotClock = () => setShotClock(24);

	return (
		<div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-700">
			<div className="relative bg-gradient-to-br from-gray-800 to-gray-900 text-white p-12 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.7)] transform perspective-1000 rotateX-5 hover:scale-105 transition-transform duration-300 border-8 border-yellow-500 overflow-hidden">
				{/* Corrugated metal texture */}
				<div
					className="absolute inset-0 opacity-20"
					style={{
						backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.1) 10px,
            rgba(255, 255, 255, 0.1) 20px
          )`,
					}}
				></div>
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent transform -skew-y-12"></div>
				<div className="relative z-10">
					<div className="flex justify-between items-center mb-8">
						<div className="text-5xl font-bold text-red-500 transform hover:scale-110 transition-transform duration-300 shadow-red-500/50 shadow-lg">
							HOME
						</div>
						<div className="text-5xl font-bold text-blue-500 transform hover:scale-110 transition-transform duration-300 shadow-blue-500/50 shadow-lg">
							AWAY
						</div>
					</div>
					<div className="flex justify-between items-center mb-10">
						<div className="text-8xl font-bold bg-gradient-to-b from-red-600 to-red-800 px-8 py-4 rounded-lg shadow-inner shadow-red-900/50 transform hover:scale-105 transition-transform duration-300">
							{homeScore}
						</div>
						<div className="text-8xl font-bold bg-gradient-to-b from-blue-600 to-blue-800 px-8 py-4 rounded-lg shadow-inner shadow-blue-900/50 transform hover:scale-105 transition-transform duration-300">
							{awayScore}
						</div>
					</div>
					<div className="flex justify-center items-center mb-8">
						<Clock className="mr-4 text-yellow-500" size={48} />
						<div
							className="text-7xl font-bold text-yellow-400"
							style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
						>
							{formatTime(time)}
						</div>
					</div>
					<div className="flex justify-center items-center mb-8">
						<div className="relative w-32 h-32 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/50 transform hover:scale-105 transition-transform duration-300">
							<div className="text-5xl font-bold">{shotClock}</div>
							<svg
								className="absolute top-0 left-0 w-full h-full"
								viewBox="0 0 100 100"
							>
								<circle
									cx="50"
									cy="50"
									r="45"
									fill="none"
									stroke="#fff"
									strokeWidth="10"
									strokeDasharray="283"
									strokeDashoffset={283 - (283 * shotClock) / 24}
									transform="rotate(-90 50 50)"
								/>
							</svg>
							{shotClock <= 5 && (
								<AlertTriangle
									className="absolute top-1 right-1 text-red-500 animate-pulse"
									size={24}
								/>
							)}
						</div>
					</div>
					<div className="flex justify-center space-x-6 mb-6">
						<button
							className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-green-500/50 transform hover:scale-105 transition-transform duration-300"
							onClick={toggleTimer}
						>
							{isRunning ? "Pause" : "Start"}
						</button>
						<button
							className="bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-red-500/50 transform hover:scale-105 transition-transform duration-300"
							onClick={() => {
								setTime(720);
								setShotClock(24);
								setIsRunning(false);
							}}
						>
							Reset Game
						</button>
						<button
							className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-yellow-500/50 transform hover:scale-105 transition-transform duration-300"
							onClick={resetShotClock}
						>
							Reset Shot Clock
						</button>
					</div>
					<div className="flex justify-between">
						<div>
							<button
								className="bg-gradient-to-r from-red-700 to-red-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-red-700/50 transform hover:scale-105 transition-transform duration-300 mr-4"
								onClick={() => setHomeScore(homeScore + 1)}
							>
								+1
							</button>
							<button
								className="bg-gradient-to-r from-red-700 to-red-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-red-700/50 transform hover:scale-105 transition-transform duration-300"
								onClick={() => setHomeScore(Math.max(0, homeScore - 1))}
							>
								-1
							</button>
						</div>
						<div>
							<button
								className="bg-gradient-to-r from-blue-700 to-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-blue-700/50 transform hover:scale-105 transition-transform duration-300 mr-4"
								onClick={() => setAwayScore(awayScore + 1)}
							>
								+1
							</button>
							<button
								className="bg-gradient-to-r from-blue-700 to-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-blue-700/50 transform hover:scale-105 transition-transform duration-300"
								onClick={() => setAwayScore(Math.max(0, awayScore - 1))}
							>
								-1
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BasketballScoreboard;
