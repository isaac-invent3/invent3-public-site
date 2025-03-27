'use client';

import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import Filters from './Filters';
import Header from './Header';
import ListView from './ListView';
import MapView from './MapView';
import { useRouter, useSearchParams } from 'next/navigation';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { ROUTES } from '~/lib/utils/constants';

const AssetManagement = () => {
  const [search, setSearch] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { getSearchParam } = useCustomSearchParams();
  const searchParams = useSearchParams();
  const [tabIndex, setTabIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<'bulk' | 'general' | null>(
    null
  );
  const [isDesktop] = useMediaQuery('(min-width: 768px)');
  const assetClassId = getSearchParam('assetClassId');

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
  useMemo(() => {
    const tab = searchParams?.get('tab');
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
    router.push(`/${ROUTES.ASSETS}?tab=${tabName}`);
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
            <TabList mx={{ base: '16px', md: 0 }} width="full">
              <Tab>List View</Tab>
              {isDesktop && !assetClassId && <Tab>Map View</Tab>}
            </TabList>
            {tabIndex === 0 && (
              <Flex
                position="absolute"
                right={0}
                bottom="8px"
                display={{ base: 'none', lg: 'flex' }}
              >
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
              <Flex display={{ base: 'flex', lg: 'none' }} mt="16px">
                <Filters
                  setSearch={setSearch}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                />
              </Flex>
              <ListView
                openFilter={isOpen}
                activeFilter={activeFilter}
                search={search}
              />
            </TabPanel>
            <TabPanel>{tabIndex === 1 && <MapView />}</TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default AssetManagement;
