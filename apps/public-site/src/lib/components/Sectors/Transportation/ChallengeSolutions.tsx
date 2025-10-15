import React from 'react';
import ChallengeSolutions from '../Common/ChallengeSolutions';

const challengesInfo = [
  {
    title: 'Comprehensive Asset Tracking',
    subtitle:
      'Monitor roadways, bridges, rail assets, stations, and depots in real time.',
  },
  {
    title: 'Predictive & Preventive Maintenance',
    subtitle: 'Reduce infrastructure failures and extend asset lifespan.',
  },
  {
    title: 'Regulatory Compliance Assurance',
    subtitle:
      'Automate safety inspections, incident tracking, and compliance reporting.',
  },
  {
    title: 'Operational Insights & Analytics',
    subtitle:
      'Optimize scheduling, resource allocation, and public service uptime.',
  },
];

const Solutions = () => {
  return (
    <ChallengeSolutions
      items={challengesInfo}
      sectionDescription="Invent3Pro provides an AI-driven approach to managing transportation assets and public infrastructure"
    />
  );
};

export default Solutions;
