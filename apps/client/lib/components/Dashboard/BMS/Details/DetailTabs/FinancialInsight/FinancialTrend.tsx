import React, { useState } from 'react';
import InfoCard from '../../../InfoCard';
import { VStack } from '@chakra-ui/react';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import { Option } from '@repo/interfaces';
import { useParams } from 'next/navigation';
import { useGetBMSFinancialTrendQuery } from '~/lib/redux/services/dashboard/bms.services';
import { timeRangeOptions } from '~/lib/utils/constants';
import { generateLastFiveYears } from '~/lib/utils/helperFunctions';
import { useAppSelector } from '~/lib/redux/hooks';

const FinancialTrend = () => {
  const [selectedYear, setSelectedYear] = useState<Option | null>(
    generateLastFiveYears()[0] as Option
  );
  const params = useParams();
  const id = params?.id as unknown as number;
  const { selectedBuilding, selectedFloor } = useAppSelector(
    (state) => state.dashboard.info
  );
  const { data, isLoading } = useGetBMSFinancialTrendQuery(
    {
      facilityId: id,
      buildingId: selectedBuilding?.value as number,
      floorId: selectedFloor?.value as number,
      year: +selectedYear?.value!,
    },
    { skip: !id }
  );
  return (
    <InfoCard
      title="Financial Trend"
      containerStyle={{
        height: 'full',
        spacing: '22px',
      }}
      options={timeRangeOptions}
      selectedTimeRange={selectedYear}
      setSelectedTimeRange={setSelectedYear}
    >
      <VStack alignItems="flex-start" spacing="16px" width="full">
        <LineChart
          labels={data?.data?.map((item) => item.monthName) ?? []}
          datasets={[
            {
              label: 'Financial Trend',
              data: data?.data?.map((item) => item.totalEnergyCost) ?? [],
              borderColor: '#0366EF',
              pointRadius: 2,
              borderWidth: 2,
              tension: 0.4,
              fill: false,
              pointBorderWidth: 4,
              pointBorderColor: '#EABC30',
            },
          ]}
          isLoading={isLoading}
          showXGrid={false}
          showYGrid={true}
        />
      </VStack>
    </InfoCard>
  );
};

export default FinancialTrend;
