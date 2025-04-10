import React from 'react';
import TheAdvantage from '../Common/TheAdvantage';

const advantageInfo = [
  {
    title: 'Minimized Downtime',
    description:
      'Optimize asset and facility management with data-driven insights.',
    image: '/banking-advantage-1.png',
  },
  {
    title: 'Reduced Fuel Costs',
    description: 'AI-powered route planning optimizes fuel efficiency.',
    image: '/banking-advantage-2.png',
  },
  {
    title: 'Compliance Made Easy',
    description: 'Eliminate downtime and enhance banking efficiency.',
    image: '/banking-advantage-3.png',
  },
  {
    title: 'Scalability & Growth',
    description:
      'Gain real-time analytics to drive smarter financial operations.',
    image: '/banking-advantage-4.png',
  },
];

const Advantage = () => {
  return (
    <TheAdvantage
      items={advantageInfo}
      sectionDescription="Why logistics and fleet companies rely on Invent3Pro"
    />
  );
};

export default Advantage;
