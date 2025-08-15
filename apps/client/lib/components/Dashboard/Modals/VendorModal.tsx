import { useState } from 'react';
import GenericTemplateModal from '~/lib/components/Common/Modals/GenericTemplateModal';
import useVendorTable from '../../VendorManagement/VendorTable/useVendorTable';
import VendorFilters from '../../VendorManagement/Actions/Filters';
import { Flex } from '@chakra-ui/react';

interface VendorModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const VendorModal = (props: VendorModalProps) => {
  const { isOpen, onClose } = props;
  const [search, setSearch] = useState('');
  const {
    handleSearch,
    VendorInfoTable,
    totalPages,
    pageSize,
    pageNumber,
    setPageSize,
    setPageNumber,
    filterData,
    setFilterData,
    clearFilter,
    applyFilter,
  } = useVendorTable({
    search,
    showFooter: false,
  });

  return (
    <>
      <GenericTemplateModal
        isOpen={isOpen}
        onClose={onClose}
        headerName={'Vendor Management'}
        pageSize={pageSize}
        pageNumber={pageNumber}
        totalPages={totalPages}
        setSearch={setSearch}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        filters={
          <Flex width="full" py="8px">
            <VendorFilters
              filterData={filterData}
              setFilterData={setFilterData}
              handleApplyFilter={() => {
                applyFilter();
                handleSearch(); // manually trigger
              }}
              handleClearFilter={() => {
                clearFilter();
                handleSearch(); // to reload default data
              }}
            />
          </Flex>
        }
      >
        {VendorInfoTable}
      </GenericTemplateModal>
    </>
  );
};

export default VendorModal;
