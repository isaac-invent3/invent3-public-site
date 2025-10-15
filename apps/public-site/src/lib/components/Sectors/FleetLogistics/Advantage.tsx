import React from 'react';
import TheAdvantage from '../Common/TheAdvantage';

const advantageInfo = [
  {
    title: 'Minimized Downtime',
    description: 'Keep vehicles running with predictive servicing.',
    image: '/banking-advantage-1.png',
  },
  {
    title: 'Reduced Fuel Costs',
    description: 'AI-powered route planning optimizes fuel efficiency.',
    image: '/banking-advantage-2.png',
  },
  {
    title: 'Compliance Made Easy',
    description: 'Automated tracking of regulations and maintenance logs.',
    image: '/banking-advantage-3.png',
  },
  {
    title: 'Scalability & Growth',
    description: 'Manage fleet operations efficiently, no matter the size.',
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
