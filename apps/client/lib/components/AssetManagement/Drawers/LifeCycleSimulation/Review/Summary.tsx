import { SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { formatNumberShort } from '~/lib/utils/helperFunctions';

const Summary = () => {
  const data = [
    {
      label: 'Planned Replacement Year',
      value: 2032,
    },
    {
      label: 'Projected Lifecycle Cost',
      value: `₦${formatNumberShort(42000000)}`,
    },
    {
      label: 'Residual Value',
      value: `₦${formatNumberShort(8000000)}`,
    },
  ];
  return (
    <SimpleGrid
      width="full"
      gap={{ base: 4, lg: 8 }}
      columns={{ base: 1, md: 3 }}
    >
      {data?.map((item, index) => (
        <VStack
          width="full"
          p={4}
          pb="44px"
          rounded="8px"
          border="1px solid #BBBBBB"
          key={index}
          alignItems="flex-start"
          spacing={4}
        >
          <Text size="md" color="neutral.600">
            {item.label}
          </Text>
          <Text fontSize="40px" fontWeight={800} color="primary.500">
            {item.value}
          </Text>
        </VStack>
      ))}
    </SimpleGrid>
  );
};

export default Summary;
