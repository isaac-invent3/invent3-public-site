import { HStack, SimpleGrid, Skeleton, Text, VStack } from '@chakra-ui/react';

import { MaintenanceScheduleStat } from '~/lib/interfaces/maintenance.interfaces';
import { formatNumberShort } from '~/lib/utils/helperFunctions';

interface StatsProps {
  label: string;
  value: number;
  suffix?: string;
  isLoading: boolean;
}
const Stats = (props: StatsProps) => {
  const { label, value, suffix, isLoading } = props;
  return (
    <VStack width="full" alignItems="flex-start" spacing="16px">
      <Text color="neutral.600">{label}</Text>
      <Skeleton isLoaded={!isLoading}>
        <HStack spacing="3px" alignItems="flex-end">
          <Text
            color="primary.500"
            fontSize="32px"
            lineHeight="38.02px"
            fontWeight={800}
          >
            {formatNumberShort(value)}
          </Text>
          {suffix && (
            <Text mb="4px" color="neutral.600">
              {suffix}
            </Text>
          )}
        </HStack>
      </Skeleton>
    </VStack>
  );
};

interface GeneralStatsProps {
  isLoading: boolean;
  data: MaintenanceScheduleStat | undefined;
}
const GeneralStats = (props: GeneralStatsProps) => {
  const { data: info, isLoading } = props;

  const data = [
    {
      label: 'Total Schedules',
      value: info?.totalSchedules ?? 0,
    },
    {
      label: 'Total hours',
      value: info?.totalHours ?? 0,
      suffix: 'hours',
    },
    {
      label: 'Total cost',
      value: info?.totalCost ?? 0,
      suffix: '₦',
    },
  ];
  return (
    <SimpleGrid
      width="full"
      columns={{ base: 1, md: 2 }}
      rounded="8px"
      bgColor="white"
      px="16px"
      py="24px"
      spacing="16px"
    >
      {data.map((item, index) => (
        <Stats {...item} key={index} isLoading={isLoading} />
      ))}
    </SimpleGrid>
  );
};

export default GeneralStats;
