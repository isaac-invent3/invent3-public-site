import React from 'react';
import TheAdvantage from '../Common/TheAdvantage';

const advantageInfo = [
  {
    title: 'Improved Public Service Delivery',
    description: 'Reduce downtime and ensure seamless transportation services.',
    image: '/banking-advantage-1.png',
  },
  {
    title: 'Proactive Maintenance',
    description: 'AI-driven predictions prevent failures before they happen.',
    image: '/banking-advantage-2.png',
  },
  {
    title: 'Cost-Effective Operations',
    description: 'Maximize budget efficiency with data-driven decision-making.',
    image: '/banking-advantage-3.png',
  },
  {
    title: 'Seamless Integrations',
    description:
      'Connects with existing transport and infrastructure management systems.',
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
