import { HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { MaintenanceScheduleStat } from '~/lib/interfaces/maintenance.interfaces';

interface StatsProps {
  label: string;
  value: number;
  color: string;
  isLoading: boolean;
}
const Stats = (props: StatsProps) => {
  const { label, value, color, isLoading } = props;
  return (
    <VStack width="max-content" alignItems="flex-start" spacing="8px">
      <Text color="neutral.600">{label}</Text>
      <Skeleton isLoaded={!isLoading}>
        <Text
          color={color}
          fontSize="24px"
          lineHeight="28.51px"
          fontWeight={700}
        >
          {value < 10 ? `0${value}` : value?.toLocaleString()}
        </Text>
      </Skeleton>
    </VStack>
  );
};

interface StatusCountProps {
  isLoading: boolean;
  data: MaintenanceScheduleStat;
}

const StatusCount = (props: StatusCountProps) => {
  const { data: info, isLoading } = props;

  const data = [
    {
      label: 'Completed',
      value: info?.completed ?? 0,
      color: '#07CC3B',
    },
    {
      label: 'Pending',
      value: info?.pending ?? 0,
      color: '#0366EF',
    },
    {
      label: 'Missed',
      value: info?.missed ?? 0,
      color: '#F50000',
    },
  ];
  return (
    <HStack
      bgColor="white"
      rounded="8px"
      width="full"
      justifyContent="space-between"
      p="16px"
    >
      {data.map((item, index) => (
        <Stats {...item} key={index} isLoading={isLoading} />
      ))}
    </HStack>
  );
};

export default StatusCount;
