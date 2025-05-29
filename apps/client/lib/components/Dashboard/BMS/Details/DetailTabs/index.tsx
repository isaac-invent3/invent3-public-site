import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import Overview from './Overview';
import EnergyManagement from './EnergyManagement';
import EnvironmentalControl from './EnvironmentalControl';
import OccupancyManagement from './OccupancyManagement';
import PredictiveMaintenance from './PredictiveMaintenance';
import FinancialInsight from './FinancialInsight';
import SustainabilityMetrics from './SustainabilityMetrics';
import FloorPlan from './FloorPlan';

const DetailTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const AllTabs = [
    {
      label: 'Overview',
      slug: 'overview',
      component: <Overview />,
    },
    {
      label: 'Energy Management',
      slug: 'energyManagement',
      component: <EnergyManagement />,
    },
    {
      label: 'Environmental Control',
      slug: 'environmentalControl',
      component: <EnvironmentalControl />,
    },
    {
      label: 'Occupancy Management',
      slug: 'occupancyManagement',
      component: <OccupancyManagement />,
    },
    {
      label: 'Predictive Maintenance',
      slug: 'predictiveMaintenance',
      component: <PredictiveMaintenance />,
    },
    {
      label: 'Sustainability Metrics',
      slug: 'sustainabilityMetrics',
      component: <SustainabilityMetrics />,
    },
    {
      label: 'Financial Insights',
      slug: 'financialInsights',
      component: <FinancialInsight />,
    },
    {
      label: 'Floor Plan',
      slug: 'floorPlan',
      component: <FloorPlan />,
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
    <Flex width="full">
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
              <VStack
                rounded="6px"
                bgColor="white"
                minH="30vh"
                mt="16px"
                width="full"
                p={0}
                overflow="hidden"
              >
                {index === tabIndex && item.component}
              </VStack>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default DetailTabs;
