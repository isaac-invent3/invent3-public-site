import React, { useState } from 'react';
import InfoCard from '../../../InfoCard';
import { Stack, Text, VStack } from '@chakra-ui/react';
import { Option } from '@repo/interfaces';
import CircularProgress from '../../../Common/CircularProgress';
import { useParams } from 'next/navigation';
import { useGetBMSAssetHealthStatusQuery } from '~/lib/redux/services/dashboard/bms.services';

const AssetHealthStatus = () => {
  const params = useParams();
  const id = params?.id as unknown as number;
  const { data, isLoading } = useGetBMSAssetHealthStatusQuery(
    { facilityId: id },
    { skip: !id }
  );
  const [selectedZone, setSelectedZone] = useState<Option | null>(null);
  const content = [
    {
      title: 'Healthy',
      color: '#0A9086',
      percentage: data?.data?.healthy ?? 0,
    },
    {
      title: 'Warning',
      color: '#FD941C',
      percentage: data?.data?.warning ?? 0,
    },
    {
      title: 'Critical',
      color: '#D12E23',
      percentage: data?.data?.critical ?? 0,
    },
  ];
  return (
    <InfoCard
      title="Asset Health Status"
      containerStyle={{
        height: 'full',
        spacing: '59px',
      }}
      options={[
        { label: 'Zone 1', value: 'zone1' },
        { label: 'Zone 2', value: 'zone2' },
      ]}
      selectedTimeRange={selectedZone}
      setSelectedTimeRange={setSelectedZone}
    >
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        alignItems="center"
        justifyContent="center"
        spacing={{ base: '16px', lg: '40px' }}
        width="full"
      >
        {content.map((item, index) => (
          <VStack key={index} spacing="8px">
            <CircularProgress
              size="140px"
              color={item.color}
              progress={item.percentage}
              innerCircleSize="90px"
              showPercentage
            />
            <Text>{item.title}</Text>
          </VStack>
        ))}
      </Stack>
    </InfoCard>
  );
};

export default AssetHealthStatus;
