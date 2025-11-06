import { useState } from 'react';
import GenericTemplateModal from '~/lib/components/Common/Modals/GenericTemplateModal';
import useAssetPerformanceTableByCategory from '../hooks/useAssetPerformanceTableByCategory';

interface MaintenanceBudgetReportProps {
  isOpen: boolean;
  onClose: () => void;
}
const AssetPerformanceByCategoryModal = (
  props: MaintenanceBudgetReportProps
) => {
  const { isOpen, onClose } = props;

  const [search, setSearch] = useState('');
  const {
    AssetPerformanceTable,
    totalPages,
    pageSize,
    pageNumber,
    setPageSize,
    setPageNumber,
  } = useAssetPerformanceTableByCategory({ search });

  return (
    <>
      <GenericTemplateModal
        isOpen={isOpen}
        onClose={onClose}
        headerName={'Asset Performance by Category'}
        pageSize={pageSize}
        pageNumber={pageNumber}
        totalPages={totalPages}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        // filters={Filter}
      >
        {AssetPerformanceTable}
      </GenericTemplateModal>
    </>
  );
};

export default AssetPerformanceByCategoryModal;
