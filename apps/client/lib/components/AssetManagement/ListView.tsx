import { Flex, useDisclosure } from '@chakra-ui/react';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import { ListResponse } from '@repo/interfaces';
import { generateSearchCriteria } from '@repo/utils';
import { useSearchParams } from 'next/navigation';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { Asset, FilterInput } from '~/lib/interfaces/asset/general.interface';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  assetApi,
  useGetAllAssetQuery,
  useSearchAssetsMutation,
} from '~/lib/redux/services/asset/general.services';
import {
  setAsset,
  updateSelectedAssetIds,
} from '~/lib/redux/slices/AssetSlice';
import {
  DEFAULT_PAGE_SIZE,
  OPERATORS,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import AssetDetail from './AssetDetail';
import AssetTable from './Common/AssetTable';
import AssetFilterDisplay from './Filters/AssetFilterDisplay';
import useSignalR from '~/lib/hooks/useSignalR';
import useSignalREventHandler from '~/lib/hooks/useSignalREventHandler';
import { usePageFilter } from '~/lib/hooks/usePageFilter';

interface ListViewProps {
  search: string;
  openFilter: boolean;
  activeFilter: 'bulk' | 'general' | null;
}

export const initialAssetFilter = {
  category: [],
  status: [],
  region: [],
  area: [],
  branch: [],
  columnId: [],
};

const ListView = (props: ListViewProps) => {
  const { search, activeFilter, openFilter } = props;
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const searchParams = useSearchParams();
  const assetIdString = searchParams?.get(SYSTEM_CONTEXT_DETAILS.ASSETS.slug);
  const { handleSubmit } = useCustomMutation();
  const { updateSearchParam } = useCustomSearchParams();

  const { selectedAssetIds } = useAppSelector((state) => state.asset);
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchAsset, { isLoading: searchLoading }] = useSearchAssetsMutation(
    {}
  );
  const [searchData, setSearchData] = useState<ListResponse<Asset> | undefined>(
    undefined
  );

  const {
    filterData,
    setFilterData,
    appliedFilter,
    isFilterEmpty,
    applyFilter,
    clearFilter,
  } = usePageFilter<FilterInput>(initialAssetFilter);

  const { data, isLoading, isFetching } = useGetAllAssetQuery(
    {
      pageNumber: pageNumber,
      pageSize: pageSize,
    },
    {
      skip: search !== '' || !isFilterEmpty,
    }
  );

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
  }, [search, appliedFilter, pageNumber, pageSize]);

  // Reset pagination when clearing the search
  useEffect(() => {
    if (!search || isFilterEmpty) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setPageNumber(1);
    }
  }, [search, appliedFilter]);

  // Open Detail Modal if assetId exists
  useEffect(() => {
    if (assetIdString) onOpen();
  }, [assetIdString]);

  // Reset Selected Row when SelectedAssetIds array is emptied
  useEffect(() => {
    if (selectedAssetIds.length == 0 && selectedRows.length > 0) {
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
    if (selectedRows.length === 0) {
      // Reset when no rows are selected
      dispatch(updateSelectedAssetIds([]));
    }
  }, [selectedRows]);

  // SignalR Connection
  const connectionState = useSignalR('asset-hub');

  useSignalREventHandler({
    eventName: 'CreateAsset',
    connectionState,
    callback: (newAsset) => {
      // Update the query cache when a new asset is received
      const parsedAsset = JSON.parse(newAsset);
      dispatch(
        assetApi.util.updateQueryData(
          'getAllAsset',
          {
            pageNumber: pageNumber,
            pageSize,
          },
          (draft) => {
            if (draft?.data?.items) {
              draft?.data?.items.unshift(parsedAsset); // Add new asset to the beginning
            }
          }
        )
      );
    },
  });

  useSignalREventHandler({
    eventName: 'UpdateAsset',
    connectionState,
    callback: (updatedAsset) => {
      // Update the query cache when an asset is updated
      const parsedAsset = JSON.parse(updatedAsset);
      dispatch(
        assetApi.util.updateQueryData(
          'getAllAsset',
          {
            pageNumber: pageNumber,
            pageSize,
          },
          (draft) => {
            if (draft?.data?.items) {
              const index = draft.data.items.findIndex(
                (item) => item.assetId === parsedAsset.assetId
              );
              if (index !== -1) {
                draft.data.items[index] = parsedAsset; // Update the existing asset
              }
            }
          }
        )
      );
    },
  });

  return (
    <>
      <Flex width="full" direction="column" pt="16px">
        <Flex width="full" mb="8px">
          <AssetFilterDisplay
            activeFilter={activeFilter}
            isOpen={openFilter}
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
