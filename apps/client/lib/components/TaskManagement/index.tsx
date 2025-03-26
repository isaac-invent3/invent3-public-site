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
import {
  ROUTES,
  STATUS_CATEGORY_ENUM,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import { BulkSearchIcon, FilterIcon } from '../CustomIcons';
import Header from './Header';
import CompletedTab from './TabTableViews/CompletedTab';
import PendingAndInProgressTab from './TabTableViews/PendingAndInProgressTab';
import TaskDetailDrawer from './Drawers/TaskDetailDrawer';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';

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
  const { getSearchParam, clearSearchParamsAfter } = useCustomSearchParams();
  const taskInstanceId = getSearchParam(SYSTEM_CONTEXT_DETAILS.TASKS.slug);
  const {
    isOpen: isOpenViewDetails,
    onOpen: onOpenDetails,
    onClose: onCloseDetails,
  } = useDisclosure();

  useEffect(() => {
    const tab = getSearchParam('tab');
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

  //Open Task detail drawer if task id exists
  useEffect(() => {
    if (taskInstanceId !== undefined) {
      onOpenDetails();
    }
  }, [taskInstanceId]);

  return (
    <>
      <Flex width="full" direction="column" pb="24px">
        <Header />
        <Flex direction="column" mt="42px" position="relative">
          <Tabs
            variant="custom"
            width={'full'}
            onChange={(index) => handleTabChange(index)}
            index={tabIndex}
          >
            <Flex width="full" position="relative" px={{ base: '16px', md: 0 }}>
              <TabList>
                {ALlTabs.map((item, index) => (
                  <Tab key={index}>{item}</Tab>
                ))}
              </TabList>
              <Flex
                position="absolute"
                right={0}
                bottom="8px"
                display={{ base: 'none', lg: 'flex' }}
              >
                <HStack spacing="16px" width="full">
                  <SearchInput
                    setSearch={setSearch}
                    placeholderText="Search..."
                  />

                  <FilterButton
                    icon={BulkSearchIcon}
                    label="Bulk Actions"
                    handleClick={() =>
                      setActiveFilter((prev) =>
                        prev === 'bulk' ? null : 'bulk'
                      )
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
            <Flex
              mt="16px"
              px={{ base: '16px', md: 0 }}
              display={{ base: 'flex', lg: 'none' }}
            >
              <HStack width="full" flexWrap="wrap" spacing="16px">
                <SearchInput
                  width="100%"
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
      {taskInstanceId && (
        <TaskDetailDrawer
          isOpen={isOpenViewDetails}
          onClose={() => {
            onCloseDetails();
            clearSearchParamsAfter(SYSTEM_CONTEXT_DETAILS.TASKS.slug, {
              removeSelf: true,
            });
          }}
          data={undefined}
        />
      )}
    </>
  );
};

export default TaskManagement;
