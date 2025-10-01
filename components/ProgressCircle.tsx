import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

interface ProgressCircleProps {
  progress: number;
  color: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress, color }) => {
  const data = [
    { name: 'progress', value: progress },
    { name: 'remaining', value: 100 - progress },
  ];

  const colors = [color, '#334155']; // slate-700 for the track

  return (
    <div className="w-32 h-32 sm:w-40 sm:h-40 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="100%"
            startAngle={90}
            endAngle={450}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
             <Label
              value={`${Math.round(progress)}%`}
              position="center"
              fill={color}
              className="text-2xl sm:text-3xl font-bold"
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressCircle;
