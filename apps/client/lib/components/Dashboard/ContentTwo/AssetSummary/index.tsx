import { HStack, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import AssetSummaryCard from './AssetSummaryCard';
import {
  AssetBoxIcon,
  DowntrendIcon,
  InUseIcon,
  UptrendIcon,
} from '~/lib/components/CustomIcons';

const AssetSummary = () => {
  const valueChange = -5;

  return (
    <VStack width="full" spacing="14px">
      <AssetSummaryCard title="Total Assets" value={108098} icon={AssetBoxIcon}>
        <HStack spacing="4px">
          <HStack
            py="4px"
            px="8px"
            spacing="8px"
            rounded="full"
            bgColor={valueChange < 0 ? '#BA00001A' : '#00A1291A'}
          >
            <Icon
              as={valueChange < 0 ? DowntrendIcon : UptrendIcon}
              boxSize="18px"
              color={valueChange < 0 ? '#BA0000' : '#00A129'}
            />
            <Text color={valueChange < 0 ? '#BA0000' : '#00A129'}>
              {valueChange < 0 && '-'}
              {valueChange > 0 && '+'}
              {valueChange < 0 ? valueChange * -1 : valueChange}%
            </Text>
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
