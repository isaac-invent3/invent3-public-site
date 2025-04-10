import React from 'react';
import TheChallenges from '../Common/TheChallenges';

const challengesInfo = [
  {
    title: 'Inefficient Space Utilization',
    subtitle: 'Underused office spaces lead to wasted costs',
  },
  {
    title: 'Asset Mismanagement',
    subtitle:
      'Tracking office equipment and IT assets manually is prone to errors.',
  },
  {
    title: 'Slow Maintenance Response',
    subtitle: 'Workplace issues remain unresolved due to lack of automation.',
  },
  {
    title: 'Security & Compliance Risks',
    subtitle:
      'Unauthorized access and compliance gaps threaten operational security.',
  },
];

const Challenges = () => {
  return (
    <TheChallenges
      items={challengesInfo}
      sectionDescription="Corporate and office management teams often struggle with"
    />
  );
};

export default Challenges;
