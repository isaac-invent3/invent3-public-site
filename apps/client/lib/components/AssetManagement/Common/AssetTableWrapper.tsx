import { useDisclosure } from '@chakra-ui/react';
import _ from 'lodash';
import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { useGetAllAssetQuery } from '~/lib/redux/services/asset/general.services';
import {
  setAsset,
  updateSelectedAssetIds,
} from '~/lib/redux/slices/AssetSlice';
import {
  DEFAULT_PAGE_SIZE,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import AssetDetail from '../AssetDetail';
import AssetTable from './AssetTable';

const GeneralAssetTableWrapper = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const searchParams = useSearchParams();
  const assetIdString = searchParams.get(SYSTEM_CONTEXT_DETAILS.ASSETS.slug);
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

  const { data, isLoading, isFetching } = useGetAllAssetQuery(
    {
      pageNumber: currentPage,
      pageSize: 10,
    },
    { skip: !isFilterEmpty }
  );

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
      const sourceItems = data?.data?.items || [];
      const assetIds = selectedRows
        .map((rowId) => sourceItems[rowId]?.assetId) // Access by index and get assetId
        .filter((id): id is number => id !== undefined); // Filter out undefined values
      dispatch(updateSelectedAssetIds(assetIds));
    }
  }, [selectedRows]);

  return (
    <>
      <AssetTable
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        pageNumber={currentPage}
        setPageNumber={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalPages={data?.data?.totalPages}
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
      <AssetDetail onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default GeneralAssetTableWrapper;
