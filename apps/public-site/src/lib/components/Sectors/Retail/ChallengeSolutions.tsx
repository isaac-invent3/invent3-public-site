import React from 'react';
import ChallengeSolutions from '../Common/ChallengeSolutions';

const challengesInfo = [
  {
    title: 'AI-Powered Inventory Management',
    subtitle: 'Automate stock tracking and demand forecasting.',
  },
  {
    title: 'Smart Asset Tagging',
    subtitle: 'RFID and IoT-enabled tracking prevent misplacement and theft.',
  },
  {
    title: 'Automated Order Processing',
    subtitle: 'Reduce errors and speed up fulfillment.',
  },
  {
    title: 'Supply Chain Visibility',
    subtitle: 'Monitor shipments, storage, and logistics in real time.',
  },
];

const Solutions = () => {
  return (
    <ChallengeSolutions
      items={challengesInfo}
      sectionDescription="Invent3Pro transforms retail and warehousing with"
    />
  );
};

export default Solutions;
