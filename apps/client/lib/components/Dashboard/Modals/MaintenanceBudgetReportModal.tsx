import { useState } from 'react';
import GenericTemplateModal from '~/lib/components/Common/Modals/GenericTemplateModal';
import useMaintenanceBudgetReportTable from '../hooks/useMaintenanceBudgetReportTable';

interface MaintenanceBudgetReportProps {
  isOpen: boolean;
  onClose: () => void;
}
const MaintenanceBudgetReportModal = (props: MaintenanceBudgetReportProps) => {
  const { isOpen, onClose } = props;

  const [search, setSearch] = useState('');
  const {
    MaintenanceBudgetReportTable,
    totalPages,
    pageSize,
    pageNumber,
    setPageSize,
    setPageNumber,
  } = useMaintenanceBudgetReportTable({ search });

  return (
    <>
      <GenericTemplateModal
        isOpen={isOpen}
        onClose={onClose}
        headerName={'Maintenance Budget Report'}
        pageSize={pageSize}
        pageNumber={pageNumber}
        totalPages={totalPages}
        setSearch={setSearch}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        // filters={Filter}
      >
        {MaintenanceBudgetReportTable}
      </GenericTemplateModal>
    </>
  );
};

export default MaintenanceBudgetReportModal;
