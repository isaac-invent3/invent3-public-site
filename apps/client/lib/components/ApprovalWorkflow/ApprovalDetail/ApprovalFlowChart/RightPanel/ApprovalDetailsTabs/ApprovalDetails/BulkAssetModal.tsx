import { Flex, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { DataTable, GenericPopover } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import AssetDetail from '~/lib/components/AssetManagement/AssetDetail';
import GenericTemplateModal from '~/lib/components/Common/Modals/GenericTemplateModal';
import { AssetBulkActionMap } from '~/lib/interfaces/asset/bulkAction.interfaces';
import { useGetAssetBulkActionMapsQuery } from '~/lib/redux/services/asset/bulkAction.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface TablePopoverProps {
  handleViewDetails: () => void;
}
const TablePopover = (props: TablePopoverProps) => {
  const { handleViewDetails } = props;
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
        </VStack>
      </GenericPopover>
    </Flex>
  );
};

interface BulkAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  bulkActionId: number;
}
const BulkAssetModal = (props: BulkAssetModalProps) => {
  const { isOpen, onClose, bulkActionId } = props;
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [pageNumber, setPageNumber] = useState(1);
  const [assetId, setAssetId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const {
    isOpen: isOpenDetail,
    onClose: onCloseDetail,
    onOpen: onOpenDetail,
  } = useDisclosure();

  const {
    data: bulkActionMaps,
    isLoading,
    isFetching,
  } = useGetAssetBulkActionMapsQuery({ bulkActionId: bulkActionId });

  const columnHelper = createColumnHelper<AssetBulkActionMap>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('assetId', {
          cell: (info) => info.getValue(),
          header: '#',
          enableSorting: false,
        }),
        columnHelper.accessor('assetName', {
          cell: (info) => info.getValue(),
          header: 'Asset Name',
          enableSorting: false,
        }),
        columnHelper.display({
          id: 'actions',
          header: '',
          cell: (info) => (
            <TablePopover
              handleViewDetails={() => {
                setAssetId(info.row.original.assetId);
                onOpenDetail();
              }}
            />
          ),
        }),
      ];
      return baseColumns;
    },
    [[bulkActionMaps?.data?.items]] //eslint-disable-line
  );

  return (
    <>
      <GenericTemplateModal
        isOpen={isOpen}
        onClose={onClose}
        headerName={'Assets'}
        pageSize={pageSize}
        pageNumber={pageNumber}
        totalPages={bulkActionMaps?.data?.totalPages || 0}
        setSearch={setSearch}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        filters={undefined}
      >
        <DataTable
          columns={columns}
          data={bulkActionMaps?.data?.items ?? []}
          isLoading={isLoading}
          isFetching={isFetching}
          totalPages={bulkActionMaps?.data?.totalPages || 0}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
          pageSize={pageSize}
          setPageSize={setPageSize}
          handleSelectRow={(data) => {
            setAssetId(data.assetId);
            onOpenDetail();
          }}
          showFooter={false}
          emptyLines={10}
          isSelectable={false}
          maxTdWidth="200px"
        />
      </GenericTemplateModal>
      {assetId && (
        <AssetDetail
          onClose={onCloseDetail}
          isOpen={isOpenDetail}
          defaultAssetId={assetId}
        />
      )}
    </>
  );
};

export default BulkAssetModal;
