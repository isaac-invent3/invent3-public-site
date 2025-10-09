import { useState } from 'react';
import GenericTemplateModal from '~/lib/components/Common/Modals/GenericTemplateModal';
import useAssetComparisonTable from './useAssetComparisonTable';

interface AssetComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const AssetComparisonModal = (props: AssetComparisonModalProps) => {
  const { isOpen, onClose } = props;

  const [search, setSearch] = useState('');
  const {
    AssetComparisonTable,
    totalPages,
    pageSize,
    pageNumber,
    setPageSize,
    setPageNumber,
  } = useAssetComparisonTable({ search });

  return (
    <>
      <GenericTemplateModal
        isOpen={isOpen}
        onClose={onClose}
        headerName={'Asset Comparison Modal'}
        pageSize={pageSize}
        pageNumber={pageNumber}
        totalPages={totalPages}
        setSearch={undefined}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        // filters={Filter}
      >
        {AssetComparisonTable}
      </GenericTemplateModal>
    </>
  );
};

export default AssetComparisonModal;
