import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import AcquisitionTab from './AcquisitionTab';
import DocumentsTab from './DocumentsTab';
import GeneralTab from './GeneralTab';
import HistoryTab from './HistoryTab';
import MaintenanceTab from './MaintenanceTab';
import RelationshipTab from './RelationshipTab';
import AssetTickets from './AssetTickets';
import DepreciationTab from './DepreciationTab';
import FailureForecast from './FailureForecast';
import DynamicTabs from '~/lib/components/UI/DynamicTab';

const AssetTabs = () => {
  const { updateSearchParam, getSearchParam } = useCustomSearchParams();
  const tabParam = getSearchParam('tab');
  const AllTabs = [
    {
      name: 'General',
      component: <GeneralTab />,
    },
    {
      name: 'Acquisition',
      component: <AcquisitionTab />,
    },
    {
      name: 'Maintenance Plan',
      component: <MaintenanceTab />,
    },
    {
      name: 'Documents',
      component: <DocumentsTab />,
    },
    {
      name: 'Components',
      component: <RelationshipTab />,
    },
    {
      name: 'Open Tickets',
      component: <AssetTickets />,
    },
    {
      name: 'Depreciation',
      component: <DepreciationTab />,
    },
    {
      name: 'Failure Forecast',
      component: <FailureForecast />,
    },
  ];

  // useEffect(() => {
  //   const tabSelected = getSearchParam('tabSelected');

  //   if (tabSelected) {
  //     const foundIndex = AllTabs.findIndex((tab) => tab.slug === tabSelected);

  //     setTabIndex(foundIndex !== -1 ? foundIndex : 0);
  //   }
  // }, []);
  return (
    <Flex width="full" px={{ base: '16px', md: '32px' }}>
      <DynamicTabs
        tabs={AllTabs}
        activeTabParam={tabParam}
        onTabChange={(name) => updateSearchParam('tab', name)}
        isLoading={false}
      />
    </Flex>
  );
};

export default AssetTabs;
