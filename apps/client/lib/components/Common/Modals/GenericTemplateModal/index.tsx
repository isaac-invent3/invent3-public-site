import { GenericModal, TablePagination } from '@repo/ui/components';
import {
  Collapse,
  Flex,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import Header from './Header';
import { useEffect, useRef } from 'react';
interface GenericTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  headerName: string;
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  showDetails: boolean;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode;
  filters?: React.ReactNode;
  footer?: React.ReactNode;
}
const GenericTemplateModal = (props: GenericTemplateModalProps) => {
  const {
    isOpen,
    onClose,
    headerName,
    pageSize,
    pageNumber,
    setPageSize,
    setPageNumber,
    setSearch,
    children,
    showDetails,
    setShowDetails,
    filters,
    totalPages,
    footer,
  } = props;
  const { isOpen: openFilter, onToggle } = useDisclosure();
  const modalBodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTop = 0;
    }
  }, [showDetails]);

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{ maxW: '80vw', width: '1116px', height: '716px' }}
      mainModalStyle={{ blockScrollOnMount: false, preserveScrollBarGap: true }}
    >
      <Header
        headerName={headerName}
        setSearch={setSearch}
        openFilter={openFilter}
        setOpenFilter={onToggle}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        hasFilters={!!filters}
      />
      <ModalBody m={0} p={0} px="24px" ref={modalBodyRef}>
        <Flex />
        <Collapse in={openFilter} animateOpacity>
          {openFilter && filters}
        </Collapse>
        {children}
      </ModalBody>
      {!showDetails && (
        <ModalFooter
          m={0}
          p={0}
          mb="65px"
          pt="16px"
          pr="32px"
          justifyContent="flex-end"
        >
          {footer ?? (
            <TablePagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              pageSize={pageSize}
              setPageSize={setPageSize}
              totalPage={totalPages}
            />
          )}
        </ModalFooter>
      )}
    </GenericModal>
  );
};

export default GenericTemplateModal;
