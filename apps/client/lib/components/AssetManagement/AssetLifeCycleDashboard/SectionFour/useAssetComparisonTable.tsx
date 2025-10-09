import { Flex } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { OPERATORS } from '@repo/constants';
import { createColumnHelper } from '@tanstack/react-table';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';
import { DataTable } from '@repo/ui/components';
import { generateSearchCriteria } from '@repo/utils';
import { Asset } from '~/lib/interfaces/asset/general.interface';
import {
  useGetAssetAtRiskMutation,
  useGetAssetLifeCycleFinancialComparisonsQuery,
} from '~/lib/redux/services/asset/lifeCycle.services';

interface useAssetComparisonTable {
  search?: string;
  customPageSize?: number;
}

const useAssetComparisonTable = (props: useAssetComparisonTable) => {
  const { search, customPageSize } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [searchData, setSearchData] = useState<
    BaseApiResponse<ListResponse<Asset>> | undefined
  >(undefined);
  const { handleSubmit } = useCustomMutation();
  const { data, isLoading } = useGetAssetLifeCycleFinancialComparisonsQuery({
    pageSize,
    pageNumber: customPageSize,
  });

  // const handleSearch = useCallback(async () => {
  //   const { orCriterion } = generateSearchCriteria(
  //     undefined,
  //     {
  //       search: [search],
  //     },
  //     {
  //       search: {
  //         key: ['assetName', 'assetCategory'],
  //         operator: OPERATORS.Contains,
  //       },
  //     },
  //     undefined
  //   );
  //   const payload = {
  //     pageNumber,
  //     pageSize: customPageSize ?? pageSize,
  //     orCriterion,
  //   };

  //   const response = await handleSubmit(searchAssetLifeCycleFinancialComparison, payload, '');
  //   setSearchData(response?.data);
  // }, [ search, pageSize, pageNumber]);

  // Trigger search when search input changes or pagination updates
  // useEffect(() => {
  //   handleSearch();
  // }, [search, pageNumber, pageSize]);

  // Reset pagination when clearing the search
  useEffect(() => {
    if (!search) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setPageNumber(1);
    }
  }, [search]);

  const columnHelper = createColumnHelper<Asset>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('assetName', {
          cell: (info) => info.getValue(),
          header: 'Asset Name',
          enableSorting: false,
        }),
        columnHelper.accessor('acquisitionCost', {
          cell: (info) => amountFormatter(info.getValue() ?? 0),
          header: 'Acquisition Cost',
          enableSorting: false,
        }),
        columnHelper.accessor('maintenanceCost', {
          cell: (info) => amountFormatter(info.getValue() ?? 0),
          header: 'Maintenance Cost',
          enableSorting: false,
        }),
        columnHelper.accessor('disposalCost', {
          cell: (info) => amountFormatter(info.getValue() ?? 0),
          header: 'Disposal Cost',
          enableSorting: false,
        }),
        columnHelper.accessor('totalLifeCycleCost', {
          cell: (info) => amountFormatter(info.getValue() ?? 0),
          header: 'Total Lifecyle',
          enableSorting: false,
        }),
        columnHelper.accessor('roi', {
          cell: (info) => `${info.getValue()}%`,
          header: 'ROI',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[data?.data?.items]] //eslint-disable-line
  );

  const AssetComparisonTable = (
    <Flex width="full" direction="column">
      <DataTable
        columns={columns}
        data={data?.data?.items ?? []}
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
  //   const Filter = (
  //     <Flex width="full" pb="16px">
  //       <GeneralFilter handleApplyFilter={handleSearch} />
  //     </Flex>
  //   );
  return {
    // handleSearch,
    AssetComparisonTable,
    totalPages: data?.data?.totalPages ?? 0,
    pageSize,
    pageNumber,
    setPageNumber,
    setPageSize,
    // Filter,
  };
};

export default useAssetComparisonTable;
