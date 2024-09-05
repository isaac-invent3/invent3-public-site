/* eslint-disable no-unused-vars */
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
import ListView from './ListView';
import { assetData } from '~/lib/utils/MockData/asset';

const AssetManagement = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);

  return (
    <Flex width="full" direction="column">
      <Header />
      <Flex direction="column" mt="42px" position="relative">
        <Tabs variant="custom" width={'full'}>
          <Flex width="full" position="relative">
            <TabList>
              <Tab>List View</Tab>
              <Tab>Map View</Tab>
            </TabList>
            <Flex position="absolute" right={0} bottom="8px">
              <Filters setSearch={setSearch} />
            </Flex>
          </Flex>

          <TabPanels>
            <TabPanel>
              <ListView
                data={assetData}
                isLoading={false}
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
              />
            </TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default AssetManagement;
