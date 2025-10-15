import React from 'react';
import TheChallenges from '../Common/TheChallenges';

const challengesInfo = [
  {
    title: 'Complex Asset Management',
    subtitle: 'Managing roads, rail networks, terminals, and fleet assets.',
  },
  {
    title: 'Maintenance & Downtime Risks',
    subtitle: 'Preventing disruptions in transportation services',
  },
  {
    title: 'Regulatory Compliance',
    subtitle: 'Meeting safety, environmental, and operational regulations.',
  },
  {
    title: 'Cost Control & Resource Allocation',
    subtitle: 'Optimizing budgets while maintaining infrastructure integrity.',
  },
];

const Challenges = () => {
  return (
    <TheChallenges
      items={challengesInfo}
      sectionDescription="Transportation & public infrastructure operators face"
    />
  );
};

export default Challenges;
