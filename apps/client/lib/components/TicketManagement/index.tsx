'use client';

import {
  Flex,
  HStack,
  Stack,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import {
  SelectedTicketAction,
  Ticket,
  TicketCategory,
  TicketFilter,
} from '~/lib/interfaces/ticket.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  ticketApi,
  useGetTicketByIdQuery,
  useGetTicketsByTabScopeQuery,
  useSearchTicketsMutation,
} from '~/lib/redux/services/ticket.services';
import {
  DEFAULT_PAGE_SIZE,
  ROUTES,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import Header from './Header';
import TicketOverlays from './Overlays';
import TicketTable from './TicketTable';
import { FilterButton, SearchInput } from '@repo/ui/components';
import { BulkSearchIcon, FilterIcon } from '../CustomIcons';
import TableActions from './TableActions';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { generateSearchCriterion } from '@repo/utils';
import { OPERATORS } from '@repo/constants';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import _ from 'lodash';
import useSignalR from '~/lib/hooks/useSignalR';
import useSignalREventHandler from '~/lib/hooks/useSignalREventHandler';
import LoadingDrawer from './Drawers/LoadingDrawer';
import { setSelectedTicket } from '~/lib/redux/slices/TicketSlice';

export const ALlTicketTabs = [
  'New',
  'Assigned',
  'Scheduled',
  'In Progress',
  'Completed',
];

export const initialFilterData = {
  region: [],
  area: [],
  branch: [],
  ticketTypes: [],
  users: [],
};

const TicketManagement = () => {
  const router = useRouter();
  const { getSearchParam } = useCustomSearchParams();
  const [tabIndex, setTabIndex] = useState<number | undefined>(undefined);
  const [filterData, setFilterData] = useState<TicketFilter>(initialFilterData);
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
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [selectedTicketIds, setSelectedTicketIds] = useState<number[]>([]);
  const appConfigValue = useAppSelector(
    (state) => state.general.appConfigValues
  );

  const getActionAndTicketCategoryKey = (
    data: Ticket
  ): { action: SelectedTicketAction; category: TicketCategory } => {
    if (
      data.ticketStatusId ===
      (typeof appConfigValue?.DEFAULT_COMPLETED_TASK_STATUS_ID === 'string'
        ? +appConfigValue?.DEFAULT_COMPLETED_TASK_STATUS_ID
        : appConfigValue?.DEFAULT_COMPLETED_TASK_STATUS_ID)
    ) {
      return { action: 'view', category: 'completed' };
    }
    if (data.isScheduled) {
      return { action: 'edit', category: 'scheduled' };
    }
    if (data.assignedTo) {
      return { action: 'schedule', category: 'assigned' };
    }
    return { action: 'assign', category: 'new' };
  };

  const {
    data: ticket,
    isLoading: isLoadingTicket,
    isError,
  } = useGetTicketByIdQuery(
    { id: (typeof ticketId === 'string' ? +ticketId : ticketId)! },
    { skip: !ticketId || selectedTicket !== null }
  );

  // Open ticket detail if ticket id params exists
  useEffect(() => {
    if (ticketId && !selectedTicket?.data) {
      onOpenView();
    }
  }, [ticketId]);

  useEffect(() => {
    const tabIndex = tab
      ? ALlTicketTabs.findIndex((value) => value === tab)
      : -1;
    setTabIndex(tabIndex !== -1 ? tabIndex : 0);
  }, [tab]);

  useEffect(() => {
    if (ticket?.data) {
      dispatch(
        setSelectedTicket({
          action: [getActionAndTicketCategoryKey(ticket.data).action],
          category: getActionAndTicketCategoryKey(ticket.data).category,
          data: ticket.data,
        })
      );
      onCloseView();
    }
  }, [ticket]);

  // Update the URL whenever the tab is changed
  const handleTabChange = (index: number) => {
    setTabIndex(index);
    const tabName = ALlTicketTabs[index];
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

  // Checks if all filterdata is empty
  const isFilterEmpty = _.every(
    filterData,
    (value) => _.isArray(value) && _.isEmpty(value)
  );

  const { data, isLoading, isFetching } = useGetTicketsByTabScopeQuery(
    {
      pageNumber: currentPage,
      pageSize: pageSize,
      tabScopeName: getTicketCategory,
    },
    { skip: !isFilterEmpty || search !== '' }
  );
  const dispatch = useAppDispatch();

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
        [
          {
            columnName: 'ticketTitle',
            columnValue: search,
            operation: OPERATORS.Contains,
          },
        ],
        ...(filterData.users && filterData.users.length >= 1
          ? [
              generateSearchCriterion(
                'assignedToEmployeeId',
                filterData.users.map((item) => item.value),
                OPERATORS.Equals
              ),
            ]
          : []),
        ...(filterData.ticketTypes && filterData.ticketTypes.length >= 1
          ? [
              generateSearchCriterion(
                'ticketTypeId',
                filterData.ticketTypes.map((item) => item.value),
                OPERATORS.Equals
              ),
            ]
          : []),
        ...(filterData.region && filterData.region.length >= 1
          ? [
              generateSearchCriterion(
                'stateId',
                filterData.region.map((item) => item.value),
                OPERATORS.Equals
              ),
            ]
          : []),
        ...(filterData.area && filterData.area.length >= 1
          ? [
              generateSearchCriterion(
                'lgaId',
                filterData.area.map((item) => item.value),
                OPERATORS.Equals
              ),
            ]
          : []),
        ...(filterData.branch && filterData.branch.length >= 1
          ? [
              generateSearchCriterion(
                'facilityId',
                filterData.branch.map((item) => item.value),
                OPERATORS.Equals
              ),
            ]
          : []),
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
    if (search || !isFilterEmpty) {
      handleSearch();
    }
  }, [search, isFilterEmpty, currentPage, pageSize]);

  // Reset pagination when the search input is cleared or apply filter flag is false
  useEffect(() => {
    if (!search || isFilterEmpty) {
      setCurrentPage(1);
      setPageSize(DEFAULT_PAGE_SIZE);
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

  //Handle apply Filter
  const handleApplyFilter = () => {
    setPageSize(1);
    setPageSize(DEFAULT_PAGE_SIZE);
    handleSearch();
  };

  const connectionState = useSignalR('tickets-hub');

  useSignalREventHandler({
    eventName: 'CreateTicket',
    connectionState,
    callback: (newTicket) => {
      const parsedTicket = JSON.parse(newTicket);
      // Update the query cache when a new ticket is received

      if (
        (getTicketCategory === 'new' &&
          parsedTicket.assignedToEmployeeId === null) ||
        (getTicketCategory === 'assigned' &&
          parsedTicket.assignedToEmployeeId !== null)
      ) {
        dispatch(
          ticketApi.util.updateQueryData(
            'getTicketsByTabScope',
            {
              pageNumber: currentPage,
              pageSize,
              tabScopeName: getTicketCategory,
            },
            (draft) => {
              if (draft?.data?.items) {
                draft?.data?.items.unshift(parsedTicket); // Add new ticket to the beginning
              }
            }
          )
        );
      }
    },
  });

  useSignalREventHandler({
    eventName: 'UpdateTicket',
    connectionState,
    callback: (updatedTicket) => {
      const parsedTicket = JSON.parse(updatedTicket);
      // Update the query cache when a ticket is updated

      dispatch(
        ticketApi.util.updateQueryData(
          'getTicketsByTabScope',
          {
            pageNumber: currentPage,
            pageSize,
            tabScopeName: getTicketCategory,
          },
          (draft) => {
            if (draft?.data?.items) {
              if (
                (getTicketCategory === 'new' &&
                  parsedTicket.assignedToEmployeeId) ||
                (getTicketCategory === 'assigned' &&
                  parsedTicket.isScheduled) ||
                (getTicketCategory === 'scheduled' &&
                  parsedTicket.ticketStatusId ===
                    +(appConfigValue?.DEFAULT_COMPLETED_TASK_STATUS_ID ?? '0'))
              ) {
                draft.data.items = draft.data.items.filter(
                  (ticket) => ticket.ticketId !== parsedTicket.ticketId
                ); // Remove the ticket
              } else {
                const index = draft.data.items.findIndex(
                  (ticket) => ticket.ticketId === parsedTicket.ticketId
                );
                if (index !== -1) {
                  draft.data.items[index] = parsedTicket; // Update the ticket in place
                }
              }
            }
          }
        )
      );
    },
  });

  useSignalREventHandler({
    eventName: 'DeleteTicket',
    connectionState,
    callback: (deletedTicket) => {
      const parsedTicket = JSON.parse(deletedTicket);
      // Update the query cache when a ticket is deleted
      dispatch(
        ticketApi.util.updateQueryData(
          'getTicketsByTabScope',
          {
            pageNumber: currentPage,
            pageSize,
            tabScopeName: getTicketCategory,
          },
          (draft) => {
            if (draft?.data?.items) {
              draft.data.items = draft.data.items.filter(
                (ticket) => ticket.ticketId !== parsedTicket.ticketId
              ); // Remove the deleted ticket
            }
          }
        )
      );
    },
  });

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
          <Flex
            width="full"
            position="relative"
            direction={{ base: 'column', lg: 'row' }}
            px={{ base: '16px', md: 0 }}
          >
            <TabList>
              {ALlTicketTabs.map((item, index) => (
                <Tab key={index}>{item}</Tab>
              ))}
            </TabList>
            <Flex
              position={{ base: 'static', lg: 'absolute' }}
              right={0}
              bottom="8px"
              mt="21px"
            >
              <Stack
                spacing="16px"
                width="full"
                direction={{ base: 'column', lg: 'row' }}
                px={{ base: '16px', md: 0 }}
              >
                <SearchInput
                  setSearch={setSearch}
                  placeholderText="Search..."
                  containerStyle={{ minW: { base: 'full', lg: 'max-content' } }}
                  customStyle={{ minW: { base: 'full', lg: 'max-content' } }}
                />
                <HStack spacing="16px" width="full" flexWrap="wrap">
                  <FilterButton
                    icon={BulkSearchIcon}
                    label="Bulk Actions"
                    handleClick={() =>
                      setActiveFilter((prev) =>
                        prev === 'bulk' ? null : 'bulk'
                      )
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
            </Flex>
          </Flex>

          <TabPanels>
            {isOpen && (
              <Flex width="full" mt="16px" px={{ base: '16px', md: 0 }}>
                <TableActions
                  filterData={filterData}
                  setFilterData={setFilterData}
                  handleApplyFilter={handleApplyFilter}
                  activeFilter={activeFilter}
                  isOpen={isOpen}
                  selectedTicketIds={selectedTicketIds ?? []}
                  ticketCategory={getTicketCategory}
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
                shouldHideFooter={false}
              />
            </Flex>
          </TabPanels>
        </Tabs>
      </Flex>
      <TicketOverlays />
      <LoadingDrawer
        isOpen={isOpenView}
        onClose={() => {
          onCloseView();
        }}
        isError={isError}
        isLoading={isLoadingTicket}
      />
    </Flex>
  );
};

export default TicketManagement;
