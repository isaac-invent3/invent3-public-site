import { HStack, Progress, Text, VStack } from '@chakra-ui/react';
import { EmptyState } from '@repo/ui/components';
import React from 'react';
import { AssetForecast } from '~/lib/interfaces/forecast.interfaces';
import { generateColor } from '~/lib/utils/helperFunctions';

const FactorInfluenceBreakdown = ({
  assetForcast,
}: {
  assetForcast?: AssetForecast;
}) => {
  return (
    <VStack width="full">
      {!assetForcast?.forecastDrivers && (
        <EmptyState emptyText="No Data at the moment" />
      )}
      {assetForcast?.forecastDrivers && (
        <HStack width="full" py={6}>
          <Text
            transform="rotate(-90deg)"
            whiteSpace="nowrap"
            color="neutral.600"
          >
            Factor Names
          </Text>
          <VStack align="stretch" width="full" spacing={4}>
            {assetForcast &&
              assetForcast?.forecastDrivers?.map((item, index) => (
                <HStack key={index} spacing={4} align="center" width="full">
                  <Text minW="170px" fontWeight={400} color="black">
                    {item.driverFeature}
                  </Text>
                  <Progress
                    value={40}
                    size="sm"
                    flex="1"
                    sx={{
                      '& > div': {
                        backgroundColor: generateColor(1),
                      },
                      backgroundColor: '#F2F1F1',
                    }}
                  />

                  <Text color="black" minW="40px" textAlign="right">
                    {40}%
                  </Text>
                </HStack>
              ))}
          </VStack>
        </HStack>
      )}
    </VStack>
  );
};

export default FactorInfluenceBreakdown;
