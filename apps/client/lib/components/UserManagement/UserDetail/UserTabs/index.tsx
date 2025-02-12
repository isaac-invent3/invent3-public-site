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
import OccupationInformation from './OccupationInformation';
import EmployeeInformation from './EmployeeInformation';
import Attachments from './Attachments';

const UserTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const AllTabs = [
    {
      label: 'Occupation Information',
      slug: 'occupationInformation',
      component: <OccupationInformation />,
    },
    {
      label: 'Employee Information',
      slug: 'employeeInformation',
      component: <EmployeeInformation />,
    },
    {
      label: 'Attachments',
      slug: 'attachments',
      component: <Attachments />,
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
    <Flex width="full" px={{ base: '16px', md: '32px' }}>
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
            <TabPanel key={item.label} pt="33px">
              {index === tabIndex && item.component}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default UserTabs;
