import { useState } from 'react';
import GenericTemplateModal from '~/lib/components/Common/Modals/GenericTemplateModal';
import useAssetPerformanceTable from '../hooks/useAssetPerformanceTable';

interface AssetDepreciationModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const AssetDepreciationModal = (props: AssetDepreciationModalProps) => {
  const { isOpen, onClose } = props;

  const [search, setSearch] = useState('');
  const {
    AssetPerformanceTable,
    totalPages,
    pageSize,
    pageNumber,
    setPageSize,
    setPageNumber,
  } = useAssetPerformanceTable({ search });

  return (
    <>
      <GenericTemplateModal
        isOpen={isOpen}
        onClose={onClose}
        headerName={'Financial Impact of Asset Depreciation'}
        pageSize={pageSize}
        pageNumber={pageNumber}
        totalPages={totalPages}
        setSearch={setSearch}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        // filters={Filter}
      >
        {AssetPerformanceTable}
      </GenericTemplateModal>
    </>
  );
};

export default AssetDepreciationModal;
