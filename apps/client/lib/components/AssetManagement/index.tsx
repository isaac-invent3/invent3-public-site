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
import Filters from './Filters';
import FilterDisplay from './Filters/FilterDisplay';
import { FilterInput } from '~/lib/interfaces/asset.interfaces';
import MapView from './MapView';
import { useRouter, useSearchParams } from 'next/navigation';

const AssetManagement = () => {
  const [search, setSearch] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tabIndex, setTabIndex] = useState(0);

  const [filterData, setFilterData] = useState<FilterInput>({
    location: [],
    category: [],
  });
  const [activeFilter, setActiveFilter] = useState<'bulk' | 'general' | null>(
    null
  );

  // Handles Toggling the  Filter
  useEffect(() => {
    if (activeFilter && !isOpen) {
      onOpen();
    }
    if (!activeFilter) {
      onClose();
    }
  }, [activeFilter]);

  // Retrieve the `tab` parameter from URL on mount
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'map') {
      setTabIndex(1); // Set to the map tab if "map" is in the URL
    } else {
      setTabIndex(0); // Otherwise default to list tab
    }
  }, [searchParams]);

  // Update the URL whenever the tab is changed
  const handleTabChange = (index: number) => {
    setTabIndex(index);
    const tabName = index === 1 ? 'map' : 'list';
    router.push(`/asset-management?tab=${tabName}`);
  };

  return (
    <Flex width="full" direction="column" pb="24px">
      <Header />
      <Flex direction="column" mt="42px" position="relative">
        <Tabs
          variant="custom"
          width={'full'}
          onChange={(index) => handleTabChange(index)}
          index={tabIndex}
        >
          <Flex width="full" position="relative">
            <TabList>
              <Tab>List View</Tab>
              <Tab>Map View</Tab>
            </TabList>
            {tabIndex === 0 && (
              <Flex position="absolute" right={0} bottom="8px">
                <Filters
                  setSearch={setSearch}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                />
              </Flex>
            )}
          </Flex>

          <TabPanels>
            <TabPanel>
              <FilterDisplay
                activeFilter={activeFilter}
                isOpen={isOpen}
                filterData={filterData}
                setFilterData={setFilterData}
              />
              <ListView search={search} />
            </TabPanel>
            <TabPanel>{tabIndex === 1 && <MapView />}</TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default AssetManagement;
