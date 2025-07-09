import { Flex } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import AssetTable from './AssetTable';
import {
  useGetAllAssetQuery,
  useSearchAssetsMutation,
} from '~/lib/redux/services/asset/general.services';
import { ListResponse } from '@repo/interfaces';
import {
  Asset,
  ValidColumnNames,
} from '~/lib/interfaces/asset/general.interface';
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
  columnId?: number;
  columnType?: ValidColumnNames;
}

const useAssetTemplateInfo = (props: UseAssetTemplateInfo) => {
  const { PopoverComponent, handleSelectRow, search, columnId, columnType } =
    props;
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
  const [searchData, setSearchData] = useState<ListResponse<Asset> | null>(
    null
  );
  const { handleSubmit } = useCustomMutation();
  const { assetFilter: filterData } = useAppSelector((state) => state.asset);

  // Checks if all filterdata is empty
  const isFilterEmpty =
    _.every(filterData, (value) => _.isArray(value) && _.isEmpty(value)) &&
    columnId === undefined;

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
        [
          ...generateSearchCriterion(
            'categoryId',
            filterData.category.map((item) => item.value),
            OPERATORS.Equals
          ),
        ],
        [
          ...generateSearchCriterion(
            'AssetStatusId',
            filterData.status.map((item) => item.value),
            OPERATORS.Equals
          ),
        ],
        [
          ...generateSearchCriterion(
            'stateId',
            filterData.region.map((item) => item.value),
            OPERATORS.Equals
          ),
        ],
        [
          ...generateSearchCriterion(
            'lgaId',
            filterData.area.map((item) => item.value),
            OPERATORS.Equals
          ),
        ],
        [
          ...generateSearchCriterion(
            'facilityId',
            filterData.branch.map((item) => item.value),
            OPERATORS.Equals
          ),
        ],
        ...(columnType && columnId
          ? [
              [
                ...generateSearchCriterion(
                  `${columnType}ID`,
                  [columnId],
                  OPERATORS.Equals
                ),
              ],
            ]
          : []),
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
    if (search || !isFilterEmpty) {
      handleSearch();
    }
  }, [search, pageNumber, pageSize, isFilterEmpty]);

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
      <GeneralFilter handleApplyFilter={handleSearch} columnType={columnType} />
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
  };
};

export default useAssetTemplateInfo;
