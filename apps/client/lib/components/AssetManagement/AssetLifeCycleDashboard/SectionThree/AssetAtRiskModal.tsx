import { useState } from 'react';
import GenericTemplateModal from '~/lib/components/Common/Modals/GenericTemplateModal';
import useAssetRiskTable from './useAssetAtRiskTable';

interface AssetAtRiskModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const AssetAtRiskModal = (props: AssetAtRiskModalProps) => {
  const { isOpen, onClose } = props;

  const [search, setSearch] = useState('');
  const {
    AssetRiskTable,
    totalPages,
    pageSize,
    pageNumber,
    setPageSize,
    setPageNumber,
  } = useAssetRiskTable({ search });

  return (
    <>
      <GenericTemplateModal
        isOpen={isOpen}
        onClose={onClose}
        headerName={'At-Risk Assets'}
        pageSize={pageSize}
        pageNumber={pageNumber}
        totalPages={totalPages}
        setSearch={setSearch}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        // filters={Filter}
      >
        {AssetRiskTable}
      </GenericTemplateModal>
    </>
  );
};

export default AssetAtRiskModal;
