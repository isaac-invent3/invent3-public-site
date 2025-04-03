import { useState } from 'react';
import GenericTemplateModal from '~/lib/components/Common/Modals/GenericTemplateModal';
import useAssetPerformanceTable from '../hooks/useAssetPerformanceTable';

interface AssetPerformanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const AssetPerformanceModal = (props: AssetPerformanceModalProps) => {
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
        headerName={'Asset Performance'}
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

export default AssetPerformanceModal;
