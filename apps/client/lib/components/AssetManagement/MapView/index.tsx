import { Flex, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import MapViewComponent from './Map';
import {
  useGetLGAAssetCountByStateIdQuery,
  useGetStateAssetCountByCountryIdQuery,
} from '~/lib/redux/services/asset/stats.services';
import Stats from './Stats';

interface AssetCountOption {
  assetCount: number;
  stateName?: string;
  lgaName?: string;
}

const generateAssetCountOption = (
  data: AssetCountOption[] | undefined
): Record<string, number> => {
  const options: Record<string, number> = {};

  if (data && Array.isArray(data)) {
    data.forEach((item) => {
      const label = item.lgaName || item.stateName || 'Unknown Location';
      options[label] = item.assetCount;
    });
  }

  return options;
};

const MapView = () => {
  // eslint-disable-next-line no-unused-vars
  const [selectedState, setSelectedState] = useState<{
    name: string;
    id: number;
  } | null>(null);
  const { data: stateAssetCount, isLoading: isLoadingStateAssetCount } =
    useGetStateAssetCountByCountryIdQuery({ id: 1, pageSize: 37 });
  const { data: lgaAssetCount, isLoading: isLoadingLGAAssetCount } =
    useGetLGAAssetCountByStateIdQuery(
      { id: 1, pageSize: 45 },
      { skip: !selectedState }
    );
  const assetLabel = selectedState?.name
    ? `in ${selectedState?.name}`
    : 'Under Management';

  return (
    <Flex width="full" height="70vh" gap="40px" justifyContent="space-between">
      <Flex width="70%" height="full">
        <VStack mt="32px" pl="24px" alignItems="flex-start" spacing="4px">
          <Text
            fontWeight={700}
            size="lg"
            whiteSpace="nowrap"
          >{`Asset ${assetLabel}`}</Text>
          {!selectedState?.id && (
            <Text color="neutral.600" maxW="124px">
              Click on the different region to drill down
            </Text>
          )}
        </VStack>
        {isLoadingLGAAssetCount || isLoadingStateAssetCount ? (
          <Text>Loading...</Text>
        ) : (
          <MapViewComponent
            assetData={generateAssetCountOption(
              selectedState?.id
                ? lgaAssetCount?.data?.items
                : stateAssetCount?.data?.items
            )}
          />
        )}
      </Flex>
      <Flex width="256px" mt="24px" pr="9px">
        <Stats
          isLoading={isLoadingLGAAssetCount || isLoadingStateAssetCount}
          data={generateAssetCountOption(
            selectedState?.id
              ? lgaAssetCount?.data?.items
              : stateAssetCount?.data?.items
          )}
          type={selectedState?.id ? 'lga' : 'state'}
        />
      </Flex>
    </Flex>
  );
};

export default MapView;
