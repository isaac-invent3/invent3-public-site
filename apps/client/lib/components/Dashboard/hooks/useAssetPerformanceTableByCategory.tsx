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
import { useSearchAssetPerformanceMutation } from '~/lib/redux/services/dashboard/executive.services';
import {
  AssetPerformance,
  FinancialImpact,
} from '~/lib/interfaces/dashboard/executive.interfaces';
import { generateSearchCriteria } from '@repo/utils';
import { useGetAssetPerformanceByCategoryQuery } from '~/lib/redux/services/dashboard/assetperformance.services';
import { useAppSelector } from '~/lib/redux/hooks';
import { DashboardByCateogry } from '~/lib/interfaces/dashboard/assetperformance.interfaces';
import GenericStatusBox from '../../UI/GenericStatusBox';

interface useAssetPerformanceTableByCategory {
  search?: string;
  customPageSize?: number;
}

const useAssetPerformanceTableByCategory = (
  props: useAssetPerformanceTableByCategory
) => {
  const { search, customPageSize } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [searchData, setSearchData] = useState<
    BaseApiResponse<ListResponse<AssetPerformance>> | undefined
  >(undefined);
  const { handleSubmit } = useCustomMutation();
  const [searchAssetPerformance] = useSearchAssetPerformanceMutation({});
  const filters = useAppSelector((state) => state.common.filters);
  const { data, isLoading, isFetching } = useGetAssetPerformanceByCategoryQuery(
    {
      facilityIds: filters?.facilities,
      assetCategoryIds: filters?.assetCategories,
      datePeriod: filters?.datePeriod?.[0],
    }
  );

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

    const response = await handleSubmit(searchAssetPerformance, payload, '');
    setSearchData(response?.data);
  }, [searchAssetPerformance, search, pageSize, pageNumber]);

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

  const columnHelper = createColumnHelper<DashboardByCateogry>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('assetCategory', {
          cell: (info) => info.getValue(),
          header: 'Category',
          enableSorting: false,
        }),
        columnHelper.accessor('assetCount', {
          cell: (info) => info.getValue(),
          header: 'Asset Count',
          enableSorting: false,
        }),
        columnHelper.accessor('avgUptime', {
          cell: (info) => `${info.getValue()}%`,
          header: 'Avg Uptime(%)',
          enableSorting: false,
        }),
        columnHelper.accessor('avgHealthScore', {
          cell: (info) => `${info.getValue()}%`,
          header: 'Avg Health Score',
          enableSorting: false,
        }),
        columnHelper.accessor('mbtf', {
          cell: (info) => info.getValue(),
          header: 'MTBF (hrs)',
          enableSorting: false,
        }),
        columnHelper.accessor('mttr', {
          cell: (info) => info.getValue(),
          header: 'MTTR (hrs)',
          enableSorting: false,
        }),
        columnHelper.accessor('riskLevel', {
          cell: (info) => (
            <GenericStatusBox
              text={info.getValue()}
              colorCode={info.row.original.displayColorCode}
            />
          ),
          header: 'Risk Level',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[data?.data?.items]] //eslint-disable-line
  );

  const AssetPerformanceTable = (
    <Flex width="full" direction="column">
      <DataTable
        columns={columns}
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        showFooter={data?.data ? data?.data?.totalPages > 1 : false}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
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
    totalPages: search && searchData ? searchData.data?.totalPages : 0,
    pageSize,
    pageNumber,
    setPageNumber,
    setPageSize,
    // Filter,
  };
};

export default useAssetPerformanceTableByCategory;
