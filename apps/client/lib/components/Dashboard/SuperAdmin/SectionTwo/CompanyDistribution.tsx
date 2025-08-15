import { Box, Flex, Skeleton, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CardHeader from '../../Common/CardHeader';
import { Map, Marker } from 'pigeon-maps';
import { useGetCompanyDistributionQuery } from '~/lib/redux/services/company.services';
import CountMarker from '../../OperationManager/SectionThree/AssetsInRegion/CountMarker';
import { CompanyDistribution } from '~/lib/interfaces/company.interfaces';
import NIGERIA_CORDINATES from '~/lib/utils/NigeriaCordinates';

const CompanyDistributionMap = () => {
  const { data, isLoading, isFetching } = useGetCompanyDistributionQuery();
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [sortedCompanyDistribution, setsortedCompanyDistribution] = useState<
    CompanyDistribution[]
  >([]);

  useEffect(() => {
    if (data?.data?.items) {
      const sortedData = [...data.data.items].sort(
        (a: CompanyDistribution, b: CompanyDistribution) => {
          const nameA = a.stateName;
          const nameB = b.stateName;

          if (nameA === hoveredName) return 1;
          if (nameB === hoveredName) return -1;
          return 0;
        }
      );
      setsortedCompanyDistribution(sortedData);
    }
  }, [data, hoveredName]);
  return (
    <VStack
      height="full"
      // p="20px"
      alignItems="flex-start"
      spacing="16px"
      bgColor="white"
      rounded="8px"
      position="relative"
      overflow="hidden"
    >
      <Flex width="full" position="absolute" zIndex={99} py="15px" px="10px">
        <CardHeader>Company Distribution</CardHeader>
      </Flex>
      <Skeleton
        isLoaded={!isLoading && !isFetching}
        width="full"
        height="full"
        minH="324px"
      >
        <Box width="full" height="full" minH="324px">
          <Map
            /* @ts-ignore */
            height="100%"
            defaultCenter={[9.082, 8.6753]}
            defaultZoom={6}
            attribution={false}
          >
            {sortedCompanyDistribution.map(
              (item: CompanyDistribution, index: number) => {
                const anchor =
                  NIGERIA_CORDINATES?.states?.[item.stateName as 'Abia'];

                const name = item.stateName;
                const companyCount = item.companyCount;

                if (companyCount > 0 && name) {
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
                        value={companyCount}
                        externalHover={hoveredName === name}
                      />
                    </Marker>
                  );
                }
                return null;
              }
            )}
          </Map>
        </Box>
      </Skeleton>
    </VStack>
  );
};

export default CompanyDistributionMap;
