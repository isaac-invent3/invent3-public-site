'use client';

import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useRouter, useSearchParams } from 'next/navigation';
import Schedules from './Schedules';
import History from './History';
import Filters from './Schedules/Filters';
import ScheduleFilterDisplay from './Schedules/Filters/ScheduleFilterDisplay';
import { FilterInput } from '~/lib/interfaces/asset.interfaces';

const Maintenance = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tabIndex, setTabIndex] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<
    'schedule' | 'plan' | 'history' | null
  >(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filterData, setFilterData] = useState<FilterInput>({
    location: [],
    category: [],
  });

  // Retrieve the `tab` parameter from URL on mount
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'History') {
      setTabIndex(1);
    } else {
      setTabIndex(0); // Otherwise default to list tab
    }
  }, [searchParams]);

  // Update the URL whenever the tab is changed
  const handleTabChange = (index: number) => {
    setTabIndex(index);
    const tabName = index === 1 ? 'history' : 'schedules';
    router.push(`/maintenance?tab=${tabName}`);
  };

  // Handles Toggling the  Filter
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
              <Tab>All Schedules</Tab>
              <Tab>History</Tab>
            </TabList>
            {tabIndex === 0 && (
              <Flex position="absolute" right={0} bottom="8px">
                <Filters
                  setSearch={setSearch}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                />
              </Flex>
            )}
          </Flex>

          <TabPanels>
            <TabPanel>
              <ScheduleFilterDisplay
                isOpen={isOpen}
                filterData={filterData}
                setFilterData={setFilterData}
              />
              <Schedules />
            </TabPanel>
            <TabPanel>
              <History />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default Maintenance;
