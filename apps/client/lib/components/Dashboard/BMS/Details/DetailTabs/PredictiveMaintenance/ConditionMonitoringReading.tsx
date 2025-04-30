import React, { useState } from 'react';
import InfoCard from '../../../InfoCard';
import { VStack } from '@chakra-ui/react';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import ChartLegend from '~/lib/components/Dashboard/Common/Charts/ChartLegend';
import { Option } from '@repo/interfaces';
import { useParams } from 'next/navigation';
import { useGetBMSConditionReadingsQuery } from '~/lib/redux/services/dashboard/bms.services';

const ConditionMonitoringReadings = () => {
  const params = useParams();
  const id = params?.id as unknown as number;
  const { data, isLoading } = useGetBMSConditionReadingsQuery(
    { facilityId: id },
    { skip: !id }
  );
  const zones = [
    { label: 'Zone 1', value: 'zone1' },
    { label: 'Zone 2', value: 'zone2' },
  ];
  const [selectedZone, setSelectedZone] = useState<Option | null>(
    zones[0] as Option
  );

  return (
    <InfoCard
      title="Condition Monitoring Readings"
      containerStyle={{
        height: 'full',
        spacing: '22px',
      }}
      options={zones}
      selectedTimeRange={selectedZone}
      setSelectedTimeRange={setSelectedZone}
    >
      <VStack alignItems="flex-start" spacing="16px" width="full">
        <ChartLegend
          chartLegendItems={[
            { label: 'Total Energy Consumption', color: '#07CC3B' },
            { label: 'Peak Demand', color: '#EABC30' },
            { label: 'Max Demand', color: '#F50000' },
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
              data: data?.data?.map((item) => item.good) ?? [],
              borderColor: '#07CC3B',
              pointRadius: 0,
              borderWidth: 2,
              tension: 0.4,
              fill: false,
            },
            {
              label: 'Peak Demand',
              data: data?.data?.map((item) => item.bad) ?? [],
              borderColor: '#EABC30',
              pointRadius: 0,
              fill: false,
              tension: 0.4,
              borderWidth: 2,
            },
            {
              label: 'Max Demand',
              data: data?.data?.map((item) => item.warning) ?? [],
              borderColor: '#F50000',
              pointRadius: 0,
              fill: false,
              tension: 0.4,
              borderWidth: 2,
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

export default ConditionMonitoringReadings;
