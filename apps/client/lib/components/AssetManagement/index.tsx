/* eslint-disable no-unused-vars */
'use client';

import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import ListView from './ListView';
import { assetData } from '~/lib/utils/MockData/asset';
import Filters from './Filters';
import FilterDisplay from './Filters/FilterDisplay';
import { FilterInput } from '~/lib/interfaces/asset.interfaces';
import { useGetallAssetQuery } from '~/lib/redux/services/asset.services';

const AssetManagement = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [filterData, setFilterData] = useState<FilterInput>({
    location: [],
    category: [],
  });
  const [activeFilter, setActiveFilter] = useState<'bulk' | 'general' | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: assetData, isLoading } = useGetallAssetQuery({});

  useEffect(() => {
    if (activeFilter && !isOpen) {
      onOpen();
    }
    if (!activeFilter) {
      onClose();
    }
  }, [activeFilter]);

  return (
    <Flex width="full" direction="column" pb="24px">
      <Header />
      <Flex direction="column" mt="42px" position="relative">
        <Tabs variant="custom" width={'full'}>
          <Flex width="full" position="relative">
            <TabList>
              <Tab>List View</Tab>
              <Tab>Map View</Tab>
            </TabList>
            <Flex position="absolute" right={0} bottom="8px">
              <Filters
                setSearch={setSearch}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
              />
            </Flex>
          </Flex>

          <TabPanels>
            <TabPanel>
              <FilterDisplay
                activeFilter={activeFilter}
                isOpen={isOpen}
                filterData={filterData}
                setFilterData={setFilterData}
              />
              <ListView
                data={assetData}
                isLoading={isLoading}
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
