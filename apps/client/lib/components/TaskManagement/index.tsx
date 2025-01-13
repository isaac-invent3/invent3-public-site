'use client';

import {
  Flex,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import { FilterButton, SearchInput } from '@repo/ui/components';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ROUTES, STATUS_CATEGORY_ENUM } from '~/lib/utils/constants';
import { BulkSearchIcon, FilterIcon } from '../CustomIcons';
import Header from './Header';
import CompletedTab from './TabTableViews/CompletedTab';
import PendingAndInProgressTab from './TabTableViews/PendingAndInProgressTab';

const ALlTabs = ['Pending', 'In Progress', 'Completed'];

const TaskManagement = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tabIndex, setTabIndex] = useState<number | undefined>(undefined);
  const [activeFilter, setActiveFilter] = useState<'bulk' | 'general' | null>(
    null
  );

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

  useEffect(() => {
    if (activeFilter && !isOpen) {
      onOpen();
    }
    if (!activeFilter) {
      onClose();
    }
  }, [activeFilter]);

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
                  icon={BulkSearchIcon}
                  label="Bulk Actions"
                  handleClick={() =>
                    setActiveFilter((prev) => (prev === 'bulk' ? null : 'bulk'))
                  }
                  isActive={activeFilter === 'bulk'}
                />
                <FilterButton
                  icon={FilterIcon}
                  label="Filters"
                  handleClick={() =>
                    setActiveFilter((prev) =>
                      prev === 'general' ? null : 'general'
                    )
                  }
                  isActive={activeFilter === 'general'}
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
                  activeFilter={activeFilter}
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
                  activeFilter={activeFilter}
                />
              )}
            </TabPanel>
            <TabPanel>
              {tabIndex === 2 && (
                <CompletedTab
                  search={search}
                  openFilter={isOpen}
                  activeFilter={activeFilter}
                />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default TaskManagement;
