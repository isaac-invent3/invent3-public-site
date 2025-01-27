'use client';

import {
  Flex,
  HStack,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { Ticket, TicketCategory } from '~/lib/interfaces/ticket.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import {
  useGetTicketsByTabScopeQuery,
  useSearchTicketsMutation,
} from '~/lib/redux/services/ticket.services';
import {
  DEFAULT_PAGE_SIZE,
  ROUTES,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import TicketDrawerWrapper from './Drawers/TicketDrawerWrapper';
import Header from './Header';
import TicketOverlays from './Overlays';
import TicketTable from './TicketTable';
import { FilterButton, SearchInput } from '@repo/ui/components';
import { BulkSearchIcon, FilterIcon } from '../CustomIcons';
import { LocationFilter } from '~/lib/interfaces/general.interfaces';
import TableActions from './TableActions';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { generateSearchCriterion } from '@repo/utils';
import { OPERATORS } from '@repo/constants';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import _ from 'lodash';

const ALlTabs = ['New', 'Assigned', 'Scheduled', 'In Progress', 'Completed'];

export const initialFilterData = {
  region: [],
  area: [],
  branch: [],
};

const TicketManagement = () => {
  const router = useRouter();
  const { getSearchParam } = useCustomSearchParams();
  const [tabIndex, setTabIndex] = useState<number | undefined>(undefined);
  const [filterData, setFilterData] =
    useState<LocationFilter>(initialFilterData);
  const [activeFilter, setActiveFilter] = useState<'bulk' | 'general' | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState('');
  const {
    isOpen: isOpenView,
    onClose: onCloseView,
    onOpen: onOpenView,
  } = useDisclosure();
  const ticketId = getSearchParam(SYSTEM_CONTEXT_DETAILS.TICKETS.slug);
  const tab = getSearchParam('tab');
  const selectedTicket = useAppSelector((state) => state.ticket.selectedTicket);
  const { handleSubmit } = useCustomMutation();
  const [selectedTicketIds, setSelectedTicketIds] = useState<number[]>([]);

  // Open ticket detail if ticket id params exists
  useEffect(() => {
    if (ticketId && !selectedTicket?.data) {
      onOpenView();
    }
  }, [ticketId]);

  useEffect(() => {
    const tabIndex = tab ? ALlTabs.findIndex((value) => value === tab) : -1;
    setTabIndex(tabIndex !== -1 ? tabIndex : 0);
  }, [tab]);

  // Update the URL whenever the tab is changed
  const handleTabChange = (index: number) => {
    setTabIndex(index);
    const tabName = ALlTabs[index];
    if (tabName) {
      router.push(`/${ROUTES.TICKETS}?tab=${tabName}`);
    }
  };

  const getTicketCategory: TicketCategory = useMemo(() => {
    if (tabIndex === 0) return 'new';
    if (tabIndex === 1) return 'assigned';
    if (tabIndex === 2) return 'scheduled';
    if (tabIndex === 3) return 'in_progress';
    if (tabIndex === 4) return 'completed';

    return 'new';
  }, [tabIndex]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetTicketsByTabScopeQuery({
    pageNumber: currentPage,
    pageSize: pageSize,
    tabScopeName: getTicketCategory,
  });

  // Checks if all filterdata is empty
  const isFilterEmpty = _.every(
    filterData,
    (value) => _.isArray(value) && _.isEmpty(value)
  );

  const [searchTickets, { isLoading: searchLoading }] =
    useSearchTicketsMutation({});
  const [searchData, setSearchData] = useState<BaseApiResponse<
    ListResponse<Ticket>
  > | null>(null);

  // Search Criterion
  const searchCriterion = {
    ...(search && {
      criterion: [
        {
          columnName: 'ticketTitle',
          columnValue: search,
          operation: OPERATORS.Contains,
        },
      ],
    }),
    ...(!isFilterEmpty && {
      orCriterion: [
        ...filterData.region.map((item) => [
          ...generateSearchCriterion('stateId', [item.value], OPERATORS.Equals),
        ]),
        ...filterData.area.map((item) => [
          ...generateSearchCriterion('lgaId', [item.value], OPERATORS.Equals),
        ]),
        ...filterData.branch.map((item) => [
          ...generateSearchCriterion(
            'facilityId',
            [item.value],
            OPERATORS.Equals
          ),
        ]),
      ],
    }),
    pageNumber: currentPage,
    pageSize: pageSize,
  };

  // Function that handles search/filters
  const handleSearch = useCallback(async () => {
    if (search || !isFilterEmpty) {
      const response = await handleSubmit(searchTickets, searchCriterion, '');
      response?.data && setSearchData(response?.data);
    }
  }, [searchTickets, searchCriterion]);

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

  //Set Selected Ticket
  useEffect(() => {
    if (selectedRows && selectedRows.length > 0) {
      const sourceItems = searchData?.data?.items || data?.data?.items || [];

      const ticketIds = selectedRows
        .map((rowId) => sourceItems[rowId]?.ticketId)
        .filter((id): id is number => id !== undefined);

      setSelectedTicketIds(ticketIds);
    }
  }, [selectedRows]);

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
      <Header />
      <Flex direction="column" mt="42px" position="relative">
        <Tabs
          variant="custom"
          width={'full'}
          onChange={(index) => handleTabChange(index)}
          index={tabIndex}
        >
          <Flex width="full" position="relative">
            <TabList>
              {ALlTabs.map((item, index) => (
                <Tab key={index}>{item}</Tab>
              ))}
            </TabList>
            <Flex position="absolute" right={0} bottom="8px">
              <HStack spacing="16px" width="full">
                <SearchInput
                  setSearch={setSearch}
                  placeholderText="Search..."
                />

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
            </Flex>
          </Flex>

          <TabPanels>
            {isOpen && (
              <Flex width="full" mt="16px">
                <TableActions
                  filterData={filterData}
                  setFilterData={setFilterData}
                  handleApplyFilter={handleSearch}
                  activeFilter={activeFilter}
                  isOpen={isOpen}
                  selectedTicketIds={selectedTicketIds ?? []}
                />
              </Flex>
            )}
            <Flex width="full" mt="24px">
              <TicketTable
                category={getTicketCategory}
                data={
                  (search || !isFilterEmpty) && searchData ? searchData : data
                }
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
          </TabPanels>
        </Tabs>
      </Flex>
      <TicketOverlays />
      <TicketDrawerWrapper
        isOpen={isOpenView}
        onClose={onCloseView}
        data={null}
        category="new"
        action="view"
      />
    </Flex>
  );
};

export default TicketManagement;
