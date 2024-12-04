import { Flex, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import MapViewComponent from './Map';
import {
  useGetLGAAssetCountByStateIdQuery,
  useGetStateAssetCountByCountryIdQuery,
} from '~/lib/redux/services/asset/stats.services';
import Stats from './Stats';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import LoadingSpinner from './Map/LoadingSpinner';
import {
  AssetMapStats,
  SingleMapAssetData,
} from '~/lib/interfaces/asset.interfaces';

const generateAssetCountOption = (
  data: AssetMapStats[] | undefined
): Record<string, SingleMapAssetData> => {
  const options: Record<string, SingleMapAssetData> = {};

  if (data && Array.isArray(data)) {
    data.forEach((item) => {
      const label = item.lgaName || item.stateName || 'Unknown Location';
      const id = item.stateId || item.lgaId || 0;
      options[label] = {
        assetInUseCount: item.activeAssets,
        assetNoInUseCount: item.assetsNotInUse,
        assetValue: item.totalAssetValue,
        assetsNotInUseTotalValue: item.assetsNotInUseTotalValue,
        activeAssetsTotalValue: item.activeAssetsTotalValue,
        id: id,
        name: label,
      };
    });
  }

  return options;
};

const MapView = () => {
  const [selectedState, setSelectedState] = useState<SingleMapAssetData | null>(
    null
  );
  const { data: stateAssetCount, isLoading: isLoadingStateAssetCount } =
    useGetStateAssetCountByCountryIdQuery({ id: 1, pageSize: 37 });
  const [currentAssetStatus, setCurrentAssetStatus] = useState<
    'In Use' | 'Not in Use'
  >('In Use');
  const [statType, setStatType] = useState<'value' | 'count'>('value');
  const { data: lgaAssetCount, isLoading: isLoadingLGAAssetCount } =
    useGetLGAAssetCountByStateIdQuery(
      { id: selectedState?.id, pageSize: 45 },
      { skip: !selectedState }
    );
  const assetLabel = selectedState?.name
    ? `in ${selectedState?.name}`
    : 'Under Management';

  return (
    <Flex width="full" height="full" gap="20px" justifyContent="space-between">
      <Flex
        width="80%"
        height="full"
        position="relative"
        direction="column"
        alignItems="flex-start"
      >
        <HStack width="full" justifyContent="space-between" my="32px">
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
            maxH="60%"
            zIndex={99}
            alignItems="flex-start"
            justifyContent="center"
            position="relative"
          >
            <Flex
              width="full"
              height="full"
              position="absolute"
              alignItems="center"
              justifyContent="center"
              top={0}
              bottom={0}
              right={0}
              left={0}
              pointerEvents="none"
              overflow="hidden"
            >
              <Text
                textAlign="center"
                letterSpacing="0.3em"
                fontSize="174.62px"
                lineHeight="207.45px"
                fontWeight={900}
                color="neutral.300"
                transform="rotate(-27deg)"
                opacity={0.8}
              >
                {selectedState?.name}
              </Text>
            </Flex>
            <Flex width={{ base: '100%', '2xl': '67%' }}>
              <MapViewComponent
                selectedState={selectedState}
                setSelectedState={setSelectedState}
                assetData={generateAssetCountOption(
                  selectedState?.id
                    ? lgaAssetCount?.data?.items
                    : stateAssetCount?.data?.items
                )}
                currentAssetStatus={currentAssetStatus}
                type={statType}
              />
            </Flex>
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
          currentStatType={statType}
          currentAssetStatus={currentAssetStatus}
          setCurrentAssetStatus={setCurrentAssetStatus}
          setStatType={setStatType}
        />
      </Flex>
    </Flex>
  );
};

export default MapView;
