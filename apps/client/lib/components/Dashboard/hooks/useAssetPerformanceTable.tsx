import { Flex } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { DATE_PERIOD, DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { OPERATORS } from '@repo/constants';
import { Company } from '~/lib/interfaces/company.interfaces';
import { useSearchCompaniesMutation } from '~/lib/redux/services/company.services';
import { createColumnHelper } from '@tanstack/react-table';
import { amountFormatter } from '~/lib/utils/Formatters';
import { DataTable } from '@repo/ui/components';
import { useGetAssetPerformanceQuery } from '~/lib/redux/services/dashboard/executive.services';
import {
  AssetPerformance,
  FinancialImpact,
} from '~/lib/interfaces/dashboard/executive.interfaces';
import GenericStatusBox from '../../UI/GenericStatusBox';

interface useAssetPerformanceTable {
  search?: string;
  customPageSize?: number;
}

const useAssetPerformanceTable = (props: useAssetPerformanceTable) => {
  const { search, customPageSize } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAssetPerformanceQuery({
    datePeriod: DATE_PERIOD.YEAR,
  });
  const [searchData, setSearchData] = useState<
    BaseApiResponse<ListResponse<Company>> | undefined
  >(undefined);
  const { handleSubmit } = useCustomMutation();
  const [searchLog, { isLoading: searchLoading }] = useSearchCompaniesMutation(
    {}
  );

  const searchCriterion = {
    ...(search && {
      criterion: [
        {
          columnName: 'companyName',
          columnValue: search,
          operation: OPERATORS.Contains,
        },
      ],
    }),
    pageNumber,
    pageSize,
  };

  const handleSearch = useCallback(async () => {
    const response = await handleSubmit(searchLog, searchCriterion, '');
    setSearchData(response?.data);
  }, [searchLog, searchCriterion]);

  // Trigger search when search input changes or pagination updates
  useEffect(() => {
    if (search) {
      //   handleSearch();
    }
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
        // columnHelper.accessor('depreciationRate', {
        //   cell: (info) => `${info.getValue()}%`,
        //   header: 'Usage Rate',
        //   enableSorting: false,
        // }),
        columnHelper.accessor('currentValue', {
          cell: (info) => amountFormatter(info.getValue() ?? 0),
          header: 'Current Value',
          enableSorting: false,
        }),
        columnHelper.accessor('depreciationRate', {
          cell: (info) => `${info.getValue()}%`,
          header: 'Depreciation Rate(%)',
          enableSorting: false,
        }),
        // columnHelper.accessor('status', {
        //   cell: (info) => <GenericStatusBox text={info.getValue()} />,
        //   header: 'Status',
        //   enableSorting: false,
        // }),
      ];

      return baseColumns;
    },
    [[data]] //eslint-disable-line
  );

  const AssetPerformanceTable = (
    <Flex width="full" direction="column">
      <DataTable
        columns={columns}
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
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
    AssetPerformanceTable,
    totalPages:
      search && searchData
        ? searchData.data?.totalPages
        : data?.data?.totalPages,

    pageSize,
    pageNumber,
    setPageNumber,
    setPageSize,
    // Filter,
  };
};

export default useAssetPerformanceTable;
