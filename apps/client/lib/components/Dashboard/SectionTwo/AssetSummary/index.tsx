import { HStack, Icon, Skeleton, Text, VStack } from '@chakra-ui/react';

import AssetSummaryCard from './AssetSummaryCard';
import {
  AssetBoxIcon,
  DowntrendIcon,
  InUseIcon,
  UptrendIcon,
} from '~/lib/components/CustomIcons';
import { useAppSelector } from '~/lib/redux/hooks';

const AssetSummary = () => {
  const { stats, isLoading } = useAppSelector((state) => state.dashboard.info);

  const valueChange = stats?.totalAssetsPercentageChange ?? 0;

  return (
    <VStack width="full" spacing="14px">
      <AssetSummaryCard
        title="Total Assets"
        value={stats?.totalAssets}
        icon={AssetBoxIcon}
      >
        {valueChange !== 0 && (
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
        )}
      </AssetSummaryCard>
      <AssetSummaryCard
        title="Total Assets in Use"
        value={stats?.activeAssets}
        icon={InUseIcon}
      >
        <HStack spacing="4px">
          <Skeleton isLoaded={!isLoading}>
            <Text
              color="#0366EF"
              py="4px"
              px="12px"
              rounded="full"
              bgColor="#0366EF1A"
            >
              {stats?.assetsNotInUse.toLocaleString()}
            </Text>
          </Skeleton>
          <Text color="neutral.600" fontWeight={700}>
            Assets{' '}
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
