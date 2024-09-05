'use client';

import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Header from './Header';
import Filters from './Filters';

const AssetManagement = () => {
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState('');
  return (
    <Flex width="full" direction="column">
      <Header />
      <Flex direction="column" mt="42px" position="relative">
        <Tabs variant="custom" width={'full'}>
          <TabList>
            <Tab>List View</Tab>
            <Tab>Map View</Tab>
          </TabList>

          <TabPanels>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
        <Flex position="absolute" right={0} bottom="8px">
          <Filters setSearch={setSearch} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AssetManagement;
