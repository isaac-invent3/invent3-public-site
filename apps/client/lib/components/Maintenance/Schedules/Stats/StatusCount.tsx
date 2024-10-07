import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface StatsProps {
  label: string;
  value: number;
  color: string;
}
const Stats = (props: StatsProps) => {
  const { label, value, color } = props;
  return (
    <VStack width="max-content" alignItems="flex-start" spacing="8px">
      <Text color="neutral.600">{label}</Text>
      <Text color={color} fontSize="24px" lineHeight="28.51px" fontWeight={700}>
        {value < 10 ? `0${value}` : value.toLocaleString()}
      </Text>
    </VStack>
  );
};

const StatusCount = () => {
  const data = [
    {
      label: 'Completed',
      value: 3,
      color: '#07CC3B',
    },
    {
      label: 'Pending',
      value: 2,
      color: '#0366EF',
    },
    {
      label: 'Missed',
      value: 1,
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
        <Stats {...item} key={index} />
      ))}
    </HStack>
  );
};

export default StatusCount;
