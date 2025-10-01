import React from 'react';
import type { LeaderData } from '../types';
import ProgressCircle from './ProgressCircle';
import TrophyIcon from './icons/TrophyIcon';

interface LeaderCardProps {
  leader: LeaderData;
}

const LeaderCard: React.FC<LeaderCardProps> = ({ leader }) => {
  const progress = Math.min(Math.floor((leader.current / leader.target) * 100), 100);
  const isCompleted = leader.current >= leader.target;

  const progressColorClass = isCompleted ? 'text-green-400' : 'text-cyan-400';
  const progressCircleColor = isCompleted ? '#4ade80' : '#22d3ee';
  const bgColorClass = isCompleted ? 'bg-green-400' : 'bg-cyan-400';

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl shadow-slate-900/50 border border-slate-700 hover:border-cyan-500 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-6">
        <div className="flex-shrink-0 mb-4 sm:mb-0">
          <ProgressCircle progress={progress} color={progressCircleColor} />
        </div>
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-grow w-full">
          <div className="flex items-center gap-3 mb-2">
            <leader.icon className="w-8 h-8 text-slate-400" />
            <h2 className="text-2xl font-bold text-white">{leader.name}</h2>
          </div>
          <p className="text-slate-400 mb-4">{leader.description}</p>
          <div className="w-full bg-slate-700 rounded-full h-2.5 mb-2">
            <div
              className={`h-2.5 rounded-full transition-all duration-500 ${bgColorClass}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between w-full text-lg font-semibold mb-4">
            <span className={progressColorClass}>{leader.current}</span>
            <span className="text-slate-500">/ {leader.target}</span>
          </div>
          {isCompleted ? (
            <div className="flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full font-bold text-lg">
              <TrophyIcon className="w-6 h-6" />
              <span>미션 달성!</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full font-bold text-lg">
              <span>진행중...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderCard;
