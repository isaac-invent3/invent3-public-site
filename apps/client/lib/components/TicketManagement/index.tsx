'use client';

import {
  Flex,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { TicketCategory } from '~/lib/interfaces/ticket.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetTicketsByTabScopeQuery } from '~/lib/redux/services/ticket.services';
import {
  DEFAULT_PAGE_SIZE,
  ROUTES,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import TicketDrawerWrapper from './Drawers/TicketDrawerWrapper';
import Filters from './Filters';
import Header from './Header';
import TicketOverlays from './Overlays';
import TicketTable from './TicketTable';

const ALlTabs = ['New', 'Assigned', 'Scheduled', 'In Progress', 'Completed'];

const TicketManagement = () => {
  const router = useRouter();
  const { getSearchParam } = useCustomSearchParams();
  const [tabIndex, setTabIndex] = useState<number | undefined>(undefined);
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState('');
  const { onToggle, isOpen } = useDisclosure();
  const {
    isOpen: isOpenView,
    onClose: onCloseView,
    onOpen: onOpenView,
  } = useDisclosure();
  const ticketId = getSearchParam(SYSTEM_CONTEXT_DETAILS.TICKETS.slug);
  const tab = getSearchParam('tab');
  const selectedTicket = useAppSelector((state) => state.ticket.selectedTicket);

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

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetTicketsByTabScopeQuery({
    pageNumber: currentPage,
    pageSize: pageSize,
    tabScopeName: getTicketCategory,
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
          <Flex width="full" position="relative">
            <TabList>
              {ALlTabs.map((item, index) => (
                <Tab key={index}>{item}</Tab>
              ))}
            </TabList>
            <Flex position="absolute" right={0} bottom="8px">
              <Filters
                setSearch={setSearch}
                showFilter={isOpen}
                setShowFilter={onToggle}
              />
            </Flex>
          </Flex>

          <TabPanels>
            <TicketTable
              category={getTicketCategory}
              data={data}
              isLoading={isLoading}
              isFetching={isFetching}
              currentPage={currentPage}
              pageSize={pageSize}
              setCurrentPage={setCurrentPage}
              setPageSize={setPageSize}
            />
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
