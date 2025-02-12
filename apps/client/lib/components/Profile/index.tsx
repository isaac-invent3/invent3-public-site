'use client';
import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import ProfileTab from './ProfileTab';
import SecurityTab from './SecurityTab';
import GeneralTab from './GeneralTab';
import Notification from './Notification';
import Teams from './Teams';
import PageHeader from '../UI/PageHeader';
import { useGetUserConfigurationOptionsQuery } from '~/lib/redux/services/user.services';
import { useSession } from 'next-auth/react';
import { useAppDispatch } from '~/lib/redux/hooks';
import { setInitialOptions } from '~/lib/redux/slices/UserSlice';

const ALlTabs = ['Profile', 'Security', 'Notification', 'Teams', 'General'];

const Profile = () => {
  const { getSearchParam, updateSearchParam } = useCustomSearchParams();
  const tab = getSearchParam('tab');
  const [tabIndex, setTabIndex] = useState<number | undefined>(undefined);
  const session = useSession();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetUserConfigurationOptionsQuery(
    { userId: session?.data?.user?.userId!, pageSize: 30 },
    { skip: !session?.data?.user?.userId }
  );

  useEffect(() => {
    if (data?.data) {
      dispatch(
        setInitialOptions(
          data?.data?.items.map((item) => ({
            userConfigurationOptionId: item.userConfigurationOptionId,
            systemConfigurationOptionId: item.systemConfigurationOptionId,
          }))
        )
      );
    }
  }, [data]);

  useEffect(() => {
    const tabIndex = tab ? ALlTabs.findIndex((value) => value === tab) : -1;
    setTabIndex(tabIndex !== -1 ? tabIndex : 0);
  }, [tab]);

  // Update the URL whenever the tab is changed
  const handleTabChange = (index: number) => {
    setTabIndex(index);
    const tabName = ALlTabs[index];
    if (tabName) {
      updateSearchParam('tab', tabName);
    }
  };

  return (
    <Flex width="full" direction="column" pb="40px">
      <Flex px={{ base: '16px', md: 0 }}>
        <PageHeader>Settings</PageHeader>
      </Flex>
      <Tabs
        variant="custom"
        width={'full'}
        onChange={(index) => handleTabChange(index)}
        index={tabIndex}
        mt="51px"
        opacity={isLoading ? 0.5 : 1}
        pointerEvents={isLoading ? 'none' : 'initial'}
      >
        <Flex width="full" px={{ base: '16px', md: 0 }}>
          <TabList>
            {ALlTabs.map((item, index) => (
              <Tab key={index} width="93px">
                {item}
              </Tab>
            ))}
          </TabList>
        </Flex>
        <TabPanels pt="16px">
          <TabPanel>{tabIndex === 0 && <ProfileTab />}</TabPanel>
          <TabPanel>{tabIndex === 1 && <SecurityTab />}</TabPanel>
          <TabPanel>{tabIndex === 2 && <Notification />}</TabPanel>
          <TabPanel>{tabIndex === 3 && <Teams />}</TabPanel>
          <TabPanel>{tabIndex === 4 && <GeneralTab />}</TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Profile;
