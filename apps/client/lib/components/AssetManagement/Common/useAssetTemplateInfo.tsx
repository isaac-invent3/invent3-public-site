import { Flex } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import AssetTable from './AssetTable';
import {
  useGetAllAssetQuery,
  useSearchAssetsMutation,
} from '~/lib/redux/services/asset/general.services';
import { ListResponse, Option } from '@repo/interfaces';
import {
  Asset,
  FilterInput,
  ValidColumnNames,
} from '~/lib/interfaces/asset/general.interface';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { generateSearchCriteria } from '@repo/utils';
import { OPERATORS } from '@repo/constants';
import GeneralFilter from '../Filters/GeneralFilter';
import { usePageFilter } from '~/lib/hooks/usePageFilter';

interface UseAssetTemplateInfo {
  // eslint-disable-next-line no-unused-vars
  PopoverComponent?: (data: Asset) => JSX.Element;
  // eslint-disable-next-line no-unused-vars
  handleSelectRow: (data: Asset) => void;
  search: string;
  columnId?: number;
  columnType?: ValidColumnNames;
}

const useAssetTemplateInfo = (props: UseAssetTemplateInfo) => {
  const { PopoverComponent, handleSelectRow, search, columnId, columnType } =
    props;
  const initialAssetFilter = {
    category: [],
    status: [],
    region: [],
    area: [],
    branch: [],
    columnId:
      columnId && columnType
        ? [{ label: columnType, value: columnId } as unknown as Option]
        : [],
  };

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllAssetQuery(
    {
      pageNumber,
      pageSize,
    },
    { skip: search !== '' || columnId !== undefined }
  );
  const [searchAsset, { isLoading: searchLoading }] = useSearchAssetsMutation(
    {}
  );
  const [searchData, setSearchData] = useState<ListResponse<Asset> | undefined>(
    undefined
  );
  const { handleSubmit } = useCustomMutation();

  const {
    filterData,
    setFilterData,
    appliedFilter,
    isFilterEmpty,
    applyFilter,
    clearFilter,
  } = usePageFilter<FilterInput>(initialAssetFilter);

  const handleSearch = useCallback(async () => {
    const { orCriterion } = generateSearchCriteria(
      search,
      appliedFilter,
      {
        category: {
          key: 'categoryId',
          operator: OPERATORS.Equals,
        },
        status: { key: 'AssetStatusId', operator: OPERATORS.Equals },
        region: { key: 'stateId', operator: OPERATORS.Equals },
        area: { key: 'lgaId', operator: OPERATORS.Equals },
        branch: { key: 'facilityId', operator: OPERATORS.Equals },
        columnId: { key: `${columnType}ID`, operator: OPERATORS.Equals },
      },
      ['assetName']
    );
    const payload = {
      pageNumber,
      pageSize,
      orCriterion,
    };

    if (orCriterion.length > 0) {
      const response = await handleSubmit(searchAsset, payload, '');
      setSearchData(response?.data?.data);
    }
  }, [searchAsset, search, appliedFilter, pageNumber, pageSize]);

  // Trigger search when search or input changes or applied filter changes or pagination updates
  useEffect(() => {
    if (search || !isFilterEmpty) {
      handleSearch();
    }
  }, [search, appliedFilter, pageNumber, pageSize, columnType, columnId]);

  // Reset pagination when clearing the search
  useEffect(() => {
    if (!search || isFilterEmpty) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setPageNumber(1);
    }
  }, [search, appliedFilter]);

  const AssetTemplateTable = (
    <Flex width="full" direction="column">
      <AssetTable
        data={
          (search || !isFilterEmpty) && searchData
            ? searchData.items
            : (data?.data?.items ?? [])
        }
        isLoading={isLoading || (columnId !== undefined && searchLoading)}
        isFetching={isFetching || searchLoading}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalPages={
          (search || !isFilterEmpty) && searchData
            ? searchData?.totalPages
            : data?.data?.totalPages
        }
        handleSelectRow={(row) => {
          handleSelectRow(row);
        }}
        showFooter={false}
        emptyLines={25}
        isSelectable={false}
        PopoverComponent={(data) =>
          PopoverComponent ? PopoverComponent(data) : undefined
        }
      />
    </Flex>
  );
  const Filter = (
    <Flex width="full" pb="16px">
      <GeneralFilter
        filterData={filterData}
        setFilterData={setFilterData}
        onApply={() => {
          applyFilter();
          handleSearch(); // manually trigger
        }}
        onClear={() => {
          clearFilter();
          handleSearch(); // to reload default data
        }}
        columnType={columnType}
      />
    </Flex>
  );
  return {
    handleSearch,
    AssetTemplateTable,
    totalPages:
      (search || !isFilterEmpty) && searchData
        ? searchData.totalPages
        : (data?.data?.totalPages ?? 0),
    pageSize,
    pageNumber,
    setPageNumber,
    setPageSize,
    Filter,
    applyFilter,
  };
};

export default useAssetTemplateInfo;
