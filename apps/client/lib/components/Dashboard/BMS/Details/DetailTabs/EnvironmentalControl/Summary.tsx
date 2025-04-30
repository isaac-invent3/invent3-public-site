import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import SummaryCard from '../../../Common/SummaryCard';
import { useParams } from 'next/navigation';
import { useGetBMSEnvironmentalControlOverviewQuery } from '~/lib/redux/services/dashboard/bms.services';

const Summary = () => {
  const params = useParams();
  const id = params?.id as unknown as number;
  const { data, isLoading } = useGetBMSEnvironmentalControlOverviewQuery(
    { facilityId: id },
    { skip: !id }
  );

  const content = [
    {
      title: 'Current Temperature',
      subtitle: 'All zones',
      value: data?.data?.currentTemperature ?? '-',
      icon: '/adjust.png',
      isLoading: isLoading,
    },
    {
      title: 'Humidity',
      subtitle: 'All zones',
      value: `${data?.data?.airQuality.value ?? '-'}${data?.data?.airQuality.key ?? '-'}`,
      icon: '/adjust.png',
      isLoading: isLoading,
    },
    {
      title: 'COs Level',
      subtitle: 'All zones',
      value: `${data?.data?.coLevel.value ?? '-'}${data?.data?.coLevel.key ?? '-'}`,
      icon: '/adjust.png',
      isLoading: isLoading,
    },
  ];
  return (
    <SimpleGrid width="full" gap="16px" columns={{ base: 1, md: 3 }}>
      {content.map((item, index) => (
        <SummaryCard {...item} key={index} />
      ))}
    </SimpleGrid>
  );
};

export default Summary;
