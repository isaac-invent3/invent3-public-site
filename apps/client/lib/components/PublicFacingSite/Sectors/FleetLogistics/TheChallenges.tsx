import React from 'react';
import TheChallenges from '../Common/TheChallenges';

const challengesInfo = [
  {
    title: 'Fleet  Downtime',
    subtitle: 'Unexpected vehicle breakdowns cause delays and financial losses',
  },
  {
    title: 'Inefficient Route Planning',
    subtitle:
      'Poor route optimization leads to fuel wastage and delivery inefficiencies.',
  },
  {
    title: 'Compliance & Safety Risks',
    subtitle:
      'Failing to meet regulatory requirements can result in fines and penalties.',
  },
  {
    title: 'High Maintenance Costs',
    subtitle: 'Reactive maintenance leads to excessive repair expenses.',
  },
];

const Challenges = () => {
  return (
    <TheChallenges
      items={challengesInfo}
      sectionDescription="Logistics and fleet management professionals face:"
    />
  );
};

export default Challenges;
