import React, { useState } from 'react';
import GenericModal from '~/lib/components/UI/Modal';
import Header from './Header';
import { ModalBody, ModalFooter } from '@chakra-ui/react';
import Pagination from '~/lib/components/UI/Table/Pagination';
// import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { useGetAllMaintenancePlanQuery } from '~/lib/redux/services/maintenance/plan.services';
import TemplateTable from './TemplateTable';

interface PlanTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const PlanTemplateModal = (props: PlanTemplateModalProps) => {
  const { isOpen, onClose } = props;
  // eslint-disable-next-line no-unused-vars
  const [_, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isFetching } = useGetAllMaintenancePlanQuery({
    pageNumber,
    pageSize,
  });

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{ maxW: '90vw', width: '1116px', height: '716px' }}
    >
      <Header setSearch={setSearch} />
      <ModalBody m={0} p={0} px="24px">
        <TemplateTable
          isLoading={isLoading}
          isFetching={isFetching}
          data={data?.data?.items}
        />
      </ModalBody>
      <ModalFooter
        m={0}
        p={0}
        mb="65px"
        pt="16px"
        pr="32px"
        justifyContent="flex-end"
      >
        <Pagination
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalPage={data?.data?.totalPages ?? 1}
        />
      </ModalFooter>
    </GenericModal>
  );
};

export default PlanTemplateModal;
