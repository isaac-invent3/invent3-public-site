import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import GenericTemplateModal from '~/lib/components/Common/Modals/GenericTemplateModal';
import {
  Asset,
  ValidColumnNames,
} from '~/lib/interfaces/asset/general.interface';
import { useAppDispatch } from '~/lib/redux/hooks';
import { setAsset } from '~/lib/redux/slices/AssetSlice';
import useAssetTemplateInfo from '../Common/useAssetTemplateInfo';
import AssetDetail from '../AssetDetail';

interface AssetListModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  columnId: number;
  columnName: ValidColumnNames;
}
const AssetListModal = (props: AssetListModalProps) => {
  const { isOpen, onClose, name, columnId, columnName } = props;
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
    columnType: columnName,
    columnId: columnId,
  });

  return (
    <>
      <GenericTemplateModal
        isOpen={isOpen}
        onClose={onClose}
        headerName={name ?? 'Assets'}
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
      <AssetDetail onClose={onCloseDetail} isOpen={isOpenDetail} />
    </>
  );
};

export default AssetListModal;
