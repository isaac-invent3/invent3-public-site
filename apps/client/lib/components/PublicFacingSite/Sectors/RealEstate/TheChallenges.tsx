import React from 'react';
import TheChallenges from '../Common/TheChallenges';

const challengesInfo = [
  {
    title: 'Maintenance Backlogs',
    subtitle: 'Unplanned downtime increases operational costs',
  },
  {
    title: 'Asset Lifecycle Management',
    subtitle: 'Inefficient tracking leads to premature replacements.',
  },
  {
    title: 'Energy Inefficiencies',
    subtitle: 'High operational costs due to poor energy usage monitoring.',
  },
  {
    title: 'Tenant & Occupant Requests',
    subtitle: 'Slow response times impact satisfaction and retention',
  },
];

const Challenges = () => {
  return (
    <TheChallenges
      items={challengesInfo}
      sectionDescription="Facility managers and real estate operators struggle with"
    />
  );
};

export default Challenges;
