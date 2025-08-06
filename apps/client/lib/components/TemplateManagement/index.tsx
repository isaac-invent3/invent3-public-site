'use client';

import { Flex, HStack, Stack, useDisclosure } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import PageHeader from '../UI/PageHeader';
import {
  useGetAllTemplatesQuery,
  useSearchTemplatesMutation,
} from '~/lib/redux/services/template.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import TemplateTable from './TemplateTable';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { ListResponse } from '@repo/interfaces';
import { Template, TemplateFilter } from '~/lib/interfaces/template.interfaces';
import { OPERATORS } from '@repo/constants';
import {
  FilterButton,
  SearchInput,
  SlideTransition,
} from '@repo/ui/components';
import { FilterIcon } from '../CustomIcons';
import _ from 'lodash';
import PopoverAction from './PopoverAction';
import TemplateFilters from './Filters';
import { generateSearchCriteria } from '@repo/utils';
import { usePageFilter } from '~/lib/hooks/usePageFilter';

export const initialFilterData = {
  contextTypeId: [],
  owner: [],
  createdDate: null,
};

const TemplateManagement = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllTemplatesQuery({
    pageNumber,
    pageSize,
  });
  const [search, setSearch] = useState('');
  const { isOpen, onToggle } = useDisclosure();
  const [searchData, setSearchData] = useState<
    ListResponse<Template> | undefined
  >(undefined);
  const { handleSubmit } = useCustomMutation();
  const [searchTemplate, { isLoading: searchLoading }] =
    useSearchTemplatesMutation({});
  const {
    filterData,
    setFilterData,
    appliedFilter,
    isFilterEmpty,
    applyFilter,
    clearFilter,
  } = usePageFilter<TemplateFilter>(initialFilterData);

  const handleSearch = useCallback(async () => {
    const { orCriterion } = generateSearchCriteria(
      search,
      appliedFilter,
      {
        contextTypeId: {
          key: 'systemContextTypeId',
          operator: OPERATORS.Equals,
        },
        owner: { key: 'createdBy', operator: OPERATORS.Equals },
        createdDate: { key: 'dateCreated', operator: OPERATORS.Equals },
      },
      ['templateName']
    );
    const payload = {
      pageNumber,
      pageSize,
      orCriterion,
    };

    if (orCriterion.length > 0) {
      const response = await handleSubmit(searchTemplate, payload, '');
      setSearchData(response?.data?.data);
    }
  }, [searchTemplate, search, appliedFilter, pageNumber, pageSize]);

  // Trigger search when search or input changes or applied filter changes or pagination updates
  useEffect(() => {
    if (search || !isFilterEmpty) {
      handleSearch();
    }
  }, [search, appliedFilter, pageNumber, pageSize]);

  // Reset pagination when clearing the search
  useEffect(() => {
    if (!search || isFilterEmpty) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setPageNumber(1);
    }
  }, [search, appliedFilter]);

  return (
    <Flex
      width="full"
      direction="column"
      pb="24px"
      gap={{ base: '24px', lg: '32px' }}
    >
      <Stack
        width="full"
        justifyContent="space-between"
        direction={{ base: 'column', lg: 'row' }}
        spacing="16px"
        px={{ base: '16px', md: 0 }}
      >
        <PageHeader>Template Management</PageHeader>
        <HStack spacing="16px" flexWrap="wrap">
          <SearchInput setSearch={setSearch} placeholderText="Search..." />
          <FilterButton
            icon={FilterIcon}
            label="Filter"
            handleClick={onToggle}
            isActive={isOpen}
          />
        </HStack>
      </Stack>
      {isOpen && (
        <SlideTransition trigger={isOpen} direction="bottom">
          {isOpen && (
            <Flex width="full" px={{ base: '16px', lg: 0 }}>
              <TemplateFilters
                filterData={filterData}
                setFilterData={setFilterData}
                onApply={() => {
                  applyFilter();
                  handleSearch(); // manually trigger
                }}
                onClear={() => {
                  clearFilter();
                  handleSearch(); // to reload default data
                }}
                type="page"
              />
            </Flex>
          )}
        </SlideTransition>
      )}

      <TemplateTable
        data={
          (search || !isFilterEmpty) && searchData && !searchLoading
            ? searchData.items
            : (data?.data?.items ?? [])
        }
        isLoading={isLoading}
        isFetching={isFetching || searchLoading}
        type="page"
        totalPages={
          (search || !isFilterEmpty) && searchData
            ? searchData?.totalPages
            : data?.data?.totalPages
        }
        showFooter={true}
        emptyLines={25}
        isSelectable={false}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        showPopover
        PopoverComponent={(template) => PopoverAction(template)}
      />
    </Flex>
  );
};

export default TemplateManagement;
