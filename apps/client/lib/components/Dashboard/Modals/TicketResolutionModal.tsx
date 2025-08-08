import { useState } from 'react';
import GenericTemplateModal from '~/lib/components/Common/Modals/GenericTemplateModal';
import useTicketResolutionTable from '../hooks/useTicketResolutionTable';

interface MaintenanceBudgetReportProps {
  isOpen: boolean;
  onClose: () => void;
}
const TicketResolutionModal = (props: MaintenanceBudgetReportProps) => {
  const { isOpen, onClose } = props;

  const [search, setSearch] = useState('');
  const {
    TicketResolutionTable,
    totalPages,
    pageSize,
    pageNumber,
    setPageSize,
    setPageNumber,
  } = useTicketResolutionTable({ search });

  return (
    <>
      <GenericTemplateModal
        isOpen={isOpen}
        onClose={onClose}
        headerName={'Ticket Resolution Performance'}
        pageSize={pageSize}
        pageNumber={pageNumber}
        totalPages={totalPages}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        // filters={Filter}
      >
        {TicketResolutionTable}
      </GenericTemplateModal>
    </>
  );
};

export default TicketResolutionModal;
