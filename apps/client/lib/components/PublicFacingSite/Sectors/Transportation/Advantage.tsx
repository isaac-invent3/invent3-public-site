import React from 'react';
import TheAdvantage from '../Common/TheAdvantage';

const advantageInfo = [
  {
    title: 'Improved Public Service Delivery',
    description:
      'Optimize asset and facility management with data-driven insights.',
    image: '/banking-advantage-1.png',
  },
  {
    title: 'Proactive Maintenance',
    description: 'Reduce operational costs and extend asset lifespan.',
    image: '/banking-advantage-2.png',
  },
  {
    title: 'Cost-Effective Operations',
    description: 'Eliminate downtime and enhance banking efficiency.',
    image: '/banking-advantage-3.png',
  },
  {
    title: 'Seamless Integrations',
    description:
      'Gain real-time analytics to drive smarter financial operations.',
    image: '/banking-advantage-4.png',
  },
];

const Advantage = () => {
  return (
    <TheAdvantage
      items={advantageInfo}
      sectionDescription="Why top transportation and infrastructure operators choose Invent3Pro"
    />
  );
};

export default Advantage;
