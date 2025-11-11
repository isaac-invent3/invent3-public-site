import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const RiskLegends = () => {
  const legendItems = [
    {
      label: 'High',
      color: '#F50000',
    },
    {
      label: 'Medium',
      color: '#FF7A37',
    },
    {
      label: 'Low',
      color: '#0366EF',
    },
  ];

  return (
    <VStack
      width="full"
      p={2}
      alignItems="flex-start"
      spacing="16px"
      bgColor="white"
      rounded="8px"
    >
      <Heading fontSize="20px" fontWeight={800} lineHeight="100%" color="black">
        Risk Legend
      </Heading>
      <HStack spacing="5px">
        {legendItems.map((item, index) => (
          <HStack spacing={2} p={2} key={index}>
            <Box
              rounded="2px"
              width="12px"
              height="12px"
              bgColor={item.color}
            />
            <Text color="neutral.600" size="md">
              {item.label}
            </Text>
          </HStack>
        ))}
      </HStack>
    </VStack>
  );
};

export default RiskLegends;
