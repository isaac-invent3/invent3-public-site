import React, { useState } from 'react';
import { HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import SummaryCard from '../../../Common/SummaryCard';
import { useParams } from 'next/navigation';
import { useGetBMSEnvironmentalControlOverviewQuery } from '~/lib/redux/services/dashboard/bms.services';
import { timeRangeOptions } from '~/lib/utils/constants';
import { Option } from '@repo/interfaces';
import DropDown from '~/lib/components/Dashboard/Common/DropDown';

const Summary = () => {
  const params = useParams();
  const id = params?.id as unknown as number;
  const { data, isLoading } = useGetBMSEnvironmentalControlOverviewQuery(
    { facilityId: id },
    { skip: !id }
  );

  const zoneOptions = [{ label: 'Zone A', value: 'Zone B' }];
  const [selectedTimeRange, setSelectedTimeRange] = useState<Option | null>(
    zoneOptions[0] as Option
  );

  const content = [
    {
      title: 'Indoor Air Quality',
      subtitle: 'All zones',
      value: data?.data?.currentTemperature ?? '-',
      isLoading: isLoading,
      additionalTitle: '2nd Floor',
      children: (
        <HStack width="full" justifyContent="space-between" mt="45px">
          <VStack alignItems="flex-start">
            <Text fontWeight={800} fontSize="24px" lineHeight="100%">
              32 µg/m³
            </Text>
            <Text color="primary.accent">PM2.5</Text>
          </VStack>
          <VStack alignItems="flex-start">
            <Text fontWeight={800} fontSize="24px" lineHeight="100%">
              420 ppm
            </Text>
            <Text color="primary.accent">CO2</Text>
          </VStack>
        </HStack>
      ),
    },
    {
      title: 'Temperature',
      subtitle: 'Zone 1',
      value: `${data?.data?.coLevel.value ?? '-'}${data?.data?.coLevel.key ?? '-'}`,
      icon: '/adjust.png',
      isLoading: isLoading,
      rightSideElement: (
        <DropDown
          options={zoneOptions}
          label="Timeline"
          handleClick={(option) => setSelectedTimeRange(option)}
          selectedOptions={selectedTimeRange}
          width="80px"
          containerStyles={{ bgColor: 'neutral.300', rounded: '8px' }}
          labelStyles={{ bgColor: 'neutral.300', color: 'black' }}
          selectedOptionStyles={{ color: 'black' }}
        />
      ),
    },
    {
      title: 'Humidity',
      value: `${data?.data?.airQuality.value ?? '-'}${data?.data?.airQuality.key ?? '-'}`,
      icon: '/adjust.png',
      isLoading: isLoading,
      additionalTitle: '2nd Floor',
    },
  ];
  return (
    <SimpleGrid width="full" gap="16px" columns={{ base: 1, md: 2, lg: 4 }}>
      {content.map((item, index) => (
        <SummaryCard
          {...item}
          key={index}
          containerStyle={{ justifyContent: 'space-between' }}
        />
      ))}
      <SummaryCard
        title="HVAC System Status"
        rightSideElement={
          <DropDown
            options={zoneOptions}
            label="Timeline"
            handleClick={(option) => setSelectedTimeRange(option)}
            selectedOptions={selectedTimeRange}
            width="80px"
            containerStyles={{ bgColor: 'neutral.300', rounded: '8px' }}
            labelStyles={{ bgColor: 'neutral.300', color: 'black' }}
            selectedOptionStyles={{ color: 'black' }}
          />
        }
      >
        <VStack alignItems="flex-start" spacing="20px" mt="14px">
          <Text
            fontWeight={800}
            fontSize="32px"
            lineHeight="100%"
            color="#019A2A"
          >
            Operational
          </Text>
          <Text
            color="black"
            fontSize="24px"
            fontWeight={800}
            lineHeight="100%"
          >
            92%{' '}
            <Text as="span" color="neutral.800" fontWeight={800} size="md">
              Efficiency
            </Text>
          </Text>
        </VStack>
      </SummaryCard>
    </SimpleGrid>
  );
};

export default Summary;
