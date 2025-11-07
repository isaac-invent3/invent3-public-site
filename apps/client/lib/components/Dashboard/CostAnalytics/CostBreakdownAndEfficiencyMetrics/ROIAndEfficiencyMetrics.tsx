import {
  Progress,
  Text,
  VStack,
  Flex,
  HStack,
  Skeleton,
} from '@chakra-ui/react';
import React from 'react';
import CardHeader from '../../Common/CardHeader';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetCostAnalyticsROIMetricsQuery } from '~/lib/redux/services/dashboard/costanalytics.services';
import { formatNumberShort } from '~/lib/utils/helperFunctions';
import ProgressIndicator from '../../Common/ProgressIndicator';

const ROIAndEfficiencyMetrics = () => {
  const filters = useAppSelector((state) => state.common.filters);
  const { data, isLoading, isFetching } = useGetCostAnalyticsROIMetricsQuery({
    facilityIds: filters?.facilities,
    assetCategoryIds: filters?.assetCategories,
    costTypes: filters?.costTypes,
    costPeriod: filters?.datePeriod?.[0],
  });

  return (
    <VStack
      width="full"
      height="full"
      minH="300px"
      p={4}
      alignItems="flex-start"
      spacing={4}
      bgColor="white"
      rounded="8px"
      maxH="375px"
    >
      <CardHeader>ROI and Efficiency Metrics</CardHeader>
      {(isLoading || isFetching) && <Skeleton width="full" height="full" />}
      {!isLoading && !isFetching && (
        <VStack width="full" spacing={6}>
          {/* ROI on Predictive Maintenance Starts */}
          <VStack
            width="full"
            spacing={6}
            border="1px solid #17A1FA"
            rounded="4px"
            bgColor="#17A1FA0D"
            alignItems="flex"
            position="relative"
            p={4}
          >
            <Text color="neutral.600" fontWeight={700} mb="9px">
              ROI on Predictive Maintenance
            </Text>
            <Flex
              position="absolute"
              mx="auto"
              width="full"
              justifyContent="center"
              top={0}
              mt={2}
            >
              <Text color="#17A1FA" fontSize="32px" fontWeight={800}>
                {data?.data?.roi}%
              </Text>
            </Flex>
            <VStack width="full">
              <Progress
                value={data?.data?.roi ?? 0}
                size="md"
                width="full"
                rounded="full"
                max={100}
                sx={{
                  '& > div': {
                    backgroundColor: '#17A1FA',
                  },
                  backgroundColor: '#BBBBBB',
                }}
              />
              <Text color="neutral.600" fontWeight={700} fontSize="10px">
                ROI = (Savings / Total Cost) × 100
              </Text>
            </VStack>
          </VStack>
          {/* ROI on Predictive Maintenance Ends */}
          <VStack
            width="full"
            spacing={4}
            border="1px solid #F50000"
            rounded="4px"
            bgColor="#FFFFFF0D"
            alignItems="flex"
            position="relative"
            p={4}
          >
            <Text color="neutral.600" fontWeight={700}>
              Average Cost per Asset
            </Text>
            <HStack spacing={2}>
              <Text
                fontSize="28px"
                fontWeight={800}
                color="#F50000"
              >{`₦${data?.data?.averageCostPerAsset?.toLocaleString() ?? 0}`}</Text>
              <ProgressIndicator
                valueChange={2.1}
                iconStyles={{ color: '#D67D00' }}
                textStyles={{ color: '#D67D00' }}
                customStyles={{ bgColor: '#F500001A', color: '#D67D00' }}
              />
              <Text color="#F50000">since last quarter</Text>
            </HStack>
            <Text color="neutral.600">
              Estimated based on missed SLA tickets
            </Text>
          </VStack>
        </VStack>
      )}
    </VStack>
  );
};

export default ROIAndEfficiencyMetrics;
