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
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Schedules from './Schedules';
import Plans from './Plans';
import Header from './Header';
import { FilterButton, SearchInput } from '@repo/ui/components';
import { FilterIcon } from '../CustomIcons';
import { ROUTES } from '~/lib/utils/constants';
import MaintenanceHistory from './History';

const AllTabs = ['plans', 'schedules', 'history'];

interface MaintenanceProps {
  activeTab: number;
}
const Maintenance = (props: MaintenanceProps) => {
  const { activeTab = 0 } = props;
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(activeTab);
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState('');
  const { isOpen, onClose, onToggle } = useDisclosure();

  // Update the URL whenever the tab is changed
  const handleTabChange = (index: number) => {
    setTabIndex(index);
    onClose();
    const tabName = AllTabs[index];
    if (tabName) {
      router.push(`/${ROUTES.MAINTENANCE}/${tabName}`);
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
            {tabIndex !== 1 && (
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
            )}
          </Flex>

          <TabPanels>
            <TabPanel>
              {tabIndex === 0 && <Plans search={search} openFilter={isOpen} />}
            </TabPanel>
            <TabPanel>{tabIndex === 1 && <Schedules />}</TabPanel>
            <TabPanel>
              {tabIndex === 2 && (
                <MaintenanceHistory search={search} openFilter={isOpen} />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default Maintenance;
