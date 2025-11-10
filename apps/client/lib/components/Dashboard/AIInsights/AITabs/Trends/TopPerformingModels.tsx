import { Text, VStack } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import { useGetTopPerformingModelsQuery } from '~/lib/redux/services/dashboard/ai';
import { TopPerformingModel } from '~/lib/interfaces/dashboard/aiinsights.interfaces';
import CardHeader from '../../../Common/CardHeader';

const TopPerformingModels = () => {
  const columnHelper = createColumnHelper<TopPerformingModel>();

  const { data, isLoading } = useGetTopPerformingModelsQuery();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('modelName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Model Name',
          enableSorting: false,
        }),
        columnHelper.accessor('accuracy', {
          cell: (info) => (
            <Text
              fontWeight={800}
              color={info.getValue() > 0.5 ? '#00A129' : '#F50000'}
            >{`${info.getValue()}%`}</Text>
          ),
          header: 'Accuracy %',
          enableSorting: false,
        }),
        columnHelper.accessor('datasetSize', {
          cell: (info) => `${info.getValue()}`,
          header: 'Dataset Size',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [data?.data] //eslint-disable-line
  );

  return (
    <VStack height="full" width="full" alignItems="flex-start" spacing="23px">
      <CardHeader>Top Performing Models</CardHeader>
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

export default TopPerformingModels;
