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

const ALlTabs = ['Profile', 'Security', 'Notification', 'Teams', 'General'];

const Profile = () => {
  const { getSearchParam, updateSearchParam } = useCustomSearchParams();
  const tab = getSearchParam('tab');
  const [tabIndex, setTabIndex] = useState<number | undefined>(undefined);
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
      <PageHeader>Settings</PageHeader>
      <Tabs
        variant="custom"
        width={'full'}
        onChange={(index) => handleTabChange(index)}
        index={tabIndex}
        mt="51px"
      >
        <TabList>
          {ALlTabs.map((item, index) => (
            <Tab key={index} width="93px">
              {item}
            </Tab>
          ))}
        </TabList>
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
