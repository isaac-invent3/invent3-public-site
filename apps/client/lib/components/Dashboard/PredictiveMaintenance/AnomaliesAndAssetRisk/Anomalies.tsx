import { HStack, VStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import { useAppSelector } from '~/lib/redux/hooks';
import ChartLegend from '../../Common/Charts/ChartLegend';
import { useGetPredictiveMaintenanceDashboardAnomaliesTrendQuery } from '~/lib/redux/services/dashboard/predictivemaintenance.services';
import moment from 'moment';

const Anomalies = () => {
  const filters = useAppSelector((state) => state.common.filters);
  const { data, isLoading, isFetching } =
    useGetPredictiveMaintenanceDashboardAnomaliesTrendQuery({
      facilityIds: filters?.facilities,
      assetCategoryIds: filters?.assetCategories,
      datePeriod: filters?.datePeriod?.[0],
      riskThreshold: filters?.datePeriod?.[0],
    });

  // ✅ Transform API response into chart-friendly format
  const dataItems = useMemo(() => {
    if (!data?.data) return [];

    return [
      {
        label: 'Predicted Failures',
        value: data?.data?.map((item) => item.predictedFailures) || [],
        color: '#F50000',
      },
      {
        label: 'Anomalies Detected',
        value: data?.data?.map((item) => item.anomaliesDetected) || [],
        color: '#F39B6E',
      },
    ];
  }, [data]);

  const labels =
    data?.data?.map((item) =>
      moment(item.date, 'YYYY-MM-DD').format('MMM DD')
    ) || [];

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
      <HStack
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <CardHeader>Anomalies and Predicted Failures Over Time</CardHeader>
        <ChartLegend
          chartLegendItems={dataItems.map((item) => ({
            label: item.label,
            color: item.color,
          }))}
          showSecondaryLine
          containerStyle={{ direction: 'column', spacing: '4px' }}
        />
      </HStack>

      <VStack
        width="full"
        height="full"
        alignItems="flex-start"
        spacing="34px"
        justifyContent="space-between"
      >
        <LineChart
          labels={labels}
          datasets={dataItems.map((item) => ({
            label: item.label,
            data: item.value,
            borderColor: item.color,
            borderWidth: 2,
            tension: 0.4,
            fill: false,
          }))}
          yLabel="Event Count"
          isLoading={isLoading || isFetching}
          showYGrid={false}
          showDots={false}
        />
      </VStack>
    </VStack>
  );
};

export default Anomalies;
