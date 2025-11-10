import { VStack } from '@chakra-ui/react';
import React from 'react';
import Impact from './Impact';
import Suggestions from './Suggestions';

const Recommendations = () => {
  return (
    <VStack
      width="full"
      spacing="56px"
      alignItems="flex-start"
      p={{ base: 4, lg: 6 }}
    >
      <Impact />
      <Suggestions />
    </VStack>
  );
};

export default Recommendations;
