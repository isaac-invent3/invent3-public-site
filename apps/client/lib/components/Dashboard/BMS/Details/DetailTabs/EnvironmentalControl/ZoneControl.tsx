import React from 'react';
import InfoCard from '../../../InfoCard';
import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';

const ZoneControl = () => {
  const content = [
    {
      title: 'Temperature Set Point',
      color: '#07CC3B',
      value: '22oC',
    },
    {
      title: 'Humidity Set Point',
      color: '#F50000',
      value: '45%RH',
    },
    {
      title: 'Lighting Level',
      color: '#BBBBBB',
      value: '70%',
    },
    {
      title: 'Energy Consumption',
      color: '#EABC30',
      value: '1.2KWh',
    },
    {
      title: 'CO Levels',
      color: '#FF7A37',
      value: '9PPM',
    },
  ];

  return (
    <InfoCard
      title="Zone Control"
      containerStyle={{
        height: 'full',
        spacing: '22px',
      }}
    >
      <VStack spacing="16px" width="full">
        {content.map((item, index) => (
          <HStack spacing="11px" key={index}>
            <Text color="neutral.600">{item.title}</Text>
            <Box width="74px" height="7px" bgColor={item.color} />
            <Text color="neutral.600">{item.value}</Text>
          </HStack>
        ))}
      </VStack>
    </InfoCard>
  );
};

export default ZoneControl;
