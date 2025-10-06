'use client';

import {
  Flex,
  HStack,
  Icon,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useMediaQuery,
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import PageHeader from '../UI/PageHeader';
import { AddIcon } from '../CustomIcons';
import { Button } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import ListView from './ListView';
import MapView from './MapView';

const FacilityManagement = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tabIndex, setTabIndex] = useState(0);
  const [isDesktop] = useMediaQuery('(min-width: 768px)');

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
    router.push(`/${ROUTES.LOCATION}?tab=${tabName}`);
  };
  return (
    <Flex
      width="full"
      direction="column"
      pb="24px"
      gap="32px"
      px={{ base: '16px', lg: '0px' }}
    >
      <Stack
        width="full"
        justifyContent="space-between"
        direction={{ base: 'column', md: 'row' }}
        spacing="16px"
        px={{ base: '16px', md: 0 }}
      >
        <PageHeader>Facility Management</PageHeader>
        <HStack>
          <Button
            customStyles={{
              width: '198px',
              height: { base: '36px', md: 'min-content' },
              alignSelf: 'end',
            }}
            href={`/${ROUTES.LOCATION}/cross-facility`}
            variant="outline"
          >
            Cross-Facility Comparison
          </Button>
          <Button
            customStyles={{
              width: '184px',
              height: { base: '36px', md: 'min-content' },
              alignSelf: 'end',
            }}
            href={`/${ROUTES.LOCATION}/add`}
          >
            <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
            Add New Facility
          </Button>
        </HStack>
      </Stack>

      <Tabs
        variant="custom"
        width={'full'}
        onChange={(index) => handleTabChange(index)}
        index={tabIndex}
      >
        <Flex width="full" position="relative">
          <TabList mx={{ base: '16px', md: 0 }} width="full">
            <Tab>List View</Tab>
            {isDesktop && <Tab>Map View</Tab>}
          </TabList>
        </Flex>

        <TabPanels>
          <TabPanel pt="16px">
            <ListView />
          </TabPanel>
          <TabPanel>{tabIndex === 1 && <MapView />}</TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default FacilityManagement;
