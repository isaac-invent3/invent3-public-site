import { Flex, useDisclosure } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';

import { useSearchParams } from 'next/navigation';
import {
  useGetAllAssetQuery,
  useGetAssetInfoHeaderByIdQuery,
  useSearchAssetsMutation,
} from '~/lib/redux/services/asset/general.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';
import AssetTable from './Common/AssetTable';
import AssetFilterDisplay from './Filters/AssetFilterDisplay';
import { generateSearchCriterion } from '~/lib/utils/helperFunctions';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  setAsset,
  updateSelectedAssetIds,
} from '~/lib/redux/slices/AssetSlice';
import AssetDetail from './AssetDetail';
import { Asset } from '~/lib/interfaces/asset/general.interface';
import { ListResponse } from '@repo/interfaces';

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
  const assetIdString = searchParams.get('asset');
  const assetId = assetIdString ? Number(assetIdString) : undefined;
  const { handleSubmit } = useCustomMutation();
  const {
    assetFilter: filterData,
    asset,
    selectedAssetIds,
  } = useAppSelector((state) => state.asset);
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

  const { data: assetData } = useGetAssetInfoHeaderByIdQuery(
    { id: assetId ?? undefined },
    {
      skip: !assetId,
    }
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
    ...(search
      ? {
          criterion: [
            {
              columnName: 'assetName',
              columnValue: search,
              operation: OPERATORS.Contains,
            },
          ],
        }
      : {}),
    ...(!isFilterEmpty
      ? {
          orCriterion: [
            ...(filterData.category.map((item) => item.value).length > 0
              ? [
                  generateSearchCriterion(
                    'categoryId',
                    filterData.category.map((item) => item.value),
                    OPERATORS.Equals
                  ),
                ]
              : []),
            ...(filterData.status.map((item) => item.value).length > 0
              ? [
                  generateSearchCriterion(
                    'statusId',
                    filterData.status.map((item) => item.value),
                    OPERATORS.Equals
                  ),
                ]
              : []),
            ...(filterData.region.map((item) => item.value).length > 0
              ? [
                  generateSearchCriterion(
                    'stateId',
                    filterData.region.map((item) => item.value),
                    OPERATORS.Equals
                  ),
                ]
              : []),
            ...(filterData.area.map((item) => item.value).length > 0
              ? [
                  generateSearchCriterion(
                    'lgaId',
                    filterData.area.map((item) => item.value),
                    OPERATORS.Equals
                  ),
                ]
              : []),
            ...(filterData.branch.map((item) => item.value).length > 0
              ? [
                  generateSearchCriterion(
                    'facilityId',
                    filterData.branch.map((item) => item.value),
                    OPERATORS.Equals
                  ),
                ]
              : []),
          ],
        }
      : {}),
    pageNumber: currentPage,
    pageSize: pageSize,
  };

  // Function that handles search/filters
  const handleSearch = useCallback(async () => {
    if (search || !isFilterEmpty) {
      const response = await handleSubmit(searchAsset, searchCriterion, '');
      setSearchData(response?.data?.data);
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

  // Set if an assetData asset exist, mark it as selected
  useEffect(() => {
    if (assetData?.data) {
      dispatch(setAsset(assetData?.data));
      onOpen();
    }
  }, [assetData]);

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
          }}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          showFooter={true}
          emptyLines={25}
          isSelectable={true}
        />
      </Flex>
      <AssetDetail data={asset} onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default ListView;
