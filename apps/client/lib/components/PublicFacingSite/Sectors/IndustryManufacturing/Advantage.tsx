import React from 'react';
import TheAdvantage from '../Common/TheAdvantage';

const advantageInfo = [
  {
    title: 'Maximized Equipment Uptime',
    description:
      'Optimize asset and facility management with data-driven insights.',
    image: '/banking-advantage-1.png',
  },
  {
    title: 'Smarter Resource Management',
    description: 'Optimize inventory, reducing waste and overstocking.',
    image: '/banking-advantage-2.png',
  },
  {
    title: 'Enhanced Workplace Safety',
    description: 'Eliminate downtime and enhance banking efficiency.',
    image: '/banking-advantage-3.png',
  },
  {
    title: 'Cost-Effective Operations',
    description:
      'Gain real-time analytics to drive smarter financial operations.',
    image: '/banking-advantage-4.png',
  },
];

const Advantage = () => {
  return (
    <TheAdvantage
      items={advantageInfo}
      sectionDescription="Why leading manufacturers choose Invent3Pro"
    />
  );
};

export default Advantage;
