import React from 'react';
import TheAdvantage from '../Common/TheAdvantage';

const advantageInfo = [
  {
    title: 'Compliance Confidence',
    description:
      'Optimize asset and facility management with data-driven insights.',
    image: '/banking-advantage-1.png',
  },
  {
    title: 'Uninterrupted Patient Care',
    description: 'Reduce operational costs and extend asset lifespan.',
    image: '/banking-advantage-2.png',
  },
  {
    title: 'Operational Cost Reduction',
    description: 'Eliminate downtime and enhance banking efficiency.',
    image: '/banking-advantage-3.png',
  },
  {
    title: 'Seamless System Integration',
    description: 'Automated documentation for audits and inspections.',
    image: '/banking-advantage-4.png',
  },
];

const Advantage = () => {
  return (
    <TheAdvantage
      items={advantageInfo}
      sectionDescription="Why leading healthcare facilities trust Invent3Pro"
    />
  );
};

export default Advantage;
