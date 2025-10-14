import { HStack, Progress, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const FactorInfluenceBreakdown = () => {
  const factorsInfo = [
    { label: 'Vibration Variance', color: '#F50000', value: 32 },
    { label: 'Temperature Spike Frequency', color: '#FF881B', value: 25 },
    { label: 'Energy Consumption Deviation', color: '#00A129', value: 18 },
    { label: 'Maintenance Delay', color: '#00A129', value: 15 },
    { label: 'Load Fluctuation', color: '#00A129', value: 10 },
  ];

  return (
    <HStack width="full" py={6}>
      <Text transform="rotate(-90deg)" whiteSpace="nowrap" color="neutral.600">
        Factor Names
      </Text>
      <VStack align="stretch" width="full" spacing={4}>
        {factorsInfo.map((item, index) => (
          <HStack key={index} spacing={4} align="center" width="full">
            <Text minW="170px" fontWeight={400} color="black">
              {item.label}
            </Text>
            <Progress
              value={item.value}
              size="sm"
              flex="1"
              sx={{
                '& > div': {
                  backgroundColor: item.color,
                },
                backgroundColor: '#F2F1F1',
              }}
            />

            <Text color="black" minW="40px" textAlign="right">
              {item.value}%
            </Text>
          </HStack>
        ))}
      </VStack>
    </HStack>
  );
};

export default FactorInfluenceBreakdown;
