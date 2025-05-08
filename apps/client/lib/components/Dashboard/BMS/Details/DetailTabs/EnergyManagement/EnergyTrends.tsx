import React, { useState } from 'react';
import InfoCard from '../../../InfoCard';
import { VStack } from '@chakra-ui/react';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import ChartLegend from '~/lib/components/Dashboard/Common/Charts/ChartLegend';
import { useParams } from 'next/navigation';
import { useGetBMSEnergyTrendsQuery } from '~/lib/redux/services/dashboard/bms.services';
import { Option } from '@repo/interfaces';
import { timeRangeOptions } from '~/lib/utils/constants';

const EnergyTrends = () => {
  const params = useParams();
  const id = params?.id as unknown as number;
  const { data, isLoading } = useGetBMSEnergyTrendsQuery(
    { facilityId: id },
    { skip: !id }
  );
  const [selectedTimeRange, setSelectedTimeRange] = useState<Option | null>(
    timeRangeOptions[1] as Option
  );
  return (
    <InfoCard
      title="Peak vs. Off-Peak Usage"
      containerStyle={{
        height: 'full',
        spacing: '22px',
      }}
      selectedTimeRange={selectedTimeRange}
      setSelectedTimeRange={setSelectedTimeRange}
    >
      <VStack alignItems="flex-start" spacing="16px" width="full">
        <ChartLegend
          chartLegendItems={[
            { label: 'Peak Demand', color: '#17A1FA' },
            { label: 'Off Peak Demand', color: '#EABC30' },
          ]}
          containerStyle={{
            spacing: '16px',
            mt: '13px',
            direction: 'column',
          }}
          textStyle={{
            whiteSpace: 'nowrap',
          }}
        />
        <LineChart
          labels={data?.data?.map((item) => item.month) ?? []}
          datasets={[
            {
              label: 'Total Energy Consumption',
              data:
                data?.data?.map((item) => item.totalEnergyConsumption) ?? [],
              borderColor: '#17A1FA',
              pointRadius: 0,
              borderWidth: 2,
              tension: 0.4,
              fill: false,
            },
            {
              label: 'Peak Demand',
              data: data?.data?.map((item) => item.peakDemand) ?? [],
              borderColor: '#EABC30',
              borderDash: [8, 4],
              pointRadius: 0,
              fill: false,
              tension: 0.4,
              borderWidth: 2,
            },
          ]}
          isLoading={isLoading}
          showXGrid={false}
          showYGrid={false}
        />
      </VStack>
    </InfoCard>
  );
};

export default EnergyTrends;
