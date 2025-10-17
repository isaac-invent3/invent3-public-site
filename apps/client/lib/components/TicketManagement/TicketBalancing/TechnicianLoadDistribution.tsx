import { useMediaQuery, VStack } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useGetLifeCycleComparisonReportQuery } from '~/lib/redux/services/location/lifecycleComparison.services';
import { LifecycleComparisonReport } from '~/lib/interfaces/location/lifecycle.interfaces';
import CardHeader from '../../Dashboard/Common/CardHeader';

const TechnicianLoadDistribution = () => {
  const columnHelper = createColumnHelper<LifecycleComparisonReport>();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const { data, isLoading, isFetching } = useGetLifeCycleComparisonReportQuery({
    datePeriod: [],
    facilities: [],
    assetCategories: [],
    assetStatus: [],
    metricsToCompare: [],
  });

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('facilityName', {
          cell: (info) => info.getValue(),
          header: 'Technician',
          enableSorting: false,
        }),
        columnHelper.accessor('meanAssetAge', {
          cell: (info) => info.getValue(),
          header: 'Skill Level',
          enableSorting: true,
        }),
        columnHelper.accessor('meanLifeCycleCost', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Location',
          enableSorting: true,
        }),
        columnHelper.accessor('residualVale', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Active Tickets',
          enableSorting: true,
        }),
        columnHelper.accessor('meanFailure_Year', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Max Capacity',
          enableSorting: true,
        }),
        columnHelper.accessor('meanRiskScore', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Load %',
          enableSorting: true,
        }),
        columnHelper.accessor('meanRiskScore', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Status',
          enableSorting: true,
        }),
      ];

      return baseColumns;
    },
    [[data]] //eslint-disable-line
  );

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('facilityName', {
          cell: (info) => info.getValue(),
          header: 'Technician',
          enableSorting: false,
        }),
        columnHelper.accessor('meanAssetAge', {
          cell: (info) => info.getValue(),
          header: 'Skill Level',
          enableSorting: true,
        }),
        columnHelper.accessor('meanLifeCycleCost', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Location',
          enableSorting: true,
        }),
      ];

      return baseColumns;
    },
    [[data?.data]] //eslint-disable-line
  );

  return (
    <VStack
      width="full"
      height="full"
      pl="16px"
      pr="15px"
      pt="21px"
      pb="12px"
      alignItems="flex-start"
      spacing="16px"
      bgColor="white"
      rounded="8px"
      minH="352px"
    >
      <CardHeader>Technician Load Distribution</CardHeader>

      <DataTable
        columns={isMobile ? mobileColumns : columns}
        data={data?.data ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        showFooter={false}
        emptyLines={5}
        maxTdWidth="200px"
        customThStyle={{
          paddingLeft: '16px',
          paddingTop: '12px',
          paddingBottom: '12px',
          fontWeight: 700,
        }}
        customTdStyle={{
          paddingLeft: '16px',
          paddingTop: '12px',
          paddingBottom: '12px',
        }}
      />
    </VStack>
  );
};

export default TechnicianLoadDistribution;
