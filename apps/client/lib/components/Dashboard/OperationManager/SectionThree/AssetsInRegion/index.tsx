import { Box, Skeleton, Text, VStack } from '@chakra-ui/react';
import { Map, Marker, Point } from 'pigeon-maps';
import { useEffect, useState } from 'react';
import { AssetInRegion } from '~/lib/interfaces/dashboard.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetAssetsInRegionQuery } from '~/lib/redux/services/dashboard/operationmanager.services';
import NIGERIA_CORDINATES from '~/lib/utils/NigeriaCordinates';
import CountMarker from './CountMarker';
import CardHeader from '../../../Common/CardHeader';

const AssetsInRegion = () => {
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [sortedAssetData, setSortedAssetData] = useState<AssetInRegion[]>([]);
  const { selectedCountry, selectedState } = useAppSelector(
    (state) => state.dashboard.info
  );
  const { data, isLoading, isFetching } = useGetAssetsInRegionQuery({
    id: selectedCountry?.value,
    ...(selectedState?.value && selectedState?.value !== '-1'
      ? { regionId: selectedState?.value }
      : {}),
    pageSize: 45,
  });
  const isProperState = selectedState?.label && selectedState?.label !== 'All';

  const defaultCenter: Point = isProperState
    ? (NIGERIA_CORDINATES.states?.[selectedState?.label] ?? [9.082, 8.6753])
    : [9.082, 8.6753];

  const transformedCenter: Point = selectedState?.label
    ? [defaultCenter[1], defaultCenter[0]]
    : defaultCenter;

  useEffect(() => {
    if (data?.data?.items) {
      const sortedData = [...data.data.items].sort(
        (a: AssetInRegion, b: AssetInRegion) => {
          const nameA = isProperState ? a.lgaName : a.stateName;
          const nameB = isProperState ? b.lgaName : b.stateName;

          if (nameA === hoveredName) return 1;
          if (nameB === hoveredName) return -1;
          return 0;
        }
      );
      setSortedAssetData(sortedData);
    }
  }, [data, hoveredName]);

  return (
    <VStack
      width="full"
      height="full"
      pt="26px"
      px="16px"
      pb="17px"
      alignItems="flex-start"
      spacing="20px"
      bgColor="white"
      rounded="8px"
    >
      <CardHeader>
        {isProperState
          ? `Assets in ${selectedState?.label}`
          : 'All Assets In Nigeria'}
      </CardHeader>
      <Skeleton isLoaded={!isLoading && !isFetching} width="full">
        <Box width="full" height="275px" bgColor="red">
          {transformedCenter ? (
            <Map
              height={275}
              defaultCenter={transformedCenter}
              defaultZoom={isProperState ? 9 : 6}
              attribution={false}
            >
              {sortedAssetData.map((item: AssetInRegion, index: number) => {
                const anchor = isProperState
                  ? NIGERIA_CORDINATES?.[selectedState?.label as 'Abia']?.[
                      item.lgaName as 'Abia North'
                    ]
                  : NIGERIA_CORDINATES?.states?.[item.stateName as 'Abia'];

                const name = isProperState ? item.lgaName : item.stateName;
                const assetCount = item.assetCount;

                if (assetCount > 0 && name) {
                  return (
                    <Marker
                      key={index}
                      anchor={anchor}
                      style={{ pointerEvents: 'auto' }}
                      hover={true}
                      payload={{ name }}
                      onMouseOver={(event) =>
                        setHoveredName(event.payload.name)
                      }
                      onMouseOut={() => setHoveredName(null)}
                    >
                      <CountMarker
                        name={name}
                        value={assetCount}
                        externalHover={hoveredName === name}
                      />
                    </Marker>
                  );
                }
                return null;
              })}
            </Map>
          ) : (
            <Box
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="neutral.100"
            >
              <Text color="neutral.600">Location data not available</Text>
            </Box>
          )}
        </Box>
      </Skeleton>
    </VStack>
  );
};

export default AssetsInRegion;
