import React from 'react';
import TheAdvantage from '../Common/TheAdvantage';

const advantageInfo = [
  {
    title: 'Reduced Downtime',
    description:
      'Optimize asset and facility management with data-driven insights.',
    image: '/banking-advantage-1.png',
  },
  {
    title: 'Optimized Asset Utilization',
    description: 'Extend asset lifespan through data-driven insights.',
    image: '/banking-advantage-2.png',
  },
  {
    title: 'Lower Operational Costs',
    description: 'Eliminate downtime and enhance banking efficiency.',
    image: '/banking-advantage-3.png',
  },
  {
    title: 'Enhanced Tenant Satisfaction',
    description:
      'Gain real-time analytics to drive smarter financial operations.',
    image: '/banking-advantage-4.png',
  },
];

const Advantage = () => {
  return (
    <TheAdvantage
      items={advantageInfo}
      sectionDescription="Why leading real estate and facility management firms choose Invent3Pro"
    />
  );
};

export default Advantage;
