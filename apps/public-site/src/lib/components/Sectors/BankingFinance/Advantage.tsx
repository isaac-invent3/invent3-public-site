import React from 'react';
import TheAdvantage from '../Common/TheAdvantage';

const advantageInfo = [
  {
    title: 'To Be Strategic',
    description:
      'Optimize asset and facility management with data-driven insights.',
    image: '/banking-advantage-1.png',
  },
  {
    title: 'To Increase Profitability',
    description: 'Reduce operational costs and extend asset lifespan.',
    image: '/banking-advantage-2.png',
  },
  {
    title: 'To Maximize Productivity',
    description: 'Eliminate downtime and enhance banking efficiency.',
    image: '/banking-advantage-3.png',
  },
  {
    title: 'To Get Better Insights',
    description:
      'Gain real-time analytics to drive smarter financial operations.',
    image: '/banking-advantage-4.png',
  },
];

const Advantage = () => {
  return (
    <TheAdvantage
      items={advantageInfo}
      sectionDescription="Why leading financial institutions trust Invent3Pro:"
    />
  );
};

export default Advantage;
