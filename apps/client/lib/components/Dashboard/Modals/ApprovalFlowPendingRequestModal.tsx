import { useState } from 'react';
import GenericTemplateModal from '~/lib/components/Common/Modals/GenericTemplateModal';
import useApprovalFlowPendingRequestTable from '../hooks/useApprovalFlowPendingRequest';

interface ApprovalFlowPendingRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const ApprovalFlowPendingRequestModal = (
  props: ApprovalFlowPendingRequestModalProps
) => {
  const { isOpen, onClose } = props;

  const [search, setSearch] = useState('');
  const {
    ApprovalFlowPendingRequestTable,
    totalPages,
    pageSize,
    pageNumber,
    setPageSize,
    setPageNumber,
  } = useApprovalFlowPendingRequestTable({ search });

  return (
    <>
      <GenericTemplateModal
        isOpen={isOpen}
        onClose={onClose}
        headerName={'Approval Flow Pending Requests'}
        pageSize={pageSize}
        pageNumber={pageNumber}
        totalPages={totalPages}
        setSearch={setSearch}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        // filters={Filter}
      >
        {ApprovalFlowPendingRequestTable}
      </GenericTemplateModal>
    </>
  );
};

export default ApprovalFlowPendingRequestModal;
