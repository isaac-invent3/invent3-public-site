import { HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import ProgressIndicator from '../../Common/ProgressIndicator';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetAssetTrendsQuery } from '~/lib/redux/services/dashboard/clientadmin.services';
import CardHeader from '../../Common/CardHeader';
import LineChart from '../../Common/Charts/LineChart';
import { transformMonthIdsToShortNames } from '../../Common/utils';
import DropDown from '../../Common/DropDown';
import { generateLastFiveYears } from '~/lib/utils/helperFunctions';
import { Option } from '@repo/interfaces';

const AssetTrends = () => {
  const { selectedCountry, selectedState } = useAppSelector(
    (state) => state.dashboard.info
  );
  const [selectedYear, setSelectedYear] = useState<Option | null>(
    generateLastFiveYears()[0] as Option
  );
  const { data, isLoading, isFetching } = useGetAssetTrendsQuery({
    countryId: +selectedCountry?.value!,
    regionId: (selectedState?.value as number) ?? undefined,
    year: (selectedYear?.value as number) ?? undefined,
  });
  return (
    <VStack
      width="full"
      height="full"
      p="20px"
      alignItems="flex-start"
      bgColor="white"
      rounded="8px"
    >
      <HStack width="full" justifyContent="space-between">
        <CardHeader>Asset Trends</CardHeader>
        <DropDown
          options={generateLastFiveYears()}
          label="Year"
          handleClick={(option) => {
            setSelectedYear(option);
          }}
          selectedOptions={selectedYear}
          width="100px"
        />
      </HStack>
      <VStack
        width="full"
        height="full"
        alignItems="flex-start"
        spacing="34px"
        justifyContent="space-between"
      >
        <HStack spacing="4px">
          <Text color="neutral.600" fontWeight={700} mb="4px">
            This month
          </Text>
          <Skeleton isLoaded={!isLoading}>
            <ProgressIndicator
              valueChange={data?.data?.percentageChange ?? 0}
            />
          </Skeleton>
        </HStack>
        <LineChart
          labels={transformMonthIdsToShortNames(
            data?.data?.assetTrends?.map((item) => item.monthId) ?? []
          )}
          datasets={[
            {
              label: 'Asset Added',
              data:
                data?.data?.assetTrends?.map((item) => item.noOfAddedAssets) ??
                [],
              borderColor: '#07CC3B',
              pointRadius: 0,
              borderWidth: 2,
              tension: 0.4,
              fill: false,
            },
            {
              label: 'Asset Dispose',
              data:
                data?.data?.assetTrends?.map(
                  (item) => item.noOfDisposedAssets
                ) ?? [],
              borderColor: '#0366EF',
              borderDash: [8, 4],
              pointRadius: 0,
              fill: false,
              tension: 0.4,
              borderWidth: 2,
            },
          ]}
          isLoading={isLoading || isFetching}
          showXGrid={false}
        />
      </VStack>
    </VStack>
  );
};

export default AssetTrends;
