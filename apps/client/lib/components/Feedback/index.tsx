'use client';

import { Box, Flex, HStack, Stack, useDisclosure } from '@chakra-ui/react';
import { OPERATORS } from '@repo/constants';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import { FilterButton, SearchInput } from '@repo/ui/components';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Feedback } from '~/lib/interfaces/feedback.interfaces';
import { LocationFilter } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllFeedbacksQuery,
  useSearchFeedbacksMutation,
} from '~/lib/redux/services/feedback.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { BulkSearchIcon, FilterIcon } from '../CustomIcons';
import PageHeader from '../UI/PageHeader';
import FeedbackTable from './FeedbackTable';
import ExportButtonPopover from './Common/ExportButtonPopover';

const ALlTabs = ['New', 'Assigned', 'Scheduled', 'In Progress', 'Completed'];

export const initialFilterData = {
  region: [],
  area: [],
  branch: [],
};

const FeedbackOverview = () => {
  const [filterData, setFilterData] =
    useState<LocationFilter>(initialFilterData);

  const { handleSubmit } = useCustomMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllFeedbacksQuery({
    pageNumber: currentPage,
    pageSize: pageSize,
  });
  const [activeFilter, setActiveFilter] = useState<'bulk' | 'general' | null>(
    null
  );

  // Checks if all filterdata is empty
  const isFilterEmpty = _.every(
    filterData,
    (value) => _.isArray(value) && _.isEmpty(value)
  );
  const [searchFeedbacks, { isLoading: searchLoading }] =
    useSearchFeedbacksMutation({});
  const [searchData, setSearchData] = useState<BaseApiResponse<
    ListResponse<Feedback>
  > | null>(null);

  // Search Criterion
  const searchCriterion = {
    ...(search && {
      criterion: [
        {
          columnName: 'subject',
          columnValue: search,
          operation: OPERATORS.Contains,
        },
      ],
    }),

    pageNumber: currentPage,
    pageSize: pageSize,
  };

  // Function that handles search/filters
  const handleSearch = useCallback(async () => {
    if (search || !isFilterEmpty) {
      const response = await handleSubmit(
        searchFeedbacks,
        searchCriterion,
        ''
      );
      response?.data && setSearchData(response?.data);
    }
  }, [searchFeedbacks, searchCriterion]);

  // Trigger search when search input changes or pagination updates
  useEffect(() => {
    if (search) {
      handleSearch();
    }
  }, [search, currentPage, pageSize]);

  // Reset pagination when the search input is cleared or apply filter flag is false
  useEffect(() => {
    if (!search && isFilterEmpty) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setCurrentPage(1);
    }
  }, [search, isFilterEmpty]);

  useEffect(() => {
    if (activeFilter && !isOpen) {
      onOpen();
    }
    if (!activeFilter) {
      onClose();
    }
  }, [activeFilter]);
  return (
    <Flex width="full" direction="column" pb="24px">
      <Box px={{ base: '16px', md: 0 }}>
        <PageHeader>Feedback Overview</PageHeader>
      </Box>

      <Flex direction="column" mt="42px" position="relative">
        <Stack
          spacing="16px"
          width="full"
          direction={{ base: 'column', lg: 'row' }}
          px={{ base: '16px', md: 0 }}
          justifyContent="space-between"
        >
          <SearchInput
            setSearch={setSearch}
            placeholderText="Search..."
            containerStyle={{
              minW: { base: 'full', lg: '400px' },
            }}
            customStyle={{ minW: { base: 'full', lg: '400px' } }}
          />

          <HStack spacing="16px" flexWrap="wrap">
           
            <FilterButton
              icon={FilterIcon}
              label="Filters"
              handleClick={() =>
                setActiveFilter((prev) =>
                  prev === 'general' ? null : 'general'
                )
              }
              isActive={activeFilter === 'general'}
            />
            <ExportButtonPopover />
          </HStack>
        </Stack>

        <Flex width="full" mt="24px">
          <FeedbackTable
            data={(search || !isFilterEmpty) && searchData ? searchData : data}
            isLoading={isLoading}
            isFetching={isFetching || searchLoading}
            isSelectable
            currentPage={currentPage}
            pageSize={pageSize}
            setCurrentPage={setCurrentPage}
            setPageSize={setPageSize}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            emptyLines={25}
            shouldHideFooter={true}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FeedbackOverview;
