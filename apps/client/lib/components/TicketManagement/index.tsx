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
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from './Header';
import Filters from './Filters';
import TicketTable from './TicketTable';
import TicketOverlays from './Overlays';
import { useGetTicketByIdQuery } from '~/lib/redux/services/ticket.services';
import { useAppDispatch } from '~/lib/redux/hooks';
import { setSelectedTicket } from '~/lib/redux/slices/TicketSlice';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';

const ALlTabs = [
  'New Tickets',
  'Assigned',
  'Scheduled Tickets',
  'In Progress',
  'Completed',
];

const getTicketCategory = (data: Ticket) => {
  if (data.isScheduled) {
    return 'scheduled';
  }
  if (data.assignedTo) {
    return 'assigned';
  }
  return 'new';
};

const TicketManagement = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tabIndex, setTabIndex] = useState<number | undefined>(undefined);
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState('');
  const { onToggle, isOpen } = useDisclosure();
  const ticketId = searchParams.get('id');
  const dispatch = useAppDispatch();
  const { data } = useGetTicketByIdQuery(
    { id: +ticketId! },
    { skip: !ticketId }
  );

  // Retrieve the `tab` parameter from URL on mount
  useEffect(() => {
    const tab = searchParams.get('tab');
    const tabIndex = tab ? ALlTabs.findIndex((value) => value === tab) : -1;
    setTabIndex(tabIndex !== -1 ? tabIndex : 0);
  }, [searchParams]);

  // Update the URL whenever the tab is changed
  const handleTabChange = (index: number) => {
    setTabIndex(index);
    const tabName = ALlTabs[index];
    if (tabName) {
      router.push(`/ticket-management?tab=${tabName}`);
    }
  };

  // Display Ticket based on the search param id if it exists
  useEffect(() => {
    if (data?.data) {
      dispatch(
        setSelectedTicket({
          action: ['view'],
          category: getTicketCategory(data?.data),
          data: data?.data,
        })
      );
    }
  }, [data]);

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
    </Flex>
  );
};

export default TicketManagement;
