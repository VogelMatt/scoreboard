import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const BasketballScoreboard = () => {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [time, setTime] = useState(720); // 12 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsRunning(!isRunning);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="bg-black text-white p-8 rounded-xl shadow-2xl transform perspective-1000 rotateX-5 hover:scale-105 transition-transform duration-300 border-4 border-yellow-500">
        <div className="flex justify-between items-center mb-6">
          <div className="text-4xl font-bold">HOME</div>
          <div className="text-4xl font-bold">AWAY</div>
        </div>
        <div className="flex justify-between items-center mb-8">
          <div className="text-7xl font-bold bg-red-600 px-6 py-3 rounded-lg shadow-inner">{homeScore}</div>
          <div className="text-7xl font-bold bg-blue-600 px-6 py-3 rounded-lg shadow-inner">{awayScore}</div>
        </div>
        <div className="flex justify-center items-center mb-6">
          <Clock className="mr-2" size={32} />
          <div className="text-6xl font-bold">{formatTime(time)}</div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={toggleTimer}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => setTime(720)}
          >
            Reset
          </button>
        </div>
        <div className="flex justify-between mt-6">
          <div>
            <button
              className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => setHomeScore(homeScore + 1)}
            >
              +1
            </button>
            <button
              className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
              onClick={() => setHomeScore(Math.max(0, homeScore - 1))}
            >
              -1
            </button>
          </div>
          <div>
            <button
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => setAwayScore(awayScore + 1)}
            >
              +1
            </button>
            <button
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
              onClick={() => setAwayScore(Math.max(0, awayScore - 1))}
            >
              -1
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketballScoreboard;