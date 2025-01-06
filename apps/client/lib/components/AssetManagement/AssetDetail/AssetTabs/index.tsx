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

const AssetTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const AllTabs = [
    {
      label: 'General',
      slug: 'general',
      component: <GeneralTab />,
    },
    {
      label: 'Acquisition',
      slug: 'acquisition',
      component: <AcquisitionTab />,
    },
    {
      label: 'Maintenance Plan',
      slug: 'maintenancePlan',
      component: <MaintenanceTab />,
    },
    {
      label: 'Maintenance History',
      slug: 'maintenanceHistory',
      component: <HistoryTab />,
    },
    {
      label: 'Documents',
      slug: 'assetDocuments',
      component: <DocumentsTab />,
    },
    {
      label: 'Components',
      slug: 'assetComponents',
      component: <RelationshipTab />,
    },
  ];

  const { updateSearchParam, getSearchParam } = useCustomSearchParams();

  useEffect(() => {
    const tabSelected = getSearchParam('tabSelected');

    if (tabSelected) {
      const foundIndex = AllTabs.findIndex((tab) => tab.slug === tabSelected);

      setTabIndex(foundIndex !== -1 ? foundIndex : 0);
    }
  }, []);
  return (
    <Flex width="full" px="32px">
      <Tabs
        variant="custom"
        onChange={(index) => setTabIndex(index)}
        width={'full'}
        index={tabIndex}
      >
        <TabList>
          {AllTabs.map((item) => (
            <Tab
              paddingBottom="10px"
              key={item.label}
              onClick={() => updateSearchParam('tabSelected', item.slug)}
            >
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
