import { useState } from 'react';
import GenericTemplateModal from '~/lib/components/Common/Modals/GenericTemplateModal';
import useVendorTable from '../../VendorManagement/VendorTable/useVendorTable';
import VendorFilters from '../../VendorManagement/Actions/Filters';
import { VendorFilter } from '~/lib/interfaces/vendor.interfaces';
import { initialFilterData } from '../../VendorManagement';
import { Flex } from '@chakra-ui/react';

interface VendorModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const VendorModal = (props: VendorModalProps) => {
  const { isOpen, onClose } = props;
  const [filterData, setFilterData] = useState<VendorFilter>(initialFilterData);
  const [search, setSearch] = useState('');
  const {
    handleSearch,
    VendorInfoTable,
    totalPages,
    pageSize,
    pageNumber,
    setPageSize,
    setPageNumber,
  } = useVendorTable({
    search,
    showFooter: false,
    filterData,
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
              handleApplyFilter={handleSearch}
              filterData={filterData}
              setFilterData={setFilterData}
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
