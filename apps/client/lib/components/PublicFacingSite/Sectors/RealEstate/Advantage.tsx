import React from 'react';
import TheAdvantage from '../Common/TheAdvantage';

const advantageInfo = [
  {
    title: 'Reduced Downtime',
    description: 'Predict and prevent maintenance issues before they arise.',
    image: '/banking-advantage-1.png',
  },
  {
    title: 'Optimized Asset Utilization',
    description: 'Extend asset lifespan through data-driven insights.',
    image: '/banking-advantage-2.png',
  },
  {
    title: 'Lower Operational Costs',
    description: 'Improve energy efficiency and reduce wastage.',
    image: '/banking-advantage-3.png',
  },
  {
    title: 'Enhanced Tenant Satisfaction',
    description: 'Streamlined issue resolution and improved service delivery.',
    image: '/banking-advantage-4.png',
  },
];

const Advantage = () => {
  return (
    <TheAdvantage
      items={advantageInfo}
      sectionDescription="Why leading real estate and facility management firms choose Invent3Pro"
    />
  );
};

export default Advantage;
