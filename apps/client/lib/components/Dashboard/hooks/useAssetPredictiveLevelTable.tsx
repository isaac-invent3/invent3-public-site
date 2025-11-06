import { Flex } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { OPERATORS } from '@repo/constants';
import { createColumnHelper } from '@tanstack/react-table';
import { DataTable } from '@repo/ui/components';
import { useSearchAssetPerformanceMutation } from '~/lib/redux/services/dashboard/executive.services';
import { AssetPerformance } from '~/lib/interfaces/dashboard/executive.interfaces';
import { generateSearchCriteria } from '@repo/utils';
import { useGetAssetPerformanceByCategoryQuery } from '~/lib/redux/services/dashboard/assetperformance.services';
import { useAppSelector } from '~/lib/redux/hooks';
import GenericStatusBox from '../../UI/GenericStatusBox';
import { AssetPredictiveSummary } from '~/lib/interfaces/dashboard/predictivemaintenance.interfaces';
import { useGetPredictiveMaintenanceDashboardAssetPredictiveSummaryQuery } from '~/lib/redux/services/dashboard/predictivemaintenance.services';

interface useAssetPredictiveLevelTable {
  search?: string;
  customPageSize?: number;
}

const useAssetPredictiveLevelTable = (props: useAssetPredictiveLevelTable) => {
  const { search, customPageSize } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [searchData, setSearchData] = useState<
    BaseApiResponse<ListResponse<AssetPerformance>> | undefined
  >(undefined);
  const { handleSubmit } = useCustomMutation();
  const [searchAssetPerformance] = useSearchAssetPerformanceMutation({});
  const filters = useAppSelector((state) => state.common.filters);
  const { data, isLoading, isFetching } =
    useGetPredictiveMaintenanceDashboardAssetPredictiveSummaryQuery({
      facilityIds: filters?.facilities,
      assetCategoryIds: filters?.assetCategories,
      datePeriod: filters?.datePeriod?.[0],
      riskThreshold: filters?.datePeriod?.[0],
    });

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

  const columnHelper = createColumnHelper<AssetPredictiveSummary>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('assetName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Asset Name',
          enableSorting: false,
        }),
        columnHelper.accessor('category', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Category',
          enableSorting: false,
        }),
        columnHelper.accessor('facility', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Facility',
          enableSorting: false,
        }),
        columnHelper.accessor('predictedFailure', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Predicted Failure',
          enableSorting: false,
        }),
        columnHelper.accessor('riskScore', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Risk Score',
          enableSorting: false,
        }),
        columnHelper.accessor('anomalies', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Anomalies',
          enableSorting: false,
        }),
        columnHelper.accessor('confidence', {
          cell: (info) => `${info.getValue()}%`,
          header: 'Confidence',
          enableSorting: false,
        }),
        columnHelper.accessor('lastSync', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Last Sync',
          enableSorting: false,
        }),
        columnHelper.accessor('status', {
          cell: (info) => (
            <GenericStatusBox text={info.getValue()} showDot={false} />
          ),
          header: 'Status',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[data?.data]] //eslint-disable-line
  );

  const AssetPredictiveLevelTable = (
    <Flex width="full" direction="column">
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        showFooter={false}
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
    AssetPredictiveLevelTable,
    totalPages: 0,
    pageSize,
    pageNumber,
    setPageNumber,
    setPageSize,
    // Filter,
  };
};

export default useAssetPredictiveLevelTable;
