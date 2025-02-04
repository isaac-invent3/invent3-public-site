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
import ActionDetails from './ActionDetails';
import RelatedLogs from './RelatedLogs';
import SecurityCompliance from './SecurityCompliance';
import AdditionalMetaData from './AdditionalMetaData';

const AuditLogTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const AllTabs = [
    {
      label: 'Action Details',
      slug: 'actionDetails',
      component: <ActionDetails />,
    },
    {
      label: 'Additional MetaData',
      slug: 'additionalMetaData',
      component: <AdditionalMetaData />,
    },
    {
      label: 'Related logs',
      slug: 'relatedLogs',
      component: <RelatedLogs />,
    },
    {
      label: 'Security & Compliance',
      slug: 'securityCompliance',
      component: <SecurityCompliance />,
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

        <TabPanels pb="24px">
          {AllTabs.map((item, index) => (
            <TabPanel key={item.label} pt="33px">
              {index === tabIndex && item.component}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default AuditLogTabs;
