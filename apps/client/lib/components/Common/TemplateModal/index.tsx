import React, { useCallback, useEffect, useState } from 'react';
import GenericModal from '~/lib/components/UI/Modal';
import Header from './Header';
import {
  Collapse,
  Flex,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import Pagination from '~/lib/components/UI/Table/Pagination';
import TemplateTable from './TemplateTable';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';
import {
  ListResponse,
  SearchResponse,
} from '~/lib/interfaces/general.interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import TemplateFilters from './Header/Filters';
import SlideTransition from '~/lib/components/UI/SlideTransition';
import { useSearchTemplatesMutation } from '~/lib/redux/services/template.services';
import { Template } from '~/lib/interfaces/template.interfaces';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ListResponse<Template> | undefined;
  headerName: string;
  isLoading: boolean;
  isFetching: boolean;
  pageSize: number;
  pageNumber: number;
  search: string;
  selectedTemplate: Template | null;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<Template | null>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode;
}
const TemplateModal = (props: TemplateModalProps) => {
  const {
    isOpen,
    onClose,
    data,
    headerName,
    isLoading,
    isFetching,
    pageSize,
    pageNumber,
    setPageSize,
    setPageNumber,
    search,
    setSearch,
    selectedTemplate,
    setSelectedTemplate,
    children,
  } = props;
  const { isOpen: openFilter, onToggle } = useDisclosure();
  const [searchTemplate, { isLoading: searchLoading }] =
    useSearchTemplatesMutation({});
  const [searchData, setSearchData] = useState<SearchResponse | null>(null);
  const { handleSubmit } = useCustomMutation();

  const searchCriterion = {
    criterion: [
      {
        columnName: 'templateName',
        columnValue: search,
        operation: OPERATORS.Contains,
      },
    ],
    pageNumber,
    pageSize,
  };

  const handleSearch = useCallback(async () => {
    const response = await handleSubmit(searchTemplate, searchCriterion, '');
    setSearchData(response?.data?.data);
  }, [searchTemplate, searchCriterion]);

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
      <Header
        headerName={headerName}
        setSearch={setSearch}
        openFilter={openFilter}
        setOpenFilter={onToggle}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
      />
      <ModalBody m={0} p={0} px="24px">
        <Flex id="date-picker-portal" />
        <Collapse in={openFilter} animateOpacity>
          {openFilter && <TemplateFilters />}
        </Collapse>
        {!selectedTemplate && (
          <TemplateTable
            isLoading={isLoading || searchLoading}
            isFetching={isFetching}
            setSelectedTemplate={setSelectedTemplate}
            data={search && searchData ? searchData.items : (data?.items ?? [])}
          />
        )}
        <SlideTransition trigger={selectedTemplate !== null}>
          {selectedTemplate && children}
        </SlideTransition>
      </ModalBody>
      {!selectedTemplate && (
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
                : (data?.totalPages ?? 0)
            }
          />
        </ModalFooter>
      )}
    </GenericModal>
  );
};

export default TemplateModal;
