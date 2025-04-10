import React from 'react';
import TheAdvantage from '../Common/TheAdvantage';

const advantageInfo = [
  {
    title: 'Optimized Workspaces',
    description:
      'Optimize asset and facility management with data-driven insights.',
    image: '/banking-advantage-1.png',
  },
  {
    title: 'Seamless Asset Management',
    description: 'Keep track of office technology and equipment effortlessly.',
    image: '/banking-advantage-2.png',
  },
  {
    title: 'Faster Maintenance Resolution',
    description: 'Eliminate downtime and enhance banking efficiency.',
    image: '/banking-advantage-3.png',
  },
  {
    title: 'Enhanced Security & Compliance',
    description:
      'Gain real-time analytics to drive smarter financial operations.',
    image: '/banking-advantage-4.png',
  },
];

const Advantage = () => {
  return (
    <TheAdvantage
      items={advantageInfo}
      sectionDescription="Why corporate leaders and office managers trust Invent3Pro"
    />
  );
};

export default Advantage;
