'use client';

import {
  Flex,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { SearchInput } from '@repo/ui/components';
import Header from './Header';
import { useRouter, useSearchParams } from 'next/navigation';
import { ROUTES } from '~/lib/utils/constants';
import UserRole from './UserRole';
import UserGroups from './UserGroup';

const ALlTabs = ['User Role', 'User Groups'];
const RoleManagement = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const [tabIndex, setTabIndex] = useState<number | undefined>(undefined);

  useEffect(() => {
    const tab = searchParams?.get('tab');
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
      router.push(`/${ROUTES.ROLES}?tab=${tabName}`);
    }
  };

  return (
    <Flex width="full" direction="column" pb="24px">
      <Header type={tabIndex === 0 ? 'role' : 'group'} />
      <Flex direction="column" position="relative" mt="40px">
        <Tabs
          variant="custom"
          width={'full'}
          onChange={(index) => handleTabChange(index)}
          index={tabIndex}
        >
          <Flex
            width="full"
            position="relative"
            direction={{ base: 'column', lg: 'row' }}
            gap="16px"
            px={{ base: '16px', md: 0 }}
          >
            <TabList>
              {ALlTabs.map((item, index) => (
                <Tab key={index}>{item}</Tab>
              ))}
            </TabList>
            <Flex
              position={{ base: 'static', lg: 'absolute' }}
              right={0}
              bottom={{ lg: '8px' }}
            >
              <HStack spacing="16px" width="full">
                <SearchInput
                  setSearch={setSearch}
                  placeholderText="Search..."
                  containerStyle={{ minW: { base: 'full', lg: 'max-content' } }}
                  customStyle={{ minW: { base: 'full', lg: '363px' } }}
                />
              </HStack>
            </Flex>
          </Flex>

          <TabPanels mt={{ base: '16px', md: 0 }}>
            <TabPanel>
              {tabIndex === 0 && <UserRole search={search} />}
            </TabPanel>
            <TabPanel>
              {tabIndex === 1 && <UserGroups search={search} />}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default RoleManagement;
