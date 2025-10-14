import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';

const SensorDataPattern = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const AllTabs = ['Temperature', 'Vibration', 'Energy', 'Load'];
  return (
    <VStack width="full" spacing="26px" py={6}>
      <Tabs
        variant="enclosed"
        width={'full'}
        onChange={(index) => setTabIndex(index)}
        index={tabIndex}
      >
        <Flex width="full" px={{ base: '16px', md: 0 }}>
          <TabList width="full" borderBottomColor="#F2F1F1">
            {AllTabs.map((item, index) => (
              <Tab
                key={index}
                fontSize="10px"
                color="neutral.800"
                bgColor={index === tabIndex ? '#F2F1F1' : 'transparent'}
                borderTopRadius={index === tabIndex ? '8px' : 0}
              >
                {item}
              </Tab>
            ))}
          </TabList>
        </Flex>
        <TabPanels pt="16px">
          {AllTabs.map((item, index) => (
            <TabPanel width="full" key={index}>
              <Flex width="full">
                <LineChart
                  labels={[
                    'Sept. 1',
                    'Sept. 8',
                    'Sept. 15',
                    'Sept. 22',
                    'Sept. 28',
                  ]}
                  datasets={[
                    {
                      label: 'Sensor Data Pattern',
                      data: [20, 50, 30, 80, 60],
                      borderColor: '#8D35F1',
                      pointBorderColor: '#fff',
                      pointBackgroundColor: '#8D35F1',
                      pointRadius: 6,
                      borderWidth: 2,
                      tension: 0.4,
                      fill: false,
                    },
                  ]}
                  isLoading={false}
                  showXGrid={false}
                  showYGrid={false}
                  xLabel="Date Range"
                  yLabel="Unit"
                />
              </Flex>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default SensorDataPattern;
