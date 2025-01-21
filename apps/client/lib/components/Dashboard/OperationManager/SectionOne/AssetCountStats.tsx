import { HStack, Skeleton, StackDivider, Text } from '@chakra-ui/react';

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
    <HStack color={color} spacing="8px">
      <Skeleton isLoaded={!isLoading} minW={isLoading ? '40px' : 'min-content'}>
        <Text fontWeight={800} fontSize="48px" lineHeight="57.02px">
          {value !== undefined ? value.toLocaleString() : '-'}
        </Text>
      </Skeleton>
      <Text size="lg" fontWeight={700}>
        {text1}
        <br />
        {text2}
      </Text>
    </HStack>
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
      px="16px"
      py="27.5px"
      bgColor="white"
      rounded="8px"
    >
      <HStack
        divider={<StackDivider border="1px solid #BBBBBB" />}
        width="full"
        // maxW="620px"
        justifyContent="flex-start"
        spacing="45px"
      >
        {data.map((item, index) => (
          <Stats {...item} key={index} />
        ))}
      </HStack>
    </HStack>
  );
};

export default AssetCountStats;
