import { Flex, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { GenericPopover } from '@repo/ui/components';
import Link from 'next/link';
import { useState } from 'react';
import GenericTemplateModal from '~/lib/components/Common/Modals/GenericTemplateModal';
import { Asset } from '~/lib/interfaces/asset/general.interface';
import { useAppDispatch } from '~/lib/redux/hooks';
import { setAsset } from '~/lib/redux/slices/AssetSlice';
import AssetDetail from '../../AssetDetail';

import useAssetTemplateInfo from '../../Common/useAssetTemplateInfo';
import { ROUTES } from '~/lib/utils/constants';

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
            href={`/${ROUTES.ASSETS}/add?assetId=${data?.assetId}`}
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
  const dispatch = useAppDispatch();
  const {
    isOpen: isOpenDetail,
    onClose: onCloseDetail,
    onOpen: onOpenDetail,
  } = useDisclosure();

  const handleSelectRow = (data: Asset) => {
    dispatch(setAsset(data));
    onOpenDetail();
  };

  const [search, setSearch] = useState('');
  const {
    AssetTemplateTable,
    totalPages,
    pageSize,
    pageNumber,
    setPageSize,
    setPageNumber,
    Filter,
  } = useAssetTemplateInfo({
    handleSelectRow,
    search,
    PopoverComponent: (data) => (
      <TablePopover data={data} handleViewDetails={onOpenDetail} />
    ),
  });

  return (
    <>
      <GenericTemplateModal
        isOpen={isOpen}
        onClose={onClose}
        headerName={'Assets'}
        pageSize={pageSize}
        pageNumber={pageNumber}
        totalPages={totalPages}
        setSearch={setSearch}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        filters={Filter}
      >
        {AssetTemplateTable}
      </GenericTemplateModal>
      <AssetDetail
        onClose={onCloseDetail}
        isOpen={isOpenDetail}
        type="template"
      />
    </>
  );
};

export default AssetTemplateModal;
