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
import Header from './Header';
import { useRouter, useSearchParams } from 'next/navigation';
import { ROUTES, STATUS_CATEGORY_ENUM } from '~/lib/utils/constants';
import { FilterButton, SearchInput } from '@repo/ui/components';
import { FilterIcon } from '../CustomIcons';
import PendingAndInProgressTab from './TabTableViews/PendingAndInProgressTab';
import CompletedTab from './TabTableViews/CompletedTab';

const ALlTabs = ['Pending', 'In Progress', 'Completed'];

const TaskManagement = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tabIndex, setTabIndex] = useState<number | undefined>(undefined);
  const [search, setSearch] = useState('');
  const { onToggle, isOpen } = useDisclosure();
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      const tabIndex = ALlTabs.findIndex((value) => value === tab);
      if (tabIndex !== -1) {
        setTabIndex(tabIndex);
      }
    } else {
      setTabIndex(0);
    }
  }, [searchParams]);

  // Update the URL whenever the tab is changed
  const handleTabChange = (index: number) => {
    setTabIndex(index);
    const tabName = ALlTabs[index];
    if (tabName) {
      router.push(`/${ROUTES.TASKS}?tab=${tabName}`);
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
              <HStack spacing="16px" width="full">
                <SearchInput
                  setSearch={setSearch}
                  placeholderText="Search..."
                />
                <FilterButton
                  icon={FilterIcon}
                  label="Filters"
                  handleClick={() => onToggle()}
                  isActive={isOpen}
                />
              </HStack>
            </Flex>
          </Flex>

          <TabPanels>
            <TabPanel>
              {tabIndex === 0 && (
                <PendingAndInProgressTab
                  statusCategoryId={STATUS_CATEGORY_ENUM.INACTIVE}
                  search={search}
                  openFilter={isOpen}
                />
              )}
            </TabPanel>
            <TabPanel>
              {tabIndex === 1 && (
                <PendingAndInProgressTab
                  statusCategoryId={STATUS_CATEGORY_ENUM.ACTIVE}
                  search={search}
                  openFilter={isOpen}
                />
              )}
            </TabPanel>
            <TabPanel>
              {tabIndex === 2 && (
                <CompletedTab search={search} openFilter={isOpen} />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default TaskManagement;
