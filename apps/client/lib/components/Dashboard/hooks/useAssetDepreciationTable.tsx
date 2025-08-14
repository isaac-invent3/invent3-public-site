import { Flex } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { OPERATORS } from '@repo/constants';
import { createColumnHelper } from '@tanstack/react-table';
import { amountFormatter } from '~/lib/utils/Formatters';
import { DataTable } from '@repo/ui/components';
import { useSearchAssetDepreciationFinancialImpactMutation } from '~/lib/redux/services/dashboard/executive.services';
import { FinancialImpact } from '~/lib/interfaces/dashboard/executive.interfaces';
import { useAppDispatch } from '~/lib/redux/hooks';
import { generateSearchCriteria } from '@repo/utils';

interface useAssetDepreciationTable {
  search?: string;
  customPageSize?: number;
}

const useAssetDepreciationTable = (props: useAssetDepreciationTable) => {
  const { search, customPageSize } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [searchData, setSearchData] = useState<
    BaseApiResponse<ListResponse<FinancialImpact>> | undefined
  >(undefined);
  const { handleSubmit } = useCustomMutation();
  const [searchFinancialImpact, { isLoading }] =
    useSearchAssetDepreciationFinancialImpactMutation({});

  const handleSearch = useCallback(async () => {
    const { orCriterion } = generateSearchCriteria(
      undefined,
      {
        search: [search],
      },
      {
        search: {
          key: ['assetName', 'assetCategory'],
          operator: OPERATORS.Contains,
        },
      },
      undefined
    );
    const payload = {
      pageNumber,
      pageSize: customPageSize ?? pageSize,
      orCriterion,
    };

    const response = await handleSubmit(searchFinancialImpact, payload, '');
    setSearchData(response?.data);
  }, [searchFinancialImpact, search, pageSize, pageNumber]);

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

  const columnHelper = createColumnHelper<FinancialImpact>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('assetName', {
          cell: (info) => info.getValue(),
          header: 'Asset Name',
          enableSorting: false,
        }),
        columnHelper.accessor('assetCategory', {
          cell: (info) => info.getValue(),
          header: 'Category',
          enableSorting: false,
        }),
        columnHelper.accessor('initialValue', {
          cell: (info) => amountFormatter(info.getValue() ?? 0),
          header: 'Initial Cost(₦)',
          enableSorting: false,
        }),
        columnHelper.accessor('currentValue', {
          cell: (info) => amountFormatter(info.getValue() ?? 0),
          header: 'Current Value(₦)',
          enableSorting: false,
        }),
        columnHelper.accessor('depreciationRate', {
          cell: (info) => `${info.getValue()}%`,
          header: 'Depreciation Rate(%)',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[searchData?.data?.items]] //eslint-disable-line
  );

  const AssetDepreciationTable = (
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
  //   const Filter = (
  //     <Flex width="full" pb="16px">
  //       <GeneralFilter handleApplyFilter={handleSearch} />
  //     </Flex>
  //   );
  return {
    handleSearch,
    AssetDepreciationTable,
    totalPages: search && searchData ? searchData.data?.totalPages : 0,
    pageSize,
    pageNumber,
    setPageNumber,
    setPageSize,
    // Filter,
  };
};

export default useAssetDepreciationTable;
