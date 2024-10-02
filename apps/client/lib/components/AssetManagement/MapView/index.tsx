import { Flex, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import MapViewComponent from './Map';
import {
  useGetLGAAssetCountByStateIdQuery,
  useGetStateAssetCountByCountryIdQuery,
} from '~/lib/redux/services/asset/stats.services';
import Stats from './Stats';
import { MapAssetData } from '~/lib/interfaces/general.interfaces';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import LoadingSpinner from './Map/LoadingSpinner';

interface AssetCountOption {
  assetCount: number;
  stateName?: string;
  lgaName?: string;
  stateId?: number;
  lgaId?: number;
}

const generateAssetCountOption = (
  data: AssetCountOption[] | undefined
): Record<string, MapAssetData> => {
  const options: Record<string, MapAssetData> = {};

  if (data && Array.isArray(data)) {
    data.forEach((item) => {
      const label = item.lgaName || item.stateName || 'Unknown Location';
      const id = item.stateId || item.lgaId || 0;
      options[label] = {
        count: item.assetCount,
        id: id,
        name: label,
      };
    });
  }

  return options;
};

const MapView = () => {
  const [selectedState, setSelectedState] = useState<MapAssetData | null>(null);
  const { data: stateAssetCount, isLoading: isLoadingStateAssetCount } =
    useGetStateAssetCountByCountryIdQuery({ id: 1, pageSize: 37 });
  const { data: lgaAssetCount, isLoading: isLoadingLGAAssetCount } =
    useGetLGAAssetCountByStateIdQuery(
      { id: selectedState?.id, pageSize: 45 },
      { skip: !selectedState }
    );
  const assetLabel = selectedState?.name
    ? `in ${selectedState?.name}`
    : 'Under Management';

  return (
    <Flex width="full" height="full" gap="40px" justifyContent="space-between">
      <Flex
        width="70%"
        height="90vh"
        position="relative"
        direction="column"
        alignItems="flex-start"
      >
        <HStack
          width="full"
          justifyContent="space-between"
          my="32px"
          // position="absolute"
          // display="hidden"
        >
          <VStack pl="24px" alignItems="flex-start" spacing="4px">
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
          {selectedState?.name && (
            <HStack
              alignItems="center"
              spacing="4px"
              mt="8px"
              cursor="pointer"
              onClick={() => setSelectedState(null)}
            >
              <Icon as={ChevronLeftIcon} boxSize="24px" />
              <Text>Back To Country Map</Text>
            </HStack>
          )}
        </HStack>
        {isLoadingLGAAssetCount || isLoadingStateAssetCount ? (
          <LoadingSpinner />
        ) : (
          <Flex
            width="full"
            height="full"
            zIndex={99}
            alignItems="flex-start"
            justifyContent="center"
            position="relative"
          >
            <MapViewComponent
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              assetData={generateAssetCountOption(
                selectedState?.id
                  ? lgaAssetCount?.data?.items
                  : stateAssetCount?.data?.items
              )}
            />
          </Flex>
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
          selectedState={selectedState}
        />
      </Flex>
    </Flex>
  );
};

export default MapView;
