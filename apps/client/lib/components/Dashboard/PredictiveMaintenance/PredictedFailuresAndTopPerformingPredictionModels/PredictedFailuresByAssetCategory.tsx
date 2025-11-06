import { HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import ChartLegend from '../../Common/Charts/ChartLegend';
import BarChart from '../../Common/Charts/BarChart';
import CardHeader from '../../Common/CardHeader';
import { useGetTicketByPriorityLevelQuery } from '~/lib/redux/services/dashboard/ticketDashboard.services';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetPredictiveMaintenanceDashboardPredictedFailuresQuery } from '~/lib/redux/services/dashboard/predictivemaintenance.services';

const PredictedFailuresByAssetCategory = () => {
  const filters = useAppSelector((state) => state.common.filters);
  const { data, isLoading, isFetching } =
    useGetPredictiveMaintenanceDashboardPredictedFailuresQuery({
      facilityIds: filters?.facilities,
      assetCategoryIds: filters?.assetCategories,
      datePeriod: filters?.datePeriod?.[0],
      riskThreshold: filters?.datePeriod?.[0],
    });
  const dataItems = [
    {
      label: '15-30 Days',
      values: data?.data?.map((item) => item.days15to30) ?? [],
      color: '#EABC30',
    },
    {
      label: '8-14 Days',
      values: data?.data?.map((item) => item.days8to14) ?? [],
      color: '#0E2642',
    },
    {
      label: '0-7 Days',
      values: data?.data?.map((item) => item.days0to7) ?? [],
      color: '#FF383C',
    },
  ];

  return (
    <VStack
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
        <CardHeader>
          Predicted Failures by Asset Category (Next 30 Days)
        </CardHeader>

        <ChartLegend
          chartLegendItems={dataItems.map((item) => ({
            label: item.label,
            color: item.color,
          }))}
          containerStyle={{ direction: 'column', spacing: '8px' }}
        />
      </HStack>
      <BarChart
        labels={data?.data ? data?.data.map((item) => item.category) : []}
        chartData={dataItems.reverse()}
        isLoading={isLoading || isFetching}
        isStacked
      />
    </VStack>
  );
};

export default PredictedFailuresByAssetCategory;
