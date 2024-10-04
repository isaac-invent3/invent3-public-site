'use client';

import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useRouter, useSearchParams } from 'next/navigation';
import Schedules from './Schedules';
import History from './History';

const Maintenance = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tabIndex, setTabIndex] = useState(0);

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
    router.push(`/asset-management?tab=${tabName}`);
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
          <TabList>
            <Tab>All Schedules</Tab>
            <Tab>History</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
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
