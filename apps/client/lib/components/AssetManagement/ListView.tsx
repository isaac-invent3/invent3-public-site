import { Flex, useDisclosure } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';

import { useSearchParams } from 'next/navigation';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import {
  useGetAllAssetQuery,
  useSearchAssetsMutation,
} from '~/lib/redux/services/asset/general.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import {
  DEFAULT_PAGE_SIZE,
  OPERATORS,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import AssetTable from './Common/AssetTable';
import AssetFilterDisplay from './Filters/AssetFilterDisplay';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  setAsset,
  updateSelectedAssetIds,
} from '~/lib/redux/slices/AssetSlice';
import AssetDetail from './AssetDetail';
import { Asset } from '~/lib/interfaces/asset/general.interface';
import { ListResponse } from '@repo/interfaces';
import { generateSearchCriterion } from '@repo/utils';

interface ListViewProps {
  search: string;
  openFilter: boolean;
  activeFilter: 'bulk' | 'general' | null;
}

const ListView = (props: ListViewProps) => {
  const { search, activeFilter, openFilter } = props;
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const searchParams = useSearchParams();
  const assetIdString = searchParams.get(SYSTEM_CONTEXT_DETAILS.ASSETS.slug);
  const { handleSubmit } = useCustomMutation();
  const { updateSearchParam } = useCustomSearchParams();

  const { assetFilter: filterData, selectedAssetIds } = useAppSelector(
    (state) => state.asset
  );
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Checks if all filterdata is empty
  const isFilterEmpty = _.every(
    filterData,
    (value) => _.isArray(value) && _.isEmpty(value)
  );

  const [searchAsset, { isLoading: searchLoading }] = useSearchAssetsMutation(
    {}
  );
  const [searchData, setSearchData] = useState<ListResponse<Asset> | null>(
    null
  );

  const { data, isLoading, isFetching } = useGetAllAssetQuery(
    {
      pageNumber: currentPage,
      pageSize: pageSize,
    },
    { skip: search !== '' || !isFilterEmpty }
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
    pageNumber: currentPage,
    pageSize: pageSize,
  };

  // Function that handles search/filters
  const handleSearch = useCallback(async () => {
    if (search || !isFilterEmpty) {
      const response = await handleSubmit(searchAsset, searchCriterion, '');
      response?.data?.data && setSearchData(response?.data?.data);
    }
  }, [searchAsset, searchCriterion]);

  // Trigger search when search input changes or pagination updates
  useEffect(() => {
    if (search) {
      handleSearch();
    }
  }, [search, currentPage, pageSize]);

  // Reset pagination when the search input is cleared or apply filter flag is false
  useEffect(() => {
    if (!search && isFilterEmpty) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setCurrentPage(1);
    }
  }, [search, isFilterEmpty]);

  // Open Detail Modal if assetId exists
  useEffect(() => {
    if (assetIdString) onOpen();
  }, [assetIdString]);

  // Reset Selected Row when SelectedAssetIds array is emptied
  useEffect(() => {
    if (selectedAssetIds.length == 0) {
      setSelectedRows([]);
    }
  }, [selectedAssetIds]);

  // Update SelectedAssetIds array when selected row is greater than 1
  useEffect(() => {
    if (selectedRows.length > 0) {
      const sourceItems = searchData?.items || data?.data?.items || [];
      const assetIds = selectedRows
        .map((rowId) => sourceItems[rowId]?.assetId) // Access by index and get assetId
        .filter((id): id is number => id !== undefined); // Filter out undefined values
      dispatch(updateSelectedAssetIds(assetIds));
    }
  }, [selectedRows]);

  return (
    <>
      <Flex width="full" direction="column" pt="16px">
        <Flex width="full" mb="8px">
          <AssetFilterDisplay
            activeFilter={activeFilter}
            isOpen={openFilter}
            handleApplyFilter={handleSearch}
          />
        </Flex>
        <AssetTable
          data={
            (search || !isFilterEmpty) && searchData
              ? searchData.items
              : (data?.data?.items ?? [])
          }
          isLoading={isLoading}
          isFetching={isFetching || searchLoading}
          pageNumber={currentPage}
          setPageNumber={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalPages={
            (search || !isFilterEmpty) && searchData
              ? searchData?.totalPages
              : data?.data?.totalPages
          }
          handleSelectRow={(row) => {
            onOpen();
            dispatch(setAsset(row));
            updateSearchParam(SYSTEM_CONTEXT_DETAILS.ASSETS.slug, row.assetId);
          }}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          showFooter={true}
          emptyLines={25}
          isSelectable={true}
        />
      </Flex>
      <AssetDetail onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default ListView;
