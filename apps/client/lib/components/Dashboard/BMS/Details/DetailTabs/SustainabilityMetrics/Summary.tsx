import { HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import SummaryCard from '../../../Common/SummaryCard';
import { useParams } from 'next/navigation';
import { useGetBMSSustainabilityMetricsQuery } from '~/lib/redux/services/dashboard/bms.services';
import { Option } from '@repo/interfaces';
import DropDown from '~/lib/components/Dashboard/Common/DropDown';
import ProgressIndicator from '~/lib/components/Dashboard/Common/ProgressIndicator';
import { useAppSelector } from '~/lib/redux/hooks';

const Summary = () => {
  const params = useParams();
  const id = params?.id as unknown as number;
  const { selectedBuilding, selectedFloor } = useAppSelector(
    (state) => state.dashboard.info
  );
  const { data, isLoading } = useGetBMSSustainabilityMetricsQuery(
    {
      facilityId: id,
      buildingId: selectedBuilding?.value as number,
      floorId: selectedFloor?.value as number,
    },
    { skip: !id }
  );
  const zoneOptions = [{ label: 'Zone A', value: 'Zone B' }];
  const [selectedTimeRange, setSelectedTimeRange] = useState<Option | null>(
    zoneOptions[0] as Option
  );

  const summaryData = [
    {
      title: 'Energy Efficiency Rating',
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
      children: (
        <VStack alignItems="flex-start">
          <Text fontWeight={800} fontSize="24px" lineHeight="100%">
            {data?.data?.energyEfficiencyRating ?? '-'}
          </Text>
          <Text color="neutral.600" fontWeight={800}>
            Today
          </Text>
        </VStack>
      ),
    },
    {
      title: 'Renewable Energy Utilization',
      subtitle: 'Of All Zones',
      icon: '/money.png',
      children: (
        <VStack alignItems="flex-start" spacing="16px">
          <VStack alignItems="flex-start">
            <Text fontWeight={800} fontSize="24px" lineHeight="100%">
              {data?.data?.recycledWastePercentage
                ? `${data?.data?.recycledWastePercentage}%`
                : '-'}
            </Text>
            <Text color="neutral.600" fontWeight={800}>
              Solar Power
            </Text>
          </VStack>
          <HStack spacing="4px">
            <ProgressIndicator valueChange={0} />
            <Text color="neutral.600" fontWeight={700}>
              Compared to last month
            </Text>
          </HStack>
        </VStack>
      ),
    },
    {
      title: 'Carbon Footprint Reduction',
      subtitle: 'Of All Zones',
      icon: '/money.png',
      children: (
        <VStack alignItems="flex-start">
          <Text fontWeight={800} fontSize="24px" lineHeight="100%">
            {data?.data?.carbonFootprint?.value ?? '-'} kg CO2
          </Text>
          <Text color="neutral.600" fontWeight={800}>
            Saved this month
          </Text>
        </VStack>
      ),
    },
  ];

  return (
    <SimpleGrid width="full" gap="16px" columns={{ base: 1, sm: 2, lg: 3 }}>
      {summaryData.map((item, index) => (
        <SummaryCard
          {...item}
          key={index}
          isLoading={isLoading}
          containerStyle={{ justifyContent: 'space-between', minH: '162px' }}
        />
      ))}
    </SimpleGrid>
  );
};

export default Summary;
