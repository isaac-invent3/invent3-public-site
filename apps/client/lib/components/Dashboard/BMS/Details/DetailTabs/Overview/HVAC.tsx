import React from 'react';
import { Flex, HStack, Stack, Text } from '@chakra-ui/react';
import InfoCard from '../../../InfoCard';
import { useGetBMSHvacOperationalEfficiencyQuery } from '~/lib/redux/services/dashboard/bms.services';
import { useParams } from 'next/navigation';
import ItemDetail from '../../../Common/ItemDetail';

const HVAC = () => {
  const params = useParams();
  const id = params?.id as unknown as number;
  const { data, isLoading } = useGetBMSHvacOperationalEfficiencyQuery(
    { facilityId: id },
    { skip: !id }
  );

  const content = [
    {
      title: 'Average Temperature',
      value: `${data?.data?.averageTemperature ?? '-'}oC`,
      icon: '/thermometer.png',
    },
    {
      title: 'Humidity Levels',
      value: `${data?.data?.humidityLevels?.value ?? '-'}${data?.data?.humidityLevels?.key}`,
      icon: '/humidity.png',
    },
    {
      title: 'kWh / month',
      value: `${data?.data?.energyConsumptionForMonth?.toLocaleString() ?? '-'}`,
      icon: '/air-conditioner.png',
    },
  ];
  return (
    <InfoCard
      title="HVAC"
      containerStyle={{
        minH: { base: '342px', lg: 'full' },
        justifyContent: 'space-between',
      }}
    >
      <Stack
        width="full"
        direction="column"
        mt="19.5px"
        // spacing="84px"
        height="full"
        justifyContent="space-between"
      >
        <HStack spacing="17px">
          <Text
            fontSize="68px"
            lineHeight="100%"
            fontWeight={800}
            color="#00A129"
          >
            {data?.data?.operationalEfficiency ?? '-'}%
          </Text>
          <Text color="neutral.800" fontWeight={800} size="md">
            Operational Efficiency
          </Text>
        </HStack>

        <Flex width="full" justifyContent="center">
          <HStack justifyContent={{ base: '18px', lg: '10px' }}>
            {content.map((item, index) => (
              <ItemDetail {...item} key={index} />
            ))}
          </HStack>
        </Flex>
      </Stack>
    </InfoCard>
  );
};

export default HVAC;
