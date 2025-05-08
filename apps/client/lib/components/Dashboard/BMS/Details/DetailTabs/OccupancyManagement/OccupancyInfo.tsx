import { Box, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface OccupancyInfoProps {
  occupancyData: { label: string; color: string; value: number }[];
}
const OccupancyInfo = ({ occupancyData }: OccupancyInfoProps) => {
  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      spacing={{ base: '16px', xl: '54px' }}
      flexWrap="wrap"
    >
      {occupancyData.map((item, index) => (
        <VStack spacing="19px" key={index} alignItems="flex-start">
          <HStack spacing="8px">
            <Box width="9px" height="9px" bgColor={item.color} />
            <Text color="primary.accent" size="md">
              {item.label}
            </Text>
          </HStack>
          <VStack alignItems="flex-start" spacing="4px">
            <Text fontWeight={800} fontSize="24px">
              {item.value}
            </Text>
            <Text color="neutral.600">Current Occupant</Text>
            <Text fontWeight={700} mt="7px">
              out of 28 available
            </Text>
          </VStack>
        </VStack>
      ))}
    </Stack>
  );
};

export default OccupancyInfo;
