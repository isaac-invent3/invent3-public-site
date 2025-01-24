import { HStack } from '@chakra-ui/react';
import React from 'react';
import AttachmentCard from './AttachmentCard';

const Attachments = () => {
  const data = [
    {
      title: 'Profile Photo',
      date: new Date().toISOString(),
    },
    {
      title: 'Certificate',
      date: new Date().toISOString(),
    },
    {
      title: 'Drivers License',
      date: new Date().toISOString(),
    },
  ];
  return (
    <HStack width="full" spacing="24px" wrap="wrap">
      {data.map((item, index) => (
        <AttachmentCard {...item} key={index} />
      ))}
    </HStack>
  );
};

export default Attachments;
