import React from 'react';
import TheAdvantage from '../Common/TheAdvantage';

const advantageInfo = [
  {
    title: 'Uninterrupted Patient Care',
    description: 'Proactive maintenance prevents critical equipment failures.',
    image: '/banking-advantage-1.png',
  },
  {
    title: 'Compliance Confidence',
    description: 'Automated documentation for audits and inspections.',
    image: '/banking-advantage-2.png',
  },
  {
    title: 'Operational Cost Reduction',
    description: 'Smarter resource allocation reduces financial strain.',
    image: '/banking-advantage-3.png',
  },
  {
    title: 'Seamless System Integration',
    description:
      'Works with existing hospital management and procurement systems.',
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
