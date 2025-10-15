import React from 'react';
import ChallengeSolutions from '../Common/ChallengeSolutions';

const challengesInfo = [
  {
    title: 'Smart Space Utilization Tools',
    subtitle: 'Optimize desk allocation and meeting room bookings.',
  },
  {
    title: 'Automated Asset Tracking',
    subtitle: 'Manage IT and office equipment in real time.',
  },
  {
    title: 'Maintenance Automation',
    subtitle: 'Prevent disruptions with proactive issue resolution.',
  },
  {
    title: 'Security & Access Control',
    subtitle: 'Monitor and control access across office locations.',
  },
];

const Solutions = () => {
  return (
    <ChallengeSolutions
      items={challengesInfo}
      sectionDescription="Invent3Pro helps corporate offices maintain efficiency with"
    />
  );
};

export default Solutions;
