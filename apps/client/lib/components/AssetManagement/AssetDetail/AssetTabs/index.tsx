import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import GeneralTab from './GeneralTab';
import AcquisitionTab from './AcquisitionTab';
import MaintenanceTab from './MaintenanceTab';
import DocumentsTab from './DocumentsTab';
import HistoryTab from './HistoryTab';
import RelationshipTab from './RelationshipTab';

const AssetTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const AllTabs = [
    {
      label: 'General',
      component: <GeneralTab />,
    },
    {
      label: 'Acquisition',
      component: <AcquisitionTab />,
    },
    {
      label: 'Maintenance Plan',
      component: <MaintenanceTab />,
    },
    {
      label: 'Maintenance History',
      component: <HistoryTab />,
    },
    {
      label: 'Documents',
      component: <DocumentsTab />,
    },
    {
      label: 'Components',
      component: <RelationshipTab />,
    },
  ];
  return (
    <Flex width="full" px="32px">
      <Tabs
        variant="custom"
        onChange={(index) => setTabIndex(index)}
        width={'full'}
      >
        <TabList>
          {AllTabs.map((item) => (
            <Tab paddingBottom="10px" key={item.label}>
              {item.label}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          {AllTabs.map((item, index) => (
            <TabPanel key={item.label}>
              {index === tabIndex && item.component}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default AssetTabs;
