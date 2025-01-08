import React, { useState } from 'react';

import GenericTemplateModal from '~/lib/components/Common/Modals/GenericTemplateModal';
import useAssetTemplateInfo from '../../../Common/useAssetTemplateInfo';
import useExistingDocumentTable from './useExistingDocumentTable';
import { SlideTransition } from '@repo/ui/components';

interface ExistingDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  handleNewExistingDocumentsIds: (ids: number[]) => void;
}
const ExistingDocumentModal = (props: ExistingDocumentModalProps) => {
  const { isOpen, onClose, handleNewExistingDocumentsIds } = props;
  const [search, setSearch] = useState('');
  const [selectedAssetId, setSelectedAssetId] = useState<number | undefined>(
    undefined
  );
  const [showAssetDocuments, setShowAssetDocuments] = useState(false);

  const {
    ExistingDocumentTable,
    Footer,
    totalPages: documentTotalPages,
    pageSize: documentPageSize,
    pageNumber: documentPageNumber,
    setPageSize: documentSetPageSize,
    setPageNumber: docuementSetPageNumber,
  } = useExistingDocumentTable({
    handleNewExistingDocumentsIds,
    search,
    assetId: selectedAssetId,
    onClose: () => {
      setShowAssetDocuments(false);
      onClose();
    },
  });

  const {
    AssetTemplateTable,
    Filter,
    totalPages: assetTotalPages,
    pageSize: assetPageSize,
    pageNumber: assetPageNumber,
    setPageSize: assetSetPageSize,
    setPageNumber: assetSetPageNumber,
  } = useAssetTemplateInfo({
    handleSelectRow: (data) => {
      setSelectedAssetId(data?.assetId);
      setShowAssetDocuments(true);
    },
    search,
  });

  const pageSize = showAssetDocuments ? documentPageSize : assetPageSize;
  const pageNumber = showAssetDocuments ? documentPageNumber : assetPageNumber;
  const totalPages = showAssetDocuments ? documentTotalPages : assetTotalPages;
  const setPageSize = showAssetDocuments
    ? documentSetPageSize
    : assetSetPageSize;
  const setPageNumber = showAssetDocuments
    ? docuementSetPageNumber
    : assetSetPageNumber;
  const headerName = showAssetDocuments ? 'Asset Documents' : 'Assets';
  const footer = showAssetDocuments ? Footer : undefined;
  const filter = showAssetDocuments ? undefined : Filter;
  const searchPlaceholder = showAssetDocuments
    ? 'Search by name or creator'
    : 'Search by asset name';

  return (
    <GenericTemplateModal
      isOpen={isOpen}
      onClose={onClose}
      headerName={headerName}
      pageSize={pageSize}
      pageNumber={pageNumber}
      totalPages={totalPages}
      showDetails={showAssetDocuments}
      setShowDetails={setShowAssetDocuments}
      setSearch={setSearch}
      setPageNumber={setPageNumber}
      setPageSize={setPageSize}
      searchPlaceholder={searchPlaceholder}
      footer={footer}
      filters={filter}
      hideOtherInfoWhenDetailsIsShown={false}
    >
      {!showAssetDocuments && AssetTemplateTable}

      <SlideTransition trigger={showAssetDocuments}>
        {showAssetDocuments && ExistingDocumentTable}
      </SlideTransition>
    </GenericTemplateModal>
  );
};

export default ExistingDocumentModal;
