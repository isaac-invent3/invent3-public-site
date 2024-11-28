import { Flex, useDisclosure } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';

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
import AssetFilterDisplay from './Filters/AssetFilterDisplay';
import { generateSearchCriterion } from '~/lib/utils/helperFunctions';
import { useAppSelector } from '~/lib/redux/hooks';

interface ListViewProps {
  search: string;
  openFilter: boolean;
  activeFilter: 'bulk' | 'general' | null;
}

const ListView = (props: ListViewProps) => {
  const { search, activeFilter, openFilter } = props;
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const searchParams = useSearchParams();
  const assetId = searchParams.get('asset');
  const { handleSubmit } = useCustomMutation();
  const filterData = useAppSelector((state) => state.asset.assetFilter);

  // Checks if all filterdata is empty
  const isFilterEmpty = _.every(
    filterData,
    (value) => _.isArray(value) && _.isEmpty(value)
  );

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

  // Open the drawer if there is a selected asset
  useEffect(() => {
    if (selectedAsset) {
      onOpen();
    }
  }, [selectedAsset]);

  // Remove selected asset once the drawer is closed.
  useEffect(() => {
    if (!isOpen) {
      setSelectedAsset(null);
    }
  }, [isOpen]);

  // Set if an assetData asset exist, mark it as selected
  useEffect(() => {
    if (assetData?.data) {
      setSelectedAsset(assetData?.data);
    }
  }, [assetData]);

  return (
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
        handleSelectRow={setSelectedAsset}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        showFooter={true}
        emptyLines={25}
        isSelectable={true}
      />

      {selectedAsset && (
        <AssetDetail data={selectedAsset} onClose={onClose} isOpen={isOpen} />
      )}
    </Flex>
  );
};

export default ListView;
