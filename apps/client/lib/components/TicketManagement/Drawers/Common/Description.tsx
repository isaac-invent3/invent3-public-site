import { Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface DescriptionProps {
  info: string;
}
const Description = (props: DescriptionProps) => {
  const { info } = props;
  return (
    <VStack width="full" alignItems="flex-start" spacing="8px">
      <Text color="neutral.600" fontWeight={700}>
        Description
      </Text>
      <Text
        width="full"
        bgColor="#F0F0F0"
        color="neutral.700"
        rounded="8px"
        minH="82px"
        pt="8px"
        px="11px"
        pb="11px"
      >
        {info}
      </Text>
    </VStack>
  );
};

export default Description;
