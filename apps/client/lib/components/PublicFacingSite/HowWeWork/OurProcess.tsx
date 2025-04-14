import React from 'react';
import CheckIconKeyPoints from '../Common/CheckIconKeyPoints';

const contents = [
  {
    title: 'Understand & Analyze',
    subtitle: 'Deep dive into your workflows to uncover inefficiencies.',
  },
  {
    title: 'Design & Implement',
    subtitle: 'Tailored solutions that fit seamlessly into your ecosystem.',
  },
  {
    title: 'Optimize & Evolve',
    subtitle: 'Continuous improvements with AI-driven insights.',
  },
];

const OurProcess = () => {
  return <CheckIconKeyPoints items={contents} />;
};

export default OurProcess;
