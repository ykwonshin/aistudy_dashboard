import type React from 'react';

export interface LeaderData {
  id: string;
  name: string;
  description: string;
  current: number;
  target: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}
