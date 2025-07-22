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
import { Template } from '~/lib/interfaces/template.interfaces';
import { OPERATORS } from '@repo/constants';
import {
  FilterButton,
  SearchInput,
  SlideTransition,
} from '@repo/ui/components';
import { FilterIcon } from '../CustomIcons';
import _ from 'lodash';
import { useAppSelector } from '~/lib/redux/hooks';
import PopoverAction from './PopoverAction';
import TemplateFilters from './Filters';
import { generateSearchCriterion } from '@repo/utils';

export const initialFilterData = {
  planType: [],
  region: [],
  area: [],
  branch: [],
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
  const filterData = useAppSelector((state) => state.template.templateFilters);
  const [searchData, setSearchData] = useState<
    ListResponse<Template> | undefined
  >(undefined);
  const { handleSubmit } = useCustomMutation();
  const [searchTemplate, { isLoading: searchLoading }] =
    useSearchTemplatesMutation({});

  // Checks if all filterdata is empty
  const isFilterEmpty = _.every(filterData, (value) => _.isEmpty(value));

  const searchCriterion = {
    ...(search && {
      criterion: [
        {
          columnName: 'templateName',
          columnValue: search,
          operation: OPERATORS.Contains,
        },
      ],
    }),
    ...(!isFilterEmpty && {
      orCriterion: [
        ...(filterData.contextTypeId && filterData.contextTypeId.length > 0
          ? [
              generateSearchCriterion(
                'systemContextTypeId',
                filterData.contextTypeId,
                OPERATORS.Equals
              ),
            ]
          : []),
        ...(filterData.owner && filterData.owner.length > 0
          ? [
              generateSearchCriterion(
                'createdBy',
                filterData.owner,
                OPERATORS.Equals
              ),
            ]
          : []),
        ...(filterData.createdDate
          ? [
              generateSearchCriterion(
                'dateCreated',
                [filterData.createdDate as string],
                OPERATORS.Contains
              ),
            ]
          : []),
      ].filter((arr) => arr && arr.length > 0),
    }),
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
              <TemplateFilters handleApplyFilter={handleSearch} type="page" />
            </Flex>
          )}
        </SlideTransition>
      )}

      <TemplateTable
        data={
          (search || !isFilterEmpty) && searchData
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
