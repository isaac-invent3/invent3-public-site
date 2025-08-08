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
import {
  executiveDashboardApis,
  useGetAssetDepreciationFinancialImpactQuery,
} from '~/lib/redux/services/dashboard/executive.services';
import { FinancialImpact } from '~/lib/interfaces/dashboard/executive.interfaces';
import useSignalR from '~/lib/hooks/useSignalR';
import useSignalREventHandler from '~/lib/hooks/useSignalREventHandler';
import { useAppDispatch } from '~/lib/redux/hooks';

interface useAssetDepreciationTable {
  search?: string;
  customPageSize?: number;
}

const useAssetDepreciationTable = (props: useAssetDepreciationTable) => {
  const { search, customPageSize } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } =
    useGetAssetDepreciationFinancialImpactQuery({
      datePeriod: DATE_PERIOD.YEAR,
      pageNumber,
      pageSize: customPageSize ?? pageSize,
    });
  const [searchData, setSearchData] = useState<
    BaseApiResponse<ListResponse<Company>> | undefined
  >(undefined);
  const { handleSubmit } = useCustomMutation();
  const dispatch = useAppDispatch();
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

  // SignalR Connection
  const connectionState = useSignalR('assetDepreciation-hub');

  useSignalREventHandler({
    eventName: 'CreateAssetDepreciation',
    connectionState,
    callback: (newAssetDepreciation) => {
      // Update the query cache when a new asset depreciation is received
      const parsedAssetDepreciation = JSON.parse(newAssetDepreciation);
      dispatch(
        executiveDashboardApis.util.updateQueryData(
          'getAssetDepreciationFinancialImpact',
          {
            // pageNumber,
            // pageSize,
            datePeriod: DATE_PERIOD.YEAR,
          },
          (draft) => {
            if (draft?.data?.items) {
              draft?.data?.items.unshift(parsedAssetDepreciation); // Add new vendor to the beginning
            }
          }
        )
      );
    },
  });

  useSignalREventHandler({
    eventName: 'UpdateAssetDepreciation',
    connectionState,
    callback: (updatedAssetDepreciation) => {
      // Update the query cache when a vendor is updated
      const parsedAssetDepreciation = JSON.parse(updatedAssetDepreciation);
      dispatch(
        executiveDashboardApis.util.updateQueryData(
          'getAssetDepreciationFinancialImpact',
          {
            // pageNumber,
            // pageSize,
            datePeriod: DATE_PERIOD.YEAR,
          },
          (draft) => {
            if (draft?.data?.items) {
              const index = draft.data.items.findIndex(
                (item) =>
                  item.depreciationId === parsedAssetDepreciation.depreciationId
              );
              if (index !== -1) {
                draft.data.items[index] = parsedAssetDepreciation;
              }
            }
          }
        )
      );
    },
  });

  useSignalREventHandler({
    eventName: 'DeleteAssetDepreciation',
    connectionState,
    callback: (deleteAssetDepreciation) => {
      // Update the query cache when an asset depreciation is deleted
      const parsedAssetDepreciation = JSON.parse(deleteAssetDepreciation);
      dispatch(
        executiveDashboardApis.util.updateQueryData(
          'getAssetDepreciationFinancialImpact',
          {
            // pageNumber,
            // pageSize,
            datePeriod: DATE_PERIOD.YEAR,
          },
          (draft) => {
            if (draft?.data?.items) {
              draft.data.items = draft.data.items.filter(
                (item) =>
                  item.depreciationId !== parsedAssetDepreciation.depreciationId
              ); // Remove the deleted asset depreciation
            }
          }
        )
      );
    },
  });

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
          header: 'Initial Cost($)',
          enableSorting: false,
        }),
        columnHelper.accessor('currentValue', {
          cell: (info) => amountFormatter(info.getValue() ?? 0),
          header: 'Current Value($)',
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
    [[data]] //eslint-disable-line
  );

  const AssetDepreciationTable = (
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
    AssetDepreciationTable,
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

export default useAssetDepreciationTable;
