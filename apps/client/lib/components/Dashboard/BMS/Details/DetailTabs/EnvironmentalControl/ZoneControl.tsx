import React from 'react';
import InfoCard from '../../../InfoCard';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useGetBMSZoneControlQuery } from '~/lib/redux/services/dashboard/bms.services';

const ZoneControl = () => {
  const params = useParams();
  const id = params?.id as unknown as number;
  const { data, isLoading } = useGetBMSZoneControlQuery(
    { facilityId: id },
    { skip: !id }
  );

  const content = [
    {
      title: 'Temperature Set Point',
      color: '#07CC3B',
      value: `${data?.data?.temperatureSetPoint?.value ?? '-'}oC`,
    },
    {
      title: 'Humidity Set Point',
      color: '#F50000',
      value: `${data?.data?.humiditySetPoint?.value ?? '-'}${data?.data?.humiditySetPoint?.key ?? '-'}`,
    },
    {
      title: 'Lighting Level',
      color: '#BBBBBB',
      value: `${data?.data?.lightningLevel ?? '-'}%`,
    },
    {
      title: 'Energy Consumption',
      color: '#EABC30',
      value: `${data?.data?.energyConsumption?.value ?? '-'}${data?.data?.energyConsumption?.key ?? '-'}`,
    },
    {
      title: 'CO Levels',
      color: '#FF7A37',
      value: `${data?.data?.coLevels?.value ?? '-'}${data?.data?.coLevels?.key ?? '-'}`,
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
