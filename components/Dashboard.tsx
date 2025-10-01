import React from 'react';
import type { LeaderData } from '../types';
import LeaderCard from './LeaderCard';

interface DashboardProps {
  leaders: LeaderData[];
}

const Dashboard: React.FC<DashboardProps> = ({ leaders }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-8">
        {leaders.map((leader) => (
          <LeaderCard key={leader.id} leader={leader} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
