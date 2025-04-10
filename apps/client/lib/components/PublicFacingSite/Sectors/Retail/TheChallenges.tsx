import React from 'react';
import TheChallenges from '../Common/TheChallenges';

const challengesInfo = [
  {
    title: 'Inventory Inaccuracies',
    subtitle:
      'Overstocking, stockouts, and misplaced items disrupt operations.',
  },
  {
    title: 'Supply Chain Complexities',
    subtitle: 'Managing deliveries, returns, and storage effectively.',
  },
  {
    title: 'Shrinkage & Theft',
    subtitle: 'Unauthorized asset movement results in financial losses.',
  },
  {
    title: 'Inefficient Order Fulfillment',
    subtitle: 'Slow processing times impact customer satisfaction.',
  },
];

const Challenges = () => {
  return (
    <TheChallenges
      items={challengesInfo}
      sectionDescription="Retailers and warehouses face:"
    />
  );
};

export default Challenges;
