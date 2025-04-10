import React from 'react';
import TheAdvantage from '../Common/TheAdvantage';

const advantageInfo = [
  {
    title: 'Reduced Inventory Errors',
    description:
      'Optimize asset and facility management with data-driven insights.',
    image: '/banking-advantage-1.png',
  },
  {
    title: 'Faster Order Fulfillment',
    description: 'Process customer orders with greater speed and accuracy.',
    image: '/banking-advantage-2.png',
  },
  {
    title: 'Loss Prevention Measures',
    description: 'Eliminate downtime and enhance banking efficiency.',
    image: '/banking-advantage-3.png',
  },
  {
    title: 'Optimized Storage & Logistics',
    description:
      'Gain real-time analytics to drive smarter financial operations.',
    image: '/banking-advantage-4.png',
  },
];

const Advantage = () => {
  return (
    <TheAdvantage
      items={advantageInfo}
      sectionDescription="Why top retailers and warehouse operators choose Invent3Pro"
    />
  );
};

export default Advantage;
