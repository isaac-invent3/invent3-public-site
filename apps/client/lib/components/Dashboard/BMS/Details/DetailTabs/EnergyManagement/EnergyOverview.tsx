import React from 'react';
import InfoCard from '../../../InfoCard';
import { SimpleGrid } from '@chakra-ui/react';
import SummaryCard from '../../../Common/SummaryCard';
import { useGetBMSEnergyConsumptionQuery } from '~/lib/redux/services/dashboard/bms.services';
import { useParams } from 'next/navigation';

const EnergyOverview = () => {
  const params = useParams();
  const id = params?.id as unknown as number;
  const { data, isLoading } = useGetBMSEnergyConsumptionQuery(
    { facilityId: id },
    { skip: !id }
  );
  const content = [
    {
      title: 'Total Energy Consumption',
      subtitle: 'All zones',
      value: `${data?.data?.totalEnergyConsumption.value ?? '-'}${data?.data?.totalEnergyConsumption.key ?? '-'}`,
      icon: '/adjust.png',
      isLoading: isLoading,
    },
    {
      title: 'Energy Use Intensity',
      subtitle: 'All zones',
      value: `${data?.data?.energyUseIntensity.value ?? '-'}${data?.data?.energyUseIntensity.key ?? '-'}`,
      icon: '/adjust.png',
      isLoading: isLoading,
    },
    {
      title: 'Peak Demand',
      subtitle: 'All zones',
      value: `${data?.data?.peakDemand.value ?? '-'}${data?.data?.peakDemand.key ?? '-'}`,
      icon: '/adjust.png',
      isLoading: isLoading,
    },
    {
      title: 'Real Time Power Usage',
      subtitle: 'All zones',
      value: `${data?.data?.realTimePowerUsage.value ?? '-'}${data?.data?.realTimePowerUsage.key ?? '-'}`,
      icon: '/adjust.png',
      isLoading: isLoading,
    },
  ];
  return (
    <InfoCard
      title="Energy Overview"
      containerStyle={{
        height: 'full',
        spacing: '22px',
      }}
    >
      <SimpleGrid width="full" gap="16px" columns={{ base: 1, sm: 2 }}>
        {content.map((item, index) => (
          <SummaryCard
            {...item}
            key={index}
            containerStyle={{ bgColor: 'white' }}
          />
        ))}
      </SimpleGrid>
    </InfoCard>
  );
};

export default EnergyOverview;
