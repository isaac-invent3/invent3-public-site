import { Flex, useDisclosure } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';
import { Asset } from '~/lib/interfaces/asset.interfaces';
import {
  useGetallAssetQuery,
  useGetAssetInfoHeaderByIdQuery,
  useSearchAssetsMutation,
} from '~/lib/redux/services/asset/general.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { SearchResponse } from '~/lib/interfaces/general.interfaces';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';
import AssetTable from './Common/AssetTable';
import AssetDetail from './AssetDetail';

interface ListViewProps {
  search: string;
}

const ListView = (props: ListViewProps) => {
  const { search } = props;
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const searchParams = useSearchParams();
  const assetId = searchParams.get('asset');
  const { handleSubmit } = useCustomMutation();
  const [searchAsset, { isLoading: searchLoading }] = useSearchAssetsMutation(
    {}
  );
  const [searchData, setSearchData] = useState<SearchResponse | null>(null);

  const { data: assetData } = useGetAssetInfoHeaderByIdQuery(assetId, {
    skip: !assetId,
  });
  const { data, isLoading, isFetching } = useGetallAssetQuery(
    {
      pageNumber: currentPage,
      pageSize: pageSize,
    },
    { skip: search !== '' }
  );

  const searchCriterion = {
    criterion: [
      {
        columnName: 'assetName',
        columnValue: search,
        operation: OPERATORS.Contains,
      },
    ],
    pageNumber: currentPage,
    pageSize: pageSize,
  };

  const handleSearch = useCallback(async () => {
    const response = await handleSubmit(searchAsset, searchCriterion, '');
    setSearchData(response?.data?.data);
  }, [searchAsset, searchCriterion]);

  // Trigger search when search input changes or pagination updates
  useEffect(() => {
    if (search) {
      handleSearch();
    }
  }, [search, currentPage, pageSize]);

  // Reset pagination when clearing the search
  useEffect(() => {
    if (!search) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setCurrentPage(1);
    }
  }, [search]);

  useEffect(() => {
    if (selectedAsset) {
      onOpen();
    }
  }, [selectedAsset]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedAsset(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (assetData?.data) {
      setSelectedAsset(assetData?.data);
    }
  }, [assetData]);

  return (
    <Flex width="full" mt="8px">
      <AssetTable
        data={
          search && searchData ? searchData.items : (data?.data?.items ?? [])
        }
        isLoading={isLoading}
        isFetching={isFetching || searchLoading}
        pageNumber={currentPage}
        setPageNumber={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalPages={
          search && searchData ? searchData?.totalPages : data?.data?.totalPages
        }
        handleSelectRow={setSelectedAsset}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        showFooter={true}
        emptyLines={10}
        isSelectable={true}
      />

      {selectedAsset && (
        <AssetDetail data={selectedAsset} onClose={onClose} isOpen={isOpen} />
      )}
    </Flex>
  );
};

export default ListView;
