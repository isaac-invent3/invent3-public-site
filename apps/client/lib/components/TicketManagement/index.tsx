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
// import { FilterInput } from '~/lib/interfaces/asset.interfaces';
import Filters from './Filters';
import TicketTable from './TicketTable';

const ALlTabs = [
  'New Tickets',
  'Assigned',
  'Scheduled Tickets',
  'In Progress',
  'Completed',
];

const TicketManagement = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tabIndex, setTabIndex] = useState<number | undefined>(undefined);
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState('');
  const { onToggle, isOpen } = useDisclosure();

  // Retrieve the `tab` parameter from URL on mount
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      const tabIndex = ALlTabs.findIndex((value) => value === tab);
      if (tabIndex !== -1) {
        setTabIndex(tabIndex);
      } else {
        setTabIndex(0);
      }
    }
  }, [searchParams]);

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
              {tabIndex === 3 && <TicketTable category="in-progress" />}
            </TabPanel>
            <TabPanel>
              {tabIndex === 4 && <TicketTable category="completed" />}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default TicketManagement;
