'use client';

import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
  HStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Schedules from './Schedules';
import History from './History';
import Plans from './Plans';
import Header from './Header';
import _ from 'lodash';
import SearchInput from '../UI/SearchInput';
import FilterButton from '../UI/Filter/FilterButton';
import { FilterIcon } from '../CustomIcons';

const ALlTabs = ['Plans', 'Schedules', 'History'];

export type MaintenanceTabs = 'Schedules' | 'Plans' | 'History';
const Maintenance = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tabIndex, setTabIndex] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState('');
  const { isOpen, onClose, onToggle } = useDisclosure();

  // Retrieve the `tab` parameter from URL on mount
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      const tabIndex = ALlTabs.findIndex(
        (value) => value === _.capitalize(tab)
      );
      if (tabIndex !== -1) {
        setTabIndex(tabIndex);
      }
    }
  }, [searchParams]);

  // Update the URL whenever the tab is changed
  const handleTabChange = (index: number) => {
    setTabIndex(index);
    onClose();
    const tabName = ALlTabs[index];
    if (tabName) {
      router.push(`/maintenance?tab=${tabName}`);
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
              <Tab>Plans</Tab>
              <Tab>Schedules</Tab>
              <Tab>History</Tab>
            </TabList>
            <Flex position="absolute" right={0} bottom="8px">
              <HStack spacing="16px" width="full">
                <SearchInput
                  setSearch={setSearch}
                  placeholderText="Search..."
                />
                <FilterButton
                  icon={FilterIcon}
                  label="Filter"
                  handleClick={onToggle}
                  isActive={isOpen}
                />
              </HStack>
            </Flex>
          </Flex>

          <TabPanels>
            <TabPanel>
              {tabIndex === 0 && <Plans search={search} openFilter={isOpen} />}
            </TabPanel>
            <TabPanel>{tabIndex === 1 && <Schedules />}</TabPanel>
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
