import React from 'react';
import InfoCard from '../../../InfoCard';
import { Flex, HStack, Text, VStack } from '@chakra-ui/react';

const Control = () => {
  return (
    <InfoCard
      title="Envrionmental Control"
      containerStyle={{
        height: 'full',
        spacing: '40px',
      }}
    >
      <HStack width="full" justifyContent="space-between">
        <VStack spacing="26px" alignItems="flex-start">
          <Text
            color="#07CC3B"
            fontSize="40px"
            lineHeight="100%"
            fontWeight={800}
          >
            50%
          </Text>
          <Text fontWeight={800} fontSize="16px" lineHeight="100%">
            CO₂ Levels
          </Text>
        </VStack>
        <VStack spacing="26px" alignItems="flex-start">
          <VStack spacing="8px">
            <Text color="neutral.600" fontSize="16px" lineHeight="24px">
              Humidity
            </Text>
            <Text fontWeight={800} fontSize="24px" lineHeight="100%">
              45%
            </Text>
          </VStack>
          <Text fontWeight={800} fontSize="16px" lineHeight="100%">
            426ppm
          </Text>
        </VStack>
      </HStack>
    </InfoCard>
  );
};

export default Control;
