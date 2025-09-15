import { VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';

const VisualTimeline = () => {
  return (
    <VStack width="full" alignItems="flex-start" pb="21px">
      <DetailHeader variant="secondary">Visual Timeline</DetailHeader>
    </VStack>
  );
};

export default VisualTimeline;
