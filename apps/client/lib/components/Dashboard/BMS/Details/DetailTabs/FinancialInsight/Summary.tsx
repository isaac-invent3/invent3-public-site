import { HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import SummaryCard from '../../../Common/SummaryCard';
import { useParams } from 'next/navigation';
import { useGetBMSFinancialInsightsOverviewQuery } from '~/lib/redux/services/dashboard/bms.services';
import { amountFormatter } from '~/lib/utils/Formatters';
import { Option } from '@repo/interfaces';
import DropDown from '~/lib/components/Dashboard/Common/DropDown';
import AIContainer from '../../../Common/AIContainer';

const Summary = () => {
  const params = useParams();
  const id = params?.id as unknown as number;
  const { data, isLoading } = useGetBMSFinancialInsightsOverviewQuery(
    { facilityId: id },
    { skip: !id }
  );
  const zoneOptions = [{ label: 'Zone A', value: 'Zone B' }];
  const [selectedTimeRange, setSelectedTimeRange] = useState<Option | null>(
    zoneOptions[0] as Option
  );

  const summaryData = [
    {
      title: 'Energy Cost Savings',
      value: data?.data?.energyCostSavingsByQuarter
        ? (amountFormatter(
            data?.data?.energyCostSavingsByQuarter
          ) as unknown as string)
        : '-',
      subtitle: 'Saved this quarter',
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
      title: 'Maintenance Cost vs. Operational Cost',
      subtitle: 'Of All Zones',
      icon: '/money.png',
      children: (
        <VStack alignItems="flex-start" spacing="16px" mt="40px">
          <HStack width="full" justifyContent="space-between">
            <VStack alignItems="flex-start">
              <Text fontWeight={800} fontSize="24px" lineHeight="100%">
                {data?.data?.maintenanceCost
                  ? amountFormatter(data?.data?.maintenanceCost)
                  : '-'}
              </Text>
              <Text color="neutral.600" fontWeight={800}>
                Maintenance Cost
              </Text>
            </VStack>
            <Text
              color="neutral.800"
              fontWeight={800}
              fontSize="16px"
              lineHeight="100%"
            >
              VS.
            </Text>
            <VStack alignItems="flex-start">
              <Text fontWeight={800} fontSize="24px" lineHeight="100%">
                {data?.data?.operationalConst
                  ? amountFormatter(data?.data?.operationalConst)
                  : '-'}
              </Text>
              <Text color="neutral.600" fontWeight={800}>
                Operational Cost
              </Text>
            </VStack>
          </HStack>
          <Text fontWeight={700} color="neutral.600">
            This Month
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
          containerStyle={{ justifyContent: 'space-between' }}
        />
      ))}
      <AIContainer title="Forecasted Savings from Optimizations">
        <VStack spacing="8px" alignItems="flex-start" mt="22px">
          {' '}
          <VStack spacing="4px" alignItems="flex-start">
            <Text fontSize="24px" lineHeight="100%" fontWeight={800}>
              {data?.data?.projectedAnnualSavings
                ? amountFormatter(data?.data?.projectedAnnualSavings)
                : '-'}
            </Text>
            <Text size="md" color="neutral.600">
              Projected annual savings
            </Text>
          </VStack>
          <Text color="neutral.600" size="md">
            For all zones
          </Text>
        </VStack>
      </AIContainer>
    </SimpleGrid>
  );
};

export default Summary;
