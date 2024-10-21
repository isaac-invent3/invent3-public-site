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
// import { FilterInput } from '~/lib/interfaces/asset.interfaces';
import Filters from './Filters';
import ListView from './ListView';

const ALlTabs = ['Pending', 'In Progress', 'Completed'];

const TaskManagement = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tabIndex, setTabIndex] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState('');
  const { onToggle, isOpen } = useDisclosure();
  //   const [filterData, setFilterData] = useState<FilterInput>({
  //     location: [],
  //     category: [],
  //   });

  // Retrieve the `tab` parameter from URL on mount
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      const tabIndex = ALlTabs.findIndex((value) => value === tab);
      if (tabIndex !== -1) {
        setTabIndex(tabIndex);
      }
    }
  }, [searchParams]);

  // Update the URL whenever the tab is changed
  const handleTabChange = (index: number) => {
    setTabIndex(index);
    const tabName = ALlTabs[index];
    if (tabName) {
      router.push(`/task-management?tab=${tabName}`);
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
              <Tab>Pending</Tab>
              <Tab>In Progress</Tab>
              <Tab>Completed</Tab>
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
              <ListView />
            </TabPanel>
            <TabPanel>
              <ListView />
            </TabPanel>
            <TabPanel>
              <ListView />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default TaskManagement;
