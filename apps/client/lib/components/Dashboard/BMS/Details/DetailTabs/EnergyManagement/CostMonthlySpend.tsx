import React, { useState } from 'react';
import InfoCard from '../../../InfoCard';
import { Option } from '@repo/interfaces';
import { timeRangeOptions } from '~/lib/utils/constants';
import { HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { DowntrendIcon, UptrendIcon } from '~/lib/components/CustomIcons';
import { useParams } from 'next/navigation';
import { useGetBMSMonthlyCostSpendQuery } from '~/lib/redux/services/dashboard/bms.services';
import { amountFormatter } from '~/lib/utils/Formatters';
import { useAppSelector } from '~/lib/redux/hooks';

const CostMonthlySpend = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<Option | null>(
    timeRangeOptions[1] as Option
  );
  const params = useParams();
  const id = params?.id as unknown as number;
  const { selectedBuilding, selectedFloor } = useAppSelector(
    (state) => state.dashboard.info
  );
  const { data, isLoading } = useGetBMSMonthlyCostSpendQuery(
    {
      facilityId: id,
      buildingId: selectedBuilding?.value as number,
      floorId: selectedFloor?.value as number,
    },
    { skip: !id }
  );
  return (
    <InfoCard
      title="Cost & Monthly Spend"
      containerStyle={{
        height: 'full',
        spacing: '56px',
      }}
      selectedTimeRange={selectedTimeRange}
      setSelectedTimeRange={setSelectedTimeRange}
    >
      <VStack alignItems="flex-start" spacing="31px" width="full">
        <VStack spacing="8px" alignItems="flex-start">
          <HStack spacing="6px">
            <Text fontSize="24px" fontWeight={800} color="black">
              {data?.data?.totalMonthlyEnergySpend
                ? amountFormatter(data?.data?.totalMonthlyEnergySpend)
                : '-'}
            </Text>
            <HStack spacing="8px">
              <Icon
                as={
                  data?.data?.percentageChange &&
                  data?.data?.percentageChange >= 0
                    ? UptrendIcon
                    : DowntrendIcon
                }
                boxSize="16px"
                color="#F50000"
              />
              <Text color="#F50000">{data?.data?.percentageChange}%</Text>
            </HStack>
          </HStack>
          <Text color="primary.accent">Total Monthly Energy Spend</Text>
        </VStack>
        <VStack spacing="8px">
          <Text fontWeight={800} color="black">
            {data?.data?.costPerKWh
              ? amountFormatter(data?.data?.costPerKWh)
              : '-'}{' '}
            per kWh
          </Text>
          <Text color="primary.accent">Cost per kWh</Text>
        </VStack>
      </VStack>
    </InfoCard>
  );
};

export default CostMonthlySpend;
