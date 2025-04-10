import React from 'react';
import ChallengeSolutions from '../Common/ChallengeSolutions';

const challengesInfo = [
  {
    title: 'Automated Asset Tracking',
    subtitle:
      'Monitor roadways, bridges, rail assets, stations, and depots in real time.',
  },
  {
    title: 'Predictive Maintenance Alerts',
    subtitle: 'Reduce infrastructure failures and extend asset lifespan.',
  },
  {
    title: 'Regulatory Compliance Management',
    subtitle:
      'Automate safety inspections, incident tracking, and compliance reporting.',
  },
  {
    title: 'Energy & Resource Optimization',
    subtitle:
      'Optimize scheduling, resource allocation, and public service uptime.',
  },
];

const Solutions = () => {
  return (
    <ChallengeSolutions
      items={challengesInfo}
      sectionDescription="Invent3Pro ensures medical facilities operate at peak efficiency with"
    />
  );
};

export default Solutions;
