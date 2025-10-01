import React from 'react';

const TrophyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
    <path d="M4 22h16"></path>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21A3.981 3.981 0 0 1 12 20a3.981 3.981 0 0 1 2.97-1.79c-.5-.23-.97-.66-.97-1.21v-2.34"></path>
    <path d="M12 14.66L15.34 9H8.66L12 14.66z"></path>
    <path d="M12 4v2"></path>
    <path d="M12 2v2"></path>
  </svg>
);

export default TrophyIcon;
