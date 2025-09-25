import { HStack, VStack } from '@chakra-ui/react';
import { Option } from '@repo/interfaces';
import React, { useState } from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import DropDown from '~/lib/components/Dashboard/Common/DropDown';
import { transformMonthIdsToShortNames } from '~/lib/components/Dashboard/Common/utils';
import {
  useGetLifeCycleTrendByLifeCyleIdQuery,
  useGetLifecyleStagesQuery,
} from '~/lib/redux/services/asset/lifeCycle.services';
import {
  generateLastFiveYears,
  generateOptions,
} from '~/lib/utils/helperFunctions';

const TrendOverTime = () => {
  const [selectedYear, setSelectedYear] = useState<Option | null>(
    generateLastFiveYears()[0] as Option
  );
  const [selectedLifeCyleId, setSelectedLifeCyleId] = useState<
    Option | undefined
  >(generateLastFiveYears()[0] as Option);
  const { data: lifeCycleStageData, isLoading: isLoadingStages } =
    useGetLifecyleStagesQuery({});
  const { data, isLoading } = useGetLifeCycleTrendByLifeCyleIdQuery(
    {
      lifeCycleId: selectedLifeCyleId?.value as number,
      year: selectedYear?.value as number,
    },
    { skip: !selectedLifeCyleId?.value }
  );

  return (
    <VStack
      width="full"
      height="full"
      p="20px"
      alignItems="flex-start"
      spacing="16px"
      bgColor="white"
      rounded="8px"
    >
      <HStack width="full" justifyContent="space-between">
        <CardHeader>Trends Over Time</CardHeader>
        <HStack spacing="8px">
          <DropDown
            options={generateOptions(
              lifeCycleStageData?.data?.items,
              'lifeCycleStageName',
              'lifeCycleId'
            )}
            label="Year"
            handleClick={(option) => {
              setSelectedYear(option);
            }}
            selectedOptions={selectedYear}
            width="100px"
            isLoading={isLoadingStages}
          />
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
      </HStack>
      <VStack
        width="full"
        height="full"
        alignItems="flex-start"
        spacing="34px"
        justifyContent="space-between"
      >
        {/* <ChartLegend chartLegendItems={chartLegendItems} /> */}
        <LineChart
          labels={
            data?.data
              ? transformMonthIdsToShortNames(
                  data?.data?.items?.map((item) => item.month)
                )
              : []
          }
          datasets={[
            {
              label: 'Trend',
              data: data?.data
                ? data?.data?.items?.map((item) => item.count)
                : [],
              borderColor: '#0366EF',
              pointBorderColor: '#fff',
              pointBackgroundColor: '#0366EF',
              pointRadius: 6,
              borderWidth: 2,
              tension: 0.4,
              fill: false,
            },
          ]}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  );
};

export default TrendOverTime;
