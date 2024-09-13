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
import React, { useCallback, useEffect, useState } from 'react';
import Header from './Header';
import ListView from './ListView';
import Filters from './Filters';
import FilterDisplay from './Filters/FilterDisplay';
import { FilterInput } from '~/lib/interfaces/asset.interfaces';
import { useGetallAssetQuery } from '~/lib/redux/services/asset/general.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useSearchApiMutation } from '~/lib/redux/services/utility.services';
import { SearchResponse } from '~/lib/interfaces/general.interfaces';

const AssetManagement = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit } = useCustomMutation();
  const [searchAsset, { isLoading: searchLoading }] = useSearchApiMutation({});
  const [searchData, setSearchData] = useState<SearchResponse | null>(null);
  const [filterData, setFilterData] = useState<FilterInput>({
    location: [],
    category: [],
  });
  const [activeFilter, setActiveFilter] = useState<'bulk' | 'general' | null>(
    null
  );
  const {
    data: assetData,
    isLoading,
    isFetching,
  } = useGetallAssetQuery(
    {
      pageNumber: currentPage,
      pageSize: pageSize,
    },
    { skip: search !== '' }
  );

  const searchCriterion = {
    criterion: [
      {
        columnName: 'assetName',
        columnValue: search,
        operation: 7,
      },
    ],
    pageNumber: currentPage,
    pageSize: pageSize,
  };

  const handleSearch = useCallback(async () => {
    const response = await handleSubmit(searchAsset, searchCriterion, '');
    setSearchData(response?.data?.data);
  }, [searchAsset, searchCriterion]);

  // Trigger search when search input changes or pagination updates
  useEffect(() => {
    if (search) {
      handleSearch();
    }
  }, [search, currentPage, pageSize]);

  // Reset pagination when clearing the search
  useEffect(() => {
    if (!search) {
      setPageSize(10);
      setCurrentPage(1);
    }
  }, [search]);

  // Handles Toggling the Asset Details Drawer
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
                data={
                  search && searchData
                    ? searchData.items
                    : (assetData?.data?.items ?? [])
                }
                isLoading={isLoading}
                isFetching={isFetching || searchLoading}
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalPages={
                  search && searchData
                    ? searchData?.totalPages
                    : assetData?.data?.totalPages
                }
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
