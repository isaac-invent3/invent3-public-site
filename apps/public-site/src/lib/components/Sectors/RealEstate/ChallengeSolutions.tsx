import React from 'react';
import ChallengeSolutions from '../Common/ChallengeSolutions';

const challengesInfo = [
  {
    title: 'Automated Maintenance Scheduling',
    subtitle: 'Prevent downtime with AI-driven predictive maintenance.',
  },
  {
    title: 'Comprehensive Asset Tracking',
    subtitle: 'Gain full visibility into property assets and infrastructure.',
  },
  {
    title: 'Energy Optimization Tools',
    subtitle: 'Monitor and control energy consumption for cost savings.',
  },
  {
    title: 'Smart Ticketing System',
    subtitle: ' Manage tenant or employee service requests efficiently.',
  },
];

const Solutions = () => {
  return (
    <ChallengeSolutions
      items={challengesInfo}
      sectionDescription="Invent3Pro enhances real estate and facility management with"
    />
  );
};

export default Solutions;
