import React, { useCallback, useEffect, useState } from 'react';
import { SlideTransition } from '@repo/ui/components';
import { Flex } from '@chakra-ui/react';
import TemplateTable from './TemplateTable';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import TemplateFilters from './Filters';
import { useSearchTemplatesMutation } from '~/lib/redux/services/template.services';
import { Template } from '~/lib/interfaces/template.interfaces';
import GenericTemplateModal from '../GenericTemplateModal';
import { ListResponse } from '@repo/interfaces';

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
  const [searchTemplate, { isLoading: searchLoading }] =
    useSearchTemplatesMutation({});
  const [searchData, setSearchData] = useState<ListResponse<Template> | null>(
    null
  );
  const { handleSubmit } = useCustomMutation();
  const [showDetails, setShowDetails] = useState(false);

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

  // handle showing of details
  useEffect(() => {
    if (selectedTemplate) {
      setShowDetails(true);
    } else {
      setShowDetails(false);
    }
  }, [selectedTemplate]);

  return (
    <GenericTemplateModal
      isOpen={isOpen}
      onClose={onClose}
      headerName={headerName}
      pageSize={pageSize}
      pageNumber={pageNumber}
      totalPages={
        search && searchData ? searchData.totalPages : (data?.totalPages ?? 0)
      }
      showDetails={showDetails}
      setShowDetails={setShowDetails}
      setSearch={setSearch}
      setPageNumber={setPageNumber}
      setPageSize={setPageSize}
      filters={<TemplateFilters />}
    >
      <Flex width="full" direction="column">
        {!showDetails && (
          <TemplateTable
            isLoading={isLoading || searchLoading}
            isFetching={isFetching}
            setSelectedTemplate={setSelectedTemplate}
            data={search && searchData ? searchData.items : (data?.items ?? [])}
          />
        )}
        <SlideTransition trigger={showDetails}>
          {showDetails && children}
        </SlideTransition>
      </Flex>
    </GenericTemplateModal>
  );
};

export default TemplateModal;
