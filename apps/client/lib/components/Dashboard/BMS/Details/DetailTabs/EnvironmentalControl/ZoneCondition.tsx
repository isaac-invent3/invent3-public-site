import { SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Option } from '@repo/interfaces';
import React, { useState } from 'react';
import InfoCard from '../../../InfoCard';
import ItemDetail from '../../../Common/ItemDetail';

const content1 = [
  {
    title: 'Temperature Set Point',
    value: '220C',
    icon: '/thermometer.png',
  },
  {
    title: 'Humidity Set Point',
    value: '45%RH',
    icon: '/humidity.png',
  },
];
const content2 = [
  {
    title: 'Lighting Level',
    value: '30,000',
    icon: '/air-conditioner.png',
  },
  {
    title: 'CO2 Levels',
    value: '9PPM',
    icon: '/air-conditioner.png',
  },
  {
    title: 'Energy Consumption',
    value: '1.2kWh',
    icon: '/air-conditioner.png',
  },
];

const ZoneCondition = () => {
  const zoneOptions = [
    { label: 'Zone 1', value: 'zone1' },
    { label: 'Zone 2', value: 'zone2' },
  ];
  const [selectedZone, setSelectedZone] = useState<Option | null>(
    zoneOptions[0] as Option
  );
  return (
    <InfoCard
      title="Standard Zone Condition"
      containerStyle={{
        height: 'full',
        spacing: '22px',
      }}
      extraHeader={
        <Text color="neutral.600" fontSize="9px" fontWeight={700}>
          The predefined values that indicate optimal conditions for this room’s
          environment.
        </Text>
      }
      options={zoneOptions}
      selectedTimeRange={selectedZone}
      setSelectedTimeRange={setSelectedZone}
    >
      <VStack width="full" spacing="24px">
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={{ base: '4px', lg: '8px' }}
        >
          {content1.map((item, index) => (
            <ItemDetail
              {...item}
              key={index}
              valueStyle={{ fontSize: '16px' }}
            />
          ))}
        </SimpleGrid>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={{ base: '4px', lg: '8px' }}
        >
          {content2.map((item, index) => (
            <ItemDetail
              {...item}
              key={index}
              valueStyle={{ fontSize: '16px' }}
            />
          ))}
        </SimpleGrid>
      </VStack>
    </InfoCard>
  );
};

export default ZoneCondition;
