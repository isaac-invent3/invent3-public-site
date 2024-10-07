import { HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { formatNumberShort } from '~/lib/utils/helperFunctions';

interface StatsProps {
  label: string;
  value: number;
  suffix?: string;
}
const Stats = (props: StatsProps) => {
  const { label, value, suffix } = props;
  return (
    <VStack width="full" alignItems="flex-start" spacing="16px">
      <Text color="neutral.600">{label}</Text>
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
    </VStack>
  );
};

const GeneralStats = () => {
  const data = [
    {
      label: 'Total Schedules',
      value: 20,
    },
    {
      label: 'Total hours',
      value: 54,
      suffix: 'hours',
    },
    {
      label: 'Total cost',
      value: 2400,
      suffix: '₦',
    },
  ];
  return (
    <SimpleGrid
      width="full"
      columns={2}
      rounded="8px"
      bgColor="white"
      px="16px"
      py="24px"
      spacing="16px"
    >
      {data.map((item, index) => (
        <Stats {...item} key={index} />
      ))}
    </SimpleGrid>
  );
};

export default GeneralStats;
