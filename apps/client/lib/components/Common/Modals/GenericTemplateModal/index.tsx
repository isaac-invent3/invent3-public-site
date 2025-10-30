import { GenericModal, TablePagination } from '@repo/ui/components';
import {
  Collapse,
  ModalBody,
  ModalFooter,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import Header from './Header';
import { useEffect, useRef } from 'react';
interface GenericTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  headerName: string;
  subHeading?: string;
  pageSize?: number;
  pageNumber?: number;
  totalPages?: number;
  showDetails?: boolean;
  hideOtherInfoWhenDetailsIsShown?: boolean;
  setShowDetails?: React.Dispatch<React.SetStateAction<boolean>>;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode;
  filters?: React.ReactNode;
  footer?: React.ReactNode;
  extraFooter?: React.ReactNode;
  searchPlaceholder?: string;
}
const GenericTemplateModal = (props: GenericTemplateModalProps) => {
  const {
    isOpen,
    onClose,
    headerName,
    subHeading,
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
    extraFooter,
    searchPlaceholder,
    hideOtherInfoWhenDetailsIsShown = true,
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
      contentStyle={{ maxW: '90vw', width: '1116px', height: { lg: '716px' } }}
      mainModalStyle={{ blockScrollOnMount: false, preserveScrollBarGap: true }}
    >
      <Header
        headerName={headerName}
        subHeading={subHeading}
        setSearch={setSearch}
        openFilter={openFilter}
        setOpenFilter={onToggle}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        hasFilters={!!filters}
        searchPlaceholder={searchPlaceholder}
        hideOtherInfoWhenDetailsIsShown={hideOtherInfoWhenDetailsIsShown}
      />
      <ModalBody m={0} p={0} px="24px" ref={modalBodyRef}>
        <Collapse in={openFilter} animateOpacity>
          {openFilter && filters}
        </Collapse>
        {children}
      </ModalBody>
      {(!showDetails || (showDetails && !hideOtherInfoWhenDetailsIsShown)) && (
        <ModalFooter
          m={0}
          p={0}
          mb="65px"
          pt="16px"
          pr="32px"
          justifyContent="flex-end"
        >
          {footer ?? (
            <VStack width="full" alignItems="flex-end">
              <TablePagination
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalPage={totalPages ?? 0}
              />
              {extraFooter}
            </VStack>
          )}
        </ModalFooter>
      )}
    </GenericModal>
  );
};

export default GenericTemplateModal;
