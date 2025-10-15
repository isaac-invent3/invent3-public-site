import React from 'react';
import ChallengeSolutions from '../Common/ChallengeSolutions';

const challengesInfo = [
  {
    title: 'Predictive Maintenance',
    subtitle:
      'AI-driven alerts to prevent machine failures before they happen.',
  },
  {
    title: 'Asset & Inventory Tracking',
    subtitle: 'Real-time visibility of tools, equipment, and materials.',
  },
  {
    title: 'Safety & Compliance Monitoring',
    subtitle: 'Automate inspections and adherence to regulatory requirements.',
  },
  {
    title: 'Energy & Resource Optimization',
    subtitle: 'Reduce waste, manage utilities, and cut operational costs.',
  },
];

const Solutions = () => {
  return (
    <ChallengeSolutions
      items={challengesInfo}
      sectionDescription="Invent3Pro enhances industrial efficiency with"
    />
  );
};

export default Solutions;
