import React, { useCallback, useEffect, useState } from 'react';
import { Flex, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';
import { SearchResponse } from '~/lib/interfaces/general.interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import {
  useGetallAssetQuery,
  useSearchAssetsMutation,
} from '~/lib/redux/services/asset/general.services';
import GenericTemplateModal from '~/lib/components/Common/Modals/GenericTemplateModal';
import AssetTable from '../../Common/AssetTable';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import AssetDetail from '../../AssetDetail';
import { setAsset } from '~/lib/redux/slices/AssetSlice';
import { GenericPopover } from '@repo/ui/components';
import { Asset } from '~/lib/interfaces/asset.interfaces';
import Link from 'next/link';

interface TablePopoverProps {
  data: Asset;
  handleViewDetails: () => void;
}
const TablePopover = (props: TablePopoverProps) => {
  const { data, handleViewDetails } = props;
  return (
    <Flex
      width="24px"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <GenericPopover width="129px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text cursor="pointer" onClick={handleViewDetails}>
            View Details
          </Text>
          <Link
            href={`/asset-management/add?assetId=${data?.assetId}`}
            style={{ width: '100%' }}
          >
            <Text cursor="pointer">Use as Template</Text>
          </Link>
        </VStack>
      </GenericPopover>
    </Flex>
  );
};

interface AssetTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const AssetTemplateModal = (props: AssetTemplateModalProps) => {
  const { isOpen, onClose } = props;
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const dispatch = useAppDispatch();
  const asset = useAppSelector((state) => state.asset.asset);
  const {
    isOpen: isOpenDetail,
    onClose: onCloseDetail,
    onOpen: onOpenDetail,
  } = useDisclosure();
  const { data, isLoading, isFetching } = useGetallAssetQuery(
    {
      pageNumber,
      pageSize,
    },
    { skip: search !== '' }
  );
  const [searchAsset, { isLoading: searchLoading }] = useSearchAssetsMutation(
    {}
  );
  const [searchData, setSearchData] = useState<SearchResponse | null>(null);
  const { handleSubmit } = useCustomMutation();
  const [showDetails, setShowDetails] = useState(false);

  const searchCriterion = {
    criterion: [
      {
        columnName: 'assetName',
        columnValue: search,
        operation: OPERATORS.Contains,
      },
    ],
    pageNumber,
    pageSize,
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
  }, [search, pageNumber, pageSize]);

  // Reset pagination when clearing the search
  useEffect(() => {
    if (!search) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setPageNumber(1);
    }
  }, [search]);

  return (
    <>
      <GenericTemplateModal
        isOpen={isOpen}
        onClose={onClose}
        headerName={'Assets'}
        pageSize={pageSize}
        pageNumber={pageNumber}
        totalPages={
          search && searchData ? searchData.totalPages : (data?.totalPages ?? 0)
        }
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        setSearch={setSearch}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
      >
        <Flex width="full" direction="column">
          <AssetTable
            data={
              search && searchData
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
              search && searchData
                ? searchData?.totalPages
                : data?.data?.totalPages
            }
            handleSelectRow={(row) => {
              dispatch(setAsset(row));
              onOpenDetail();
            }}
            showFooter={false}
            emptyLines={25}
            isSelectable={false}
            PopoverComponent={(data) => (
              <TablePopover data={data} handleViewDetails={onOpenDetail} />
            )}
          />
        </Flex>
      </GenericTemplateModal>
      <AssetDetail
        data={asset}
        onClose={onCloseDetail}
        isOpen={isOpenDetail}
        type="template"
      />
    </>
  );
};

export default AssetTemplateModal;
