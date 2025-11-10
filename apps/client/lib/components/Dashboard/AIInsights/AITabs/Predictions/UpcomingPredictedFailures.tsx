import { VStack } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { useGetMLInsightPredictedFailuresQuery } from '~/lib/redux/services/dashboard/ai';
import { MLInsightPredictedFailure } from '~/lib/interfaces/dashboard/aiinsights.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';
import CardHeader from '../../../Common/CardHeader';

const UpcomingPredictedFailures = () => {
  const columnHelper = createColumnHelper<MLInsightPredictedFailure>();

  const { data, isLoading } = useGetMLInsightPredictedFailuresQuery();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('assetName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Asset Name',
          enableSorting: false,
        }),
        columnHelper.accessor('failureDate', {
          cell: (info) => dateFormatter(info.getValue(), 'YYYY-mm-DD') ?? 'N/A',
          header: 'Failure Date',
          enableSorting: false,
        }),
        columnHelper.accessor('confidence', {
          cell: (info) => `${info.getValue()}`,
          header: 'Confidence',
          enableSorting: false,
        }),
        columnHelper.accessor('status', {
          cell: (info) => (
            <GenericStatusBox
              text={info.getValue() ?? ''}
              showDot={false}
              rounded="8px"
            />
          ),
          header: 'Status',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [data?.data] //eslint-disable-line
  );

  return (
    <VStack height="full" width="full" alignItems="flex-start" spacing="23px">
      <CardHeader>Upcoming Predicted Failures</CardHeader>
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        showFooter={false}
        isLoading={isLoading}
        emptyLines={3}
        maxTdWidth="250px"
        customThStyle={{
          paddingLeft: '16px',
          paddingTop: '17px',
          paddingBottom: '17px',
          fontWeight: 700,
          bgColor: '#B4BFCA',
        }}
        customTdStyle={{
          paddingLeft: '16px',
          paddingTop: '16px',
          paddingBottom: '16px',
        }}
        customTBodyRowStyle={{ verticalAlign: 'top' }}
        customTableContainerStyle={{
          rounded: '4px',
        }}
      />
    </VStack>
  );
};

export default UpcomingPredictedFailures;
