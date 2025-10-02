import { HStack, Skeleton, StackDivider, Text, VStack } from '@chakra-ui/react';

import { useAppSelector } from '~/lib/redux/hooks';

interface StatsProps {
  value: number | undefined;
  text1: string;
  text2: string;
  color: string;
}
const Stats = (props: StatsProps) => {
  const { value, text1, text2, color } = props;
  const { isLoading } = useAppSelector((state) => state.dashboard.info);

  return (
    <VStack color={color} spacing="8px" alignItems="flex-start">
      <Text size={{ base: 'md', md: 'md' }}>
        {text1} {text2}
      </Text>
      <Skeleton isLoaded={!isLoading} minW={isLoading ? '40px' : 'min-content'}>
        <Text
          fontWeight={800}
          fontSize={{ base: '24px', md: '40px' }}
          lineHeight={{ base: '100%' }}
        >
          {value !== undefined ? value?.toLocaleString() : '-'}
        </Text>
      </Skeleton>
    </VStack>
  );
};

const AssetCountStats = () => {
  const { stats } = useAppSelector((state) => state.dashboard.info);
  const data = [
    {
      value: stats?.newAssets,
      text1: 'New',
      text2: 'Assets',
      color: '#009F2A',
    },
    {
      value: stats?.assetsScheduledForMaintenance,
      text1: 'Scheduled',
      text2: 'Maintenance',
      color: '#D67D00',
    },
    {
      value: stats?.disposedAssets,
      text1: 'Total',
      text2: 'Disposed',
      color: '#F50000',
    },
  ];
  return (
    <HStack
      width="full"
      height="full"
      px={{ base: '8px', md: '16px' }}
      pr={{ lg: '32px' }}
      // py="27.5px"
      bgColor="white"
      rounded="8px"
    >
      <HStack
        divider={<StackDivider border="1px solid #BBBBBB" />}
        width="full"
        justifyContent={{ base: 'space-between' }}
        py="16px"
        height="full"
        alignItems="flex-start"
      >
        {data.map((item, index) => (
          <Stats {...item} key={index} />
        ))}
      </HStack>
    </HStack>
  );
};

export default AssetCountStats;
