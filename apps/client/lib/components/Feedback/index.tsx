'use client';

import { Box, Flex, HStack, Stack, useDisclosure } from '@chakra-ui/react';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import { FilterButton, SearchInput } from '@repo/ui/components';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Feedback } from '~/lib/interfaces/feedback.interfaces';
import { LocationFilter } from '~/lib/interfaces/general.interfaces';
import { useGetAllFeedbacksQuery } from '~/lib/redux/services/feedback.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { BulkSearchIcon, FilterIcon } from '../CustomIcons';
import PageHeader from '../UI/PageHeader';
import FeedbackTable from './FeedbackTable';

const ALlTabs = ['New', 'Assigned', 'Scheduled', 'In Progress', 'Completed'];

export const initialFilterData = {
  region: [],
  area: [],
  branch: [],
};

const FeedbackOverview = () => {
  const [filterData, setFilterData] =
    useState<LocationFilter>(initialFilterData);
  const [activeFilter, setActiveFilter] = useState<'bulk' | 'general' | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState('');

  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllFeedbacksQuery({
    pageNumber: currentPage,
    pageSize: pageSize,
  });

  // Checks if all filterdata is empty
  const isFilterEmpty = _.every(
    filterData,
    (value) => _.isArray(value) && _.isEmpty(value)
  );

  const [searchData, setSearchData] = useState<BaseApiResponse<
    ListResponse<Feedback>
  > | null>(null);

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
              icon={BulkSearchIcon}
              label="Bulk Actions"
              handleClick={() =>
                setActiveFilter((prev) => (prev === 'bulk' ? null : 'bulk'))
              }
              isActive={activeFilter === 'bulk'}
            />
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
          </HStack>
        </Stack>

        <Flex width="full" mt="24px">
          <FeedbackTable
            data={(search || !isFilterEmpty) && searchData ? searchData : data}
            isLoading={isLoading}
            isFetching={isFetching}
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
