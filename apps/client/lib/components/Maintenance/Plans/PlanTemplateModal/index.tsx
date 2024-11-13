import React, { useCallback, useEffect, useState } from 'react';
import GenericModal from '~/lib/components/UI/Modal';
import Header from './Header';
import { ModalBody, ModalFooter } from '@chakra-ui/react';
import Pagination from '~/lib/components/UI/Table/Pagination';
import {
  useGetAllMaintenancePlanQuery,
  useSearchMaintenancePlanMutation,
} from '~/lib/redux/services/maintenance/plan.services';
import TemplateTable from './TemplateTable';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';
import { SearchResponse } from '~/lib/interfaces/general.interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';

interface PlanTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const PlanTemplateModal = (props: PlanTemplateModalProps) => {
  const { isOpen, onClose } = props;
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllMaintenancePlanQuery(
    {
      pageNumber,
      pageSize,
    },
    { skip: search !== '' }
  );

  const [searchPlan, { isLoading: searchLoading }] =
    useSearchMaintenancePlanMutation({});
  const [searchData, setSearchData] = useState<SearchResponse | null>(null);
  const { handleSubmit } = useCustomMutation();

  const searchCriterion = {
    criterion: [
      {
        columnName: 'planName',
        columnValue: search,
        operation: OPERATORS.Contains,
      },
    ],
    pageNumber,
    pageSize,
  };

  const handleSearch = useCallback(async () => {
    const response = await handleSubmit(searchPlan, searchCriterion, '');
    setSearchData(response?.data?.data);
  }, [searchPlan, searchCriterion]);

  // Trigger search when search input changes or pagination updates
  useEffect(() => {
    if (search) {
      handleSearch();
    }
  }, [search, pageNumber, pageSize]);

  // Reset pagination when clearing the search
  useEffect(() => {
    if (!search) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setPageNumber(1);
    }
  }, [search]);

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{ maxW: '80vw', width: '1116px', height: '716px' }}
    >
      <Header setSearch={setSearch} />
      <ModalBody m={0} p={0} px="24px">
        <TemplateTable
          isLoading={isLoading || searchLoading}
          isFetching={isFetching}
          data={
            search && searchData ? searchData.items : (data?.data?.items ?? [])
          }
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
          totalPage={
            search && searchData
              ? searchData?.totalPages
              : data?.data?.totalPages
          }
        />
      </ModalFooter>
    </GenericModal>
  );
};

export default PlanTemplateModal;
