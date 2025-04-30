import React from 'react';
import TheAdvantage from '../Common/TheAdvantage';

const advantageInfo = [
  {
    title: 'Maximized Equipment Uptime',
    description: 'Preventive maintenance keeps production running smoothly.',
    image: '/banking-advantage-1.png',
  },
  {
    title: 'Smarter Resource Management',
    description: 'Optimize inventory, reducing waste and overstocking.',
    image: '/banking-advantage-2.png',
  },
  {
    title: 'Enhanced Workplace Safety',
    description: 'Digital inspections and compliance tracking minimize risks.',
    image: '/banking-advantage-3.png',
  },
  {
    title: 'Cost-Effective Operations',
    description: 'Streamlined workflows and automation lower expenses.',
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
