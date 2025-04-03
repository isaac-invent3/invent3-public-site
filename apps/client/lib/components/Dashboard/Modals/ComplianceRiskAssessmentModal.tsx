import { useState } from 'react';
import GenericTemplateModal from '~/lib/components/Common/Modals/GenericTemplateModal';
import useApprovalFlowPendingRequestTable from '../hooks/useApprovalFlowPendingRequest';
import useComplianceRiskAssessmentTable from '../hooks/useComplianceRiskAssessmentTable';

interface ComplianceRiskAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const ComplianceRiskAssessmentModal = (
  props: ComplianceRiskAssessmentModalProps
) => {
  const { isOpen, onClose } = props;

  const [search, setSearch] = useState('');
  const {
    ComplianceRiskAssessmentTable,
    totalPages,
    pageSize,
    pageNumber,
    setPageSize,
    setPageNumber,
  } = useComplianceRiskAssessmentTable({ search });

  return (
    <>
      <GenericTemplateModal
        isOpen={isOpen}
        onClose={onClose}
        headerName={'Compliance & Risk Assessment'}
        pageSize={pageSize}
        pageNumber={pageNumber}
        totalPages={totalPages}
        setSearch={setSearch}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        // filters={Filter}
      >
        {ComplianceRiskAssessmentTable}
      </GenericTemplateModal>
    </>
  );
};

export default ComplianceRiskAssessmentModal;
