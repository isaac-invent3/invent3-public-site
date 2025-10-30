import { useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
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
  name?: string;
  subheading?: string;
  columnId?: number | string;
  columnName?: string;
  isSelectable?: boolean;
  handleAssets?: (assets: Asset[]) => void;
  renderFooter?: (
    handleReserve: () => void,
    handleCancel: () => void
  ) => React.ReactNode;
}
const AssetListModal = (props: AssetListModalProps) => {
  const {
    isOpen,
    onClose,
    name,
    subheading,
    columnId,
    columnName,
    isSelectable,
    handleAssets,
    renderFooter,
  } = props;
  const dispatch = useAppDispatch();
  const {
    isOpen: isOpenDetail,
    onClose: onCloseDetail,
    onOpen: onOpenDetail,
  } = useDisclosure();

  const [selectedAssets, setSelectedAssets] = useState<Asset[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleSelectRow = (data: Asset) => {
    // if not selectable, open detail
    if (!isSelectable) {
      dispatch(setAsset(data));
      onOpenDetail();
      return;
    }
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
    applyFilter,
    assets,
  } = useAssetTemplateInfo({
    handleSelectRow,
    search,
    columnType: columnName,
    columnId: columnId,
    isSelectable: isSelectable,
    selectedRows,
    setSelectedRows,
  });

  useEffect(() => {
    applyFilter();
  }, []);

  const handleReserve = () => {
    console.log({ selectedRows });
    const selectedAssets = assets.filter((_, index) =>
      selectedRows.includes(index)
    );
    console.log({ selectedAssets });

    if (handleAssets) handleAssets(selectedAssets);
    onClose();
  };

  return (
    <>
      <GenericTemplateModal
        isOpen={isOpen}
        onClose={onClose}
        headerName={name ?? 'Assets'}
        subHeading={subheading}
        pageSize={pageSize}
        pageNumber={pageNumber}
        totalPages={totalPages}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        filters={Filter}
        extraFooter={renderFooter ? renderFooter(handleReserve, onClose) : null}
      >
        {AssetTemplateTable}
      </GenericTemplateModal>
      <AssetDetail onClose={onCloseDetail} isOpen={isOpenDetail} />
    </>
  );
};

export default AssetListModal;
