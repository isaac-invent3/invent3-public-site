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
import PageHeader from '../UI/PageHeader';
import GeneralTab from './GeneralTab';
import SecurityAuthenticationTab from './SecurityAuthenticationTab';
import NotificationsTab from './NotificationsTab';
import AuditTab from './AuditTab';
import ComplianceTab from './ComplianceTab';
import SystemMaintenanceBackupTab from './SystemMaintenanceBackupTab';
import IntegrationTab from './IntegrationTab';
import DataImportExportTab from './DataImportExportTab';

const ALlTabs = [
  'General Settings',
  'Security & Authentication',
  'Notification',
  'Audit & Logging',
  'Integration',
  'Data Import & Export',
  'System Maintenance & Backup',
  'Compliance',
];

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
      <Flex px={{ base: '16px', md: 0 }}>
        <PageHeader>Settings</PageHeader>
      </Flex>
      <Tabs
        variant="custom"
        width={'full'}
        onChange={(index) => handleTabChange(index)}
        index={tabIndex}
        mt="51px"
      >
        <Flex width="full" px={{ base: '16px', md: 0 }}>
          <TabList>
            {ALlTabs.map((item, index) => (
              <Tab key={index}>{item}</Tab>
            ))}
          </TabList>
        </Flex>
        <TabPanels pt="16px">
          <TabPanel>{tabIndex === 0 && <GeneralTab />}</TabPanel>
          <TabPanel>{tabIndex === 1 && <SecurityAuthenticationTab />}</TabPanel>
          <TabPanel>{tabIndex === 2 && <NotificationsTab />}</TabPanel>
          <TabPanel>{tabIndex === 3 && <AuditTab />}</TabPanel>
          <TabPanel>{tabIndex === 4 && <IntegrationTab />}</TabPanel>
          <TabPanel>{tabIndex === 5 && <DataImportExportTab />}</TabPanel>
          <TabPanel>
            {tabIndex === 6 && <SystemMaintenanceBackupTab />}
          </TabPanel>
          <TabPanel>{tabIndex === 7 && <ComplianceTab />}</TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Profile;
