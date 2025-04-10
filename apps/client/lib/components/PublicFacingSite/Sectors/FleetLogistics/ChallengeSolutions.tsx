import React from 'react';
import ChallengeSolutions from '../Common/ChallengeSolutions';

const challengesInfo = [
  {
    title: 'Predictive Maintenance',
    subtitle:
      ' Reduce breakdowns and extend vehicle lifespan with automated servicing schedules.',
  },
  {
    title: 'Live Fleet Monitoring',
    subtitle: 'Track vehicles in real-time to improve operational visibility.',
  },
  {
    title: 'Smart Route Optimization',
    subtitle:
      'AI-driven recommendations for the most efficient delivery routes.',
  },
  {
    title: 'Regulatory Compliance Tools',
    subtitle: 'Ensure adherence to safety and emissions regulations.',
  },
];

const Solutions = () => {
  return (
    <ChallengeSolutions
      items={challengesInfo}
      sectionDescription="Invent3Pro delivers powerful automation and real-time tracking capabilities, including"
    />
  );
};

export default Solutions;
