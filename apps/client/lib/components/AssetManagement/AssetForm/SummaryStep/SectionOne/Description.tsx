import { Text, VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';

const Description = ({ description }: { description: string }) => {
  return (
    <VStack spacing="8px" width="full" alignItems="flex-start">
      <DetailHeader variant="primary">Description</DetailHeader>
      <Text
        fontWeight={500}
        pt="8px"
        pb="12px"
        pl="11px"
        pr="15px"
        rounded="8px"
        bgColor="#F0F0F0"
        color="neutral.700"
        width="full"
      >
        {description}
      </Text>
    </VStack>
  );
};

export default Description;
