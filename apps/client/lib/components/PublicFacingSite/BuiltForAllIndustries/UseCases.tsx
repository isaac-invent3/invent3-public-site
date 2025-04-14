import React from 'react';
import CheckIconKeyPoints from '../Common/CheckIconKeyPoints';

const contents = [
  {
    title: 'Optimize supply chains and logistics',
  },
  {
    title: 'Reduce maintenance costs in manufacturing',
  },
  {
    title: 'Improve asset tracking in corporate offices',
  },
  {
    title: 'Ensure compliance in healthcare facilities',
  },
];

const UseCases = () => {
  return <CheckIconKeyPoints items={contents} />;
};

export default UseCases;
