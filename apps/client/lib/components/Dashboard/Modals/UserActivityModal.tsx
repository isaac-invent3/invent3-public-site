import { useState } from 'react';
import GenericTemplateModal from '~/lib/components/Common/Modals/GenericTemplateModal';
import useUserActivityTable from '../hooks/useUserActivityTable';

interface UserActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const UserActivityModal = (props: UserActivityModalProps) => {
  const { isOpen, onClose } = props;

  const [search, setSearch] = useState('');
  const {
    UserActivityTable,
    totalPages,
    pageSize,
    pageNumber,
    setPageSize,
    setPageNumber,
  } = useUserActivityTable({});

  return (
    <>
      <GenericTemplateModal
        isOpen={isOpen}
        onClose={onClose}
        headerName={'User Activity'}
        pageSize={pageSize}
        pageNumber={pageNumber}
        totalPages={totalPages}
        setSearch={setSearch}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        // filters={Filter}
      >
        {UserActivityTable}
      </GenericTemplateModal>
    </>
  );
};

export default UserActivityModal;
