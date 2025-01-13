import { Flex } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import AssetTable from './AssetTable';
import {
  useGetAllAssetQuery,
  useSearchAssetsMutation,
} from '~/lib/redux/services/asset/general.services';
import { ListResponse } from '@repo/interfaces';
import { Asset } from '~/lib/interfaces/asset/general.interface';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useAppSelector } from '~/lib/redux/hooks';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { generateSearchCriterion } from '@repo/utils';
import { OPERATORS } from '@repo/constants';
import GeneralFilter from '../Filters/GeneralFilter';

interface UseAssetTemplateInfo {
  // eslint-disable-next-line no-unused-vars
  PopoverComponent?: (data: Asset) => JSX.Element;
  // eslint-disable-next-line no-unused-vars
  handleSelectRow: (data: Asset) => void;
  search: string;
}

const useAssetTemplateInfo = (props: UseAssetTemplateInfo) => {
  const { PopoverComponent, handleSelectRow, search } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllAssetQuery(
    {
      pageNumber,
      pageSize,
    },
    { skip: search !== '' }
  );
  const [searchAsset, { isLoading: searchLoading }] = useSearchAssetsMutation(
    {}
  );
  const [searchData, setSearchData] = useState<ListResponse<Asset> | null>(
    null
  );
  const { handleSubmit } = useCustomMutation();
  const { assetFilter: filterData } = useAppSelector((state) => state.asset);

  // Checks if all filterdata is empty
  const isFilterEmpty = _.every(
    filterData,
    (value) => _.isArray(value) && _.isEmpty(value)
  );

  // Search Criterion
  const searchCriterion = {
    ...(search && {
      criterion: [
        {
          columnName: 'assetName',
          columnValue: search,
          operation: OPERATORS.Contains,
        },
      ],
    }),
    ...(!isFilterEmpty && {
      orCriterion: [
        ...filterData.category.map((item) => [
          ...generateSearchCriterion(
            'categoryId',
            [item.value],
            OPERATORS.Equals
          ),
        ]),
        ...filterData.status.map((item) => [
          ...generateSearchCriterion(
            'statusId',
            [item.value],
            OPERATORS.Equals
          ),
        ]),
        ...filterData.region.map((item) => [
          ...generateSearchCriterion('stateId', [item.value], OPERATORS.Equals),
        ]),
        ...filterData.area.map((item) => [
          ...generateSearchCriterion('lgaId', [item.value], OPERATORS.Equals),
        ]),
        ...filterData.branch.map((item) => [
          ...generateSearchCriterion(
            'facilityId',
            [item.value],
            OPERATORS.Equals
          ),
        ]),
      ].filter((criterion) => criterion.length > 0),
    }),
    pageNumber: pageNumber,
    pageSize: pageSize,
  };

  const handleSearch = useCallback(async () => {
    const response = await handleSubmit(searchAsset, searchCriterion, '');
    response?.data?.data && setSearchData(response?.data?.data);
  }, [searchAsset, searchCriterion]);

  // Trigger search when search input changes or pagination updates
  useEffect(() => {
    if (search) {
      handleSearch();
    }
  }, [search, pageNumber, pageSize]);

  // Reset pagination when clearing the search
  useEffect(() => {
    if (!search) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setPageNumber(1);
    }
  }, [search]);

  const AssetTemplateTable = (
    <Flex width="full" direction="column">
      <AssetTable
        data={
          (search || !isFilterEmpty) && searchData
            ? searchData.items
            : (data?.data?.items ?? [])
        }
        isLoading={isLoading}
        isFetching={isFetching || searchLoading}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalPages={
          search && searchData ? searchData?.totalPages : data?.data?.totalPages
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
      <GeneralFilter handleApplyFilter={handleSearch} />
    </Flex>
  );
  return {
    handleSearch,
    AssetTemplateTable,
    totalPages:
      search && searchData
        ? searchData.totalPages
        : (data?.data?.totalPages ?? 0),
    pageSize,
    pageNumber,
    setPageNumber,
    setPageSize,
    Filter,
  };
};

export default useAssetTemplateInfo;
