'use client';

import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from './Header';
import Filters from './Filters';
import TicketTable from './TicketTable';
import TicketOverlays from './Overlays';
import TicketDrawerWrapper from './Drawers/TicketDrawerWrapper';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { SYSTEM_CONTEXT_DETAILS } from '~/lib/utils/constants';
import { useAppSelector } from '~/lib/redux/hooks';

const ALlTabs = [
  'New Tickets',
  'Assigned',
  'Scheduled Tickets',
  'In Progress',
  'Completed',
];

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
      router.push(`/ticket-management?tab=${tabName}`);
    }
  };

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
            <TabPanel>
              {tabIndex === 0 && <TicketTable category="new" />}
            </TabPanel>

            <TabPanel>
              {tabIndex === 1 && <TicketTable category="assigned" />}
            </TabPanel>

            <TabPanel>
              {tabIndex === 2 && <TicketTable category="scheduled" />}
            </TabPanel>
            <TabPanel>
              {tabIndex === 3 && <TicketTable category="in_progress" />}
            </TabPanel>
            <TabPanel>
              {tabIndex === 4 && <TicketTable category="completed" />}
            </TabPanel>
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
