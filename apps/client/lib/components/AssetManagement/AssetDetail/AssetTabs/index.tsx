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

const AssetTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const AllTabs = [
    {
      label: 'General',
      component: <GeneralTab />,
    },
    {
      label: 'Acquistion',
      component: <AcquisitionTab />,
    },
    {
      label: 'Maintenance',
      component: null,
    },
    {
      label: 'History',
      component: null,
    },
    {
      label: 'Documents',
      component: null,
    },
    {
      label: 'Relationship',
      component: null,
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
            <Tab paddingBottom="10px">{item.label}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {AllTabs.map((item, index) => (
            <TabPanel>{index === tabIndex && item.component}</TabPanel>
          ))}
          <TabPanel></TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default AssetTabs;
