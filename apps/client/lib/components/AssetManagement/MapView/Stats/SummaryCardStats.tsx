import { Flex, HStack, Icon, Skeleton, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { AssetIcon } from '~/lib/components/CustomIcons';

interface SummaryCardProps {
  iconColor: string;
  label: string;
  bgColor: string;
  value: string;
  isLoading: boolean;
}

const SummaryCard = (props: SummaryCardProps) => {
  const { iconColor, label, bgColor, value, isLoading } = props;

  return (
    <HStack
      width="full"
      rounded="8px"
      py="12px"
      px="8px"
      justifyContent="space-between"
      bgColor="white"
      position="relative"
    >
      <Flex
        position="absolute"
        top={0}
        bottom={0}
        left={0}
        right={0}
        bgColor={bgColor}
      />
      <HStack spacing="8px">
        <Icon as={AssetIcon} boxSize="21px" color={iconColor} />
        <Text color="neutral.600" width="full">
          {label}
        </Text>
      </HStack>
      <Skeleton isLoaded={!isLoading}>
        <Text color="primary.500" size="lg" fontWeight={700}>
          {value}
        </Text>
      </Skeleton>
    </HStack>
  );
};

interface SummaryCardStatsProps {
  isLoading: boolean;
}
const SummaryCardStats = (props: SummaryCardStatsProps) => {
  const { isLoading } = props;
  const assetSummaryStats = [
    {
      iconColor: '#07CC3B',
      label: 'Assets in Use',
      bgColor: '#07CC3B0D',
      value: '92,890',
    },
    {
      iconColor: '#EABC30',
      label: 'Assets not in Use',
      bgColor: '#EABC300D',
      value: '16,280',
    },
  ];

  return (
    <VStack width="full" spacing="8px">
      {assetSummaryStats.map((item, index) => (
        <SummaryCard {...item} key={index} isLoading={isLoading} />
      ))}
    </VStack>
  );
};

export default SummaryCardStats;
