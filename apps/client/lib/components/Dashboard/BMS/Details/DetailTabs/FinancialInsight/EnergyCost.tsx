import React, { useState } from 'react';
import InfoCard from '../../../InfoCard';
import { VStack } from '@chakra-ui/react';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import { Option } from '@repo/interfaces';
import { useParams } from 'next/navigation';
import { useGetBMSEnergyCostTrendQuery } from '~/lib/redux/services/dashboard/bms.services';

const EnergyCost = () => {
  const zones = [
    { label: 'Zone 1', value: 'zone1' },
    { label: 'Zone 2', value: 'zone2' },
  ];
  const [selectedZone, setSelectedZone] = useState<Option | null>(
    zones[0] as Option
  );
  const params = useParams();
  const id = params?.id as unknown as number;
  const { data, isLoading } = useGetBMSEnergyCostTrendQuery(
    { facilityId: id },
    { skip: !id }
  );

  return (
    <InfoCard
      title="Energy Cost"
      containerStyle={{
        height: 'full',
        spacing: '22px',
      }}
      options={zones}
      selectedTimeRange={selectedZone}
      setSelectedTimeRange={setSelectedZone}
    >
      <VStack alignItems="flex-start" spacing="16px" width="full">
        <LineChart
          labels={data?.data?.map((item) => item.month) ?? []}
          datasets={[
            {
              label: 'Energy Cost',
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

export default EnergyCost;
