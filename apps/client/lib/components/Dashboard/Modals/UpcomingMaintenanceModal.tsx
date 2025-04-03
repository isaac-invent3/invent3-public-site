import { useState } from 'react';
import GenericTemplateModal from '~/lib/components/Common/Modals/GenericTemplateModal';
import useCompanyTable from '../../CompanyManagement/Table/useCompanyTable';
import useUpcomingMaintenanceTable from '../hooks/useUpcomingMaintenanceTable';

interface UpcomingMaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  perUser?: boolean;
}
const UpcomingMaintenanceModal = (props: UpcomingMaintenanceModalProps) => {
  const { isOpen, onClose, perUser } = props;

  const [search, setSearch] = useState('');
  const {
    UpcomingMaintenanceTable,
    totalPages,
    pageSize,
    pageNumber,
    setPageSize,
    setPageNumber,
  } = useUpcomingMaintenanceTable({
    search,
    showFooter: false,
    perUser,
  });

  return (
    <>
      <GenericTemplateModal
        isOpen={isOpen}
        onClose={onClose}
        headerName={'Maintenance Schedule'}
        pageSize={pageSize}
        pageNumber={pageNumber}
        totalPages={totalPages}
        setSearch={setSearch}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        // filters={Filter}
      >
        {UpcomingMaintenanceTable}
      </GenericTemplateModal>
    </>
  );
};

export default UpcomingMaintenanceModal;
