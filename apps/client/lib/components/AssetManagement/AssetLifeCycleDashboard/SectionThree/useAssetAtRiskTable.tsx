import { Flex } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { createColumnHelper } from '@tanstack/react-table';
import { dateFormatter } from '~/lib/utils/Formatters';
import { DataTable } from '@repo/ui/components';
import { Asset } from '~/lib/interfaces/asset/general.interface';
import { useGetAssetAtRiskQuery } from '~/lib/redux/services/asset/lifeCycle.services';

interface useAssetRiskTable {
  search?: string;
  customPageSize?: number;
}

const useAssetRiskTable = (props: useAssetRiskTable) => {
  const { search, customPageSize } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [searchData, setSearchData] = useState<
    BaseApiResponse<ListResponse<Asset>> | undefined
  >(undefined);
  const { handleSubmit } = useCustomMutation();
  const { data, isLoading } = useGetAssetAtRiskQuery({
    pageSize: customPageSize ?? pageSize,
    pageNumber,
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

  //   const response = await handleSubmit(searchAssetAtRisk, payload, '');
  //   setSearchData(response?.data);
  // }, [searchAssetAtRisk, search, pageSize, pageNumber]);

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
        columnHelper.accessor('assetCategory', {
          cell: (info) => info.getValue(),
          header: 'Category',
          enableSorting: true,
        }),
        columnHelper.accessor('assetCode', {
          cell: (info) => info.getValue(),
          header: 'Lifecycle Stage',
          enableSorting: false,
        }),
        columnHelper.accessor('dateCreated', {
          cell: (info) => dateFormatter(info.getValue(), 'DD / MM / YYYY'),
          header: 'Forcasted Replacement Date',
          enableSorting: false,
        }),
        columnHelper.accessor('assetId', {
          cell: (info) => info.getValue(),
          header: 'Health Score',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[searchData?.data?.items]] //eslint-disable-line
  );

  const AssetRiskTable = (
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
    AssetRiskTable,
    totalPages: search && searchData ? searchData.data?.totalPages : 0,
    pageSize,
    pageNumber,
    setPageNumber,
    setPageSize,
    // Filter,
  };
};

export default useAssetRiskTable;
