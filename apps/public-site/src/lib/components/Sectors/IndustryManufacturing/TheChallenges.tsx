import React from 'react';
import TheChallenges from '../Common/TheChallenges';

const challengesInfo = [
  {
    title: 'Unplanned Equipment Downtime',
    subtitle: 'Machinery failures disrupt production lines.',
  },
  {
    title: 'Complex Supply Chain & Logistics',
    subtitle:
      'Managing raw materials, tools, and finished products efficiently.',
  },
  {
    title: 'Workplace Safety & Compliance',
    subtitle: 'Ensuring adherence to industry regulations and worker safety.',
  },
  {
    title: 'High Operational Costs',
    subtitle: 'Energy consumption, maintenance, and waste management expenses.',
  },
];

const Challenges = () => {
  return (
    <TheChallenges
      items={challengesInfo}
      sectionDescription="Industrial and manufacturing facilities face"
    />
  );
};

export default Challenges;
