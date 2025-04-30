import React from 'react';
import TheAdvantage from '../Common/TheAdvantage';

const advantageInfo = [
  {
    title: 'Reduced Inventory Errors',
    description: 'AI-driven analytics ensure accurate stock levels.',
    image: '/banking-advantage-1.png',
  },
  {
    title: 'Faster Order Fulfillment',
    description: 'Process customer orders with greater speed and accuracy.',
    image: '/banking-advantage-2.png',
  },
  {
    title: 'Loss Prevention Measures',
    description: 'Track asset movement and prevent unauthorized access.',
    image: '/banking-advantage-3.png',
  },
  {
    title: 'Optimized Storage & Logistics',
    description: 'Efficiently manage space, shipments, and stock rotation.',
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
