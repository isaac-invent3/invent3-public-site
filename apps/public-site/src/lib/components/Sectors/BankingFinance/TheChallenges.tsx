import React from 'react';
import TheChallenges from '../Common/TheChallenges';

const challengesInfo = [
  {
    title: 'Regulatory Compliance',
    subtitle: 'Adhering to strict financial and operational regulations.',
  },
  {
    title: 'Security & Risk Management',
    subtitle: 'Protecting high-value assets and preventing operational risks.',
  },
  {
    title: 'Operational Efficiency',
    subtitle:
      'Reducing downtime of critical infrastructure such as ATMs and IT',
  },
  {
    title: 'Cost Optimization',
    subtitle: 'Managing maintenance costs while ensuring asset longevity.',
  },
  {
    title: 'Multi-Branch Coordination',
    subtitle:
      'Streamlining operations across various bank branches and financial offices.',
  },
];

const Challenges = () => {
  return (
    <TheChallenges
      items={challengesInfo}
      sectionDescription="Managing assets and facilities across multiple locations is a major challenge in the banking and finance sector. Institutions need robust solutions to ensure"
    />
  );
};

export default Challenges;
