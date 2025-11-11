import { Flex, Text } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { OPERATORS } from '@repo/constants';
import { createColumnHelper } from '@tanstack/react-table';
import { amountFormatter } from '~/lib/utils/Formatters';
import { DataTable } from '@repo/ui/components';
import { generateSearchCriteria } from '@repo/utils';
import { CostAnalyticsDetailedCostBreakdown } from '~/lib/interfaces/dashboard/costanalytics.interfaces';
import { useGetCostAnalyticsDetailedCostBreakdownMutation } from '~/lib/redux/services/dashboard/costanalytics.services';

interface useCostBreakdownTable {
  search?: string;
  customPageSize?: number;
}

const useCostBreakdownTable = (props: useCostBreakdownTable) => {
  const { search, customPageSize } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [searchData, setSearchData] = useState<
    | BaseApiResponse<ListResponse<CostAnalyticsDetailedCostBreakdown>>
    | undefined
  >(undefined);
  const { handleSubmit } = useCustomMutation();
  const [searchCostBreakdown, { isLoading }] =
    useGetCostAnalyticsDetailedCostBreakdownMutation({});

  const handleSearch = useCallback(async () => {
    const { orCriterion } = generateSearchCriteria(
      undefined,
      {
        search: [search],
      },
      undefined
    );
    const payload = {
      pageNumber,
      pageSize: customPageSize ?? pageSize,
      orCriterion,
    };

    const response = await handleSubmit(searchCostBreakdown, payload, '');
    setSearchData(response?.data);
  }, [searchCostBreakdown, search, pageSize, pageNumber]);

  // Trigger search when search input changes or pagination updates
  useEffect(() => {
    handleSearch();
  }, [search, pageNumber, pageSize]);

  // Reset pagination when clearing the search
  useEffect(() => {
    if (!search) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setPageNumber(1);
    }
  }, [search]);

  const columnHelper = createColumnHelper<CostAnalyticsDetailedCostBreakdown>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('asset', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Asset Name',
          enableSorting: false,
        }),
        columnHelper.accessor('facility', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Facility',
          enableSorting: false,
        }),
        columnHelper.accessor('category', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Category',
          enableSorting: false,
        }),
        columnHelper.accessor('maintenance', {
          cell: (info) => amountFormatter(info.getValue() ?? 0),
          header: 'Maintenance (₦)',
          enableSorting: false,
        }),
        columnHelper.accessor('energy', {
          cell: (info) => amountFormatter(info.getValue() ?? 0),
          header: 'Energy (₦)',
          enableSorting: false,
        }),
        columnHelper.accessor('labor', {
          cell: (info) => amountFormatter(info.getValue() ?? 0),
          header: 'Labor (₦)',
          enableSorting: false,
        }),
        columnHelper.accessor('total', {
          cell: (info) => amountFormatter(info.getValue() ?? 0),
          header: 'Total (₦)',
          enableSorting: false,
        }),
        columnHelper.accessor('savings', {
          cell: (info) => (
            <Text color="#017E20">{amountFormatter(info.getValue() ?? 0)}</Text>
          ),
          header: 'Savings (₦)',
          enableSorting: false,
        }),
        columnHelper.accessor('roi', {
          cell: (info) => (
            <Text color="#0366EF" fontWeight={700}>{`${info.getValue()}`}</Text>
          ),
          header: 'ROI',
          enableSorting: false,
        }),
        columnHelper.accessor('lastMaintenance', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Last Maintenance',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[searchData?.data?.items]] //eslint-disable-line
  );

  const CostBreakDownTable = (
    <Flex width="full" direction="column">
      <DataTable
        columns={columns}
        data={searchData?.data?.items ?? []}
        isLoading={isLoading}
        isFetching={isLoading}
        showFooter={false}
        maxTdWidth="200px"
        customTdStyle={{
          paddingLeft: '16px',
          paddingTop: '12px',
          paddingBottom: '12px',
        }}
      />
    </Flex>
  );
  return {
    handleSearch,
    CostBreakDownTable,
    totalPages: search && searchData ? searchData.data?.totalPages : 0,
    pageSize,
    pageNumber,
    setPageNumber,
    setPageSize,
    // Filter,
  };
};

export default useCostBreakdownTable;
