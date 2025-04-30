import React from 'react';
import InfoCard from '../../../InfoCard';
import { VStack } from '@chakra-ui/react';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import { useParams } from 'next/navigation';
import { useGetBMSOccupancyTrendQuery } from '~/lib/redux/services/dashboard/bms.services';

const OccupancyTrend = () => {
  const params = useParams();
  const id = params?.id as unknown as number;
  const { data, isLoading } = useGetBMSOccupancyTrendQuery(
    { facilityId: id },
    { skip: !id }
  );

  return (
    <InfoCard
      title="Occupancy Trend"
      containerStyle={{
        height: 'full',
        spacing: '22px',
        justifyContent: 'space-between',
      }}
    >
      <VStack alignItems="flex-start" spacing="16px" width="full">
        <LineChart
          labels={data?.data?.map((item) => item.month) ?? []}
          datasets={[
            {
              label: 'Occupancy Trend',
              data: data?.data?.map((item) => item.occupancy) ?? [],
              borderColor: '#0366EF',
              pointRadius: 0,
              borderWidth: 1,
              tension: 0.4,
              fill: false,
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

export default OccupancyTrend;
