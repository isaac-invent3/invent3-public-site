import React from 'react';
import ChallengeSolutions from '../Common/ChallengeSolutions';

const challengesInfo = [
  {
    title: 'Real-Time Asset Tracking',
    subtitle:
      'Gain visibility into all assets, from IT infrastructure to security systems.',
  },
  {
    title: 'Automated Maintenance Scheduling',
    subtitle:
      'Ensure seamless banking operations by preventing equipment failures.',
  },
  {
    title: 'Compliance & Audit Readiness',
    subtitle:
      'Maintain audit trails for regulatory adherence and risk mitigation.',
  },
  {
    title: 'Cost & Performance Analytics',
    subtitle:
      'Get insights into asset utilization and reduce operational expenses.',
  },
];

const Solutions = () => {
  return (
    <ChallengeSolutions
      items={challengesInfo}
      sectionDescription="Invent3Pro enables financial institutions to automate, track, and manage critical assets and infrastructure with precision"
    />
  );
};

export default Solutions;
