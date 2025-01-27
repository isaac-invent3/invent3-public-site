import { VStack } from '@chakra-ui/react';
import React from 'react';
import Header from './Header';
import Module from './Module';

const Permissions = () => {
  return (
    <VStack width="full" spacing={0}>
      <Header />
      <VStack width="full" justifyContent="space-between" bgColor="white">
        {Array(5)
          .fill('')
          .map((_, index) => (
            <Module key={index} />
          ))}
      </VStack>
    </VStack>
  );
};

export default Permissions;
