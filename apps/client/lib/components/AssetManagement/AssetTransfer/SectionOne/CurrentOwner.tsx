import { VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import User from '../User';

const CurrentOwner = () => {
  return (
    <VStack spacing="16px" alignItems="flex-start" width="full">
      <DetailHeader variant="secondary">Current Owner</DetailHeader>
      <User />
    </VStack>
  );
};

export default CurrentOwner;
