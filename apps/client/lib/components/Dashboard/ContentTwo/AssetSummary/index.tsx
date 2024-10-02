import { HStack, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import AssetSummaryCard from './AssetSummaryCard';
import {
  AssetBoxIcon,
  DowntrendIcon,
  InUseIcon,
} from '~/lib/components/CustomIcons';

const AssetSummary = () => {
  return (
    <VStack width="full" spacing="14px">
      <AssetSummaryCard title="Total Assets" value={108098} icon={AssetBoxIcon}>
        <HStack spacing="4px">
          <HStack
            py="4px"
            px="8px"
            spacing="8px"
            rounded="full"
            bgColor="#BA00001A"
          >
            <Icon as={DowntrendIcon} boxSize="18px" />
            <Text color="#BA0000">-10%</Text>
          </HStack>
          <Text color="neutral.600" fontWeight={700}>
            vs Last Year
          </Text>
        </HStack>
      </AssetSummaryCard>
      <AssetSummaryCard
        title="Total Assets in Use"
        value={89098}
        icon={InUseIcon}
      >
        <HStack spacing="4px">
          <Text
            color="#0366EF"
            py="4px"
            px="12px"
            rounded="full"
            bgColor="#0366EF1A"
          >
            12,000
          </Text>

          <Text color="neutral.600" fontWeight={700}>
            vs Assets{' '}
            <Text as="span" color="black" fontWeight={800}>
              NOT
            </Text>{' '}
            is Use
          </Text>
        </HStack>
      </AssetSummaryCard>
    </VStack>
  );
};

export default AssetSummary;
