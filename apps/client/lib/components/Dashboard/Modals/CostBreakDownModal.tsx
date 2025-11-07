import { useState } from 'react';
import GenericTemplateModal from '~/lib/components/Common/Modals/GenericTemplateModal';
import useCostBreakdownTable from '../hooks/useCostBreakdownTable';

interface CostBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const CostBreakdownModal = (props: CostBreakdownModalProps) => {
  const { isOpen, onClose } = props;

  const [search, setSearch] = useState('');
  const {
    CostBreakDownTable,
    totalPages,
    pageSize,
    pageNumber,
    setPageSize,
    setPageNumber,
  } = useCostBreakdownTable({ search });

  return (
    <>
      <GenericTemplateModal
        isOpen={isOpen}
        onClose={onClose}
        headerName={'Cost BreakDown'}
        pageSize={pageSize}
        pageNumber={pageNumber}
        totalPages={totalPages}
        setSearch={setSearch}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        // filters={Filter}
      >
        {CostBreakDownTable}
      </GenericTemplateModal>
    </>
  );
};

export default CostBreakdownModal;
