import { Heading, HStack, Skeleton, Text, VStack } from '@chakra-ui/react';

import { SingleMapAssetData } from '~/lib/interfaces/asset.interfaces';

interface AssetCountListProps {
  type: 'state' | 'lga';
  isLoading: boolean;
  data: Record<string, SingleMapAssetData>;
  currentAssetStatus: 'In Use' | 'Not in Use';
  currentStatType: 'value' | 'count';
}

const AssetCountList = (props: AssetCountListProps) => {
  const { type, isLoading, data, currentAssetStatus, currentStatType } = props;
  return (
    <VStack width="full" spacing="8px" alignItems="flex-start">
      <Heading
        color="primary.500"
        fontWeight={700}
        fontSize="16px"
        lineHeight="19.01px"
      >
        Assets by {type === 'state' ? 'State' : 'LGA'}
      </Heading>
      <VStack width="full" spacing="8px" maxH="50vh" overflow="auto">
        {isLoading
          ? Array(10)
              .fill('')
              .map((_, idx) => (
                <HStack width="full" justifyContent="space-between" key={idx}>
                  <Skeleton width="40%" height="15px" />
                  <Skeleton width="20%" height="15px" />
                </HStack>
              ))
          : Object.entries(data).map(([label, option], index) => {
              let displayData;
              if (currentStatType === 'count') {
                displayData =
                  currentAssetStatus === 'In Use'
                    ? option.assetInUseCount.toLocaleString()
                    : option.assetNoInUseCount.toLocaleString();
              } else {
                displayData =
                  currentAssetStatus === 'In Use'
                    ? option.activeAssetsTotalValue.toLocaleString()
                    : option.assetsNotInUseTotalValue.toLocaleString();
              }

              return (
                <HStack width="full" key={index} justifyContent="space-between">
                  <Text color="neutral.600" size="md">
                    {label}
                  </Text>
                  <Text color="black" fontWeight={800} size="md">
                    {displayData}
                  </Text>
                </HStack>
              );
            })}
      </VStack>
    </VStack>
  );
};

export default AssetCountList;
