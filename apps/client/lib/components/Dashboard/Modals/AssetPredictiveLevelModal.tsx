import { useState } from 'react';
import GenericTemplateModal from '~/lib/components/Common/Modals/GenericTemplateModal';
import useAssetPredictiveLevelTable from '../hooks/useAssetPredictiveLevelTable';

interface AssetPredictiveLevelProps {
  isOpen: boolean;
  onClose: () => void;
}
const AssetPredictiveLevelModal = (props: AssetPredictiveLevelProps) => {
  const { isOpen, onClose } = props;

  const [search, setSearch] = useState('');
  const {
    AssetPredictiveLevelTable,
    totalPages,
    pageSize,
    pageNumber,
    setPageSize,
    setPageNumber,
  } = useAssetPredictiveLevelTable({ search });

  return (
    <>
      <GenericTemplateModal
        isOpen={isOpen}
        onClose={onClose}
        headerName={'Asset Predictive Level'}
        pageSize={pageSize}
        pageNumber={pageNumber}
        totalPages={totalPages}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        // filters={Filter}
      >
        {AssetPredictiveLevelTable}
      </GenericTemplateModal>
    </>
  );
};

export default AssetPredictiveLevelModal;
