import { useState } from 'react';
import GenericTemplateModal from '~/lib/components/Common/Modals/GenericTemplateModal';
import useCompanyTable from '../../CompanyManagement/Table/useCompanyTable';

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const CompanyModal = (props: CompanyModalProps) => {
  const { isOpen, onClose } = props;

  const [search, setSearch] = useState('');
  const {
    CompanyInfoTable,
    totalPages,
    pageSize,
    pageNumber,
    setPageSize,
    setPageNumber,
  } = useCompanyTable({
    search,
    showFooter: false,
  });

  return (
    <>
      <GenericTemplateModal
        isOpen={isOpen}
        onClose={onClose}
        headerName={'Company Management'}
        pageSize={pageSize}
        pageNumber={pageNumber}
        totalPages={totalPages}
        setSearch={setSearch}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        // filters={Filter}
      >
        {CompanyInfoTable}
      </GenericTemplateModal>
    </>
  );
};

export default CompanyModal;
