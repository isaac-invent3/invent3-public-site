import { HStack, StackDivider, Text } from '@chakra-ui/react';
import React from 'react';

interface StatsProps {
  value: number;
  text1: string;
  text2: string;
  color: string;
}
const Stats = (props: StatsProps) => {
  const { value, text1, text2, color } = props;
  return (
    <HStack color={color} spacing="8px">
      <Text fontWeight={800} fontSize="48px" lineHeight="57.02px">
        {value.toLocaleString()}
      </Text>
      <Text size="lg" fontWeight={700}>
        {text1}
        <br />
        {text2}
      </Text>
    </HStack>
  );
};

const AssetCountStats = () => {
  const data = [
    {
      value: 15,
      text1: 'New',
      text2: 'Assets',
      color: '#009F2A',
    },
    {
      value: 25,
      text1: 'Scheduled',
      text2: 'Maintenance',
      color: '#D67D00',
    },
    {
      value: 12,
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
        justifyContent="space-between"
      >
        {data.map((item, index) => (
          <Stats {...item} key={index} />
        ))}
      </HStack>
    </HStack>
  );
};

export default AssetCountStats;
