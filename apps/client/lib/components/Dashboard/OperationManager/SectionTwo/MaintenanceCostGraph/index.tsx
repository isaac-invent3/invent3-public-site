import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';

import Y2DTab from './Y2DTab';
import YTYTab from './YTYTab';
import CardHeader from '../../../Common/CardHeader';

const MaintenanceCostGraph = () => {
  return (
    <VStack
      width="full"
      height="full"
      minH="354px"
      p="16px 19px 19px 16px"
      alignItems="flex-start"
      spacing="16px"
      bgColor="white"
      rounded="8px"
    >
      <CardHeader>Total Maintenance Cost</CardHeader>
      <Tabs variant="custom" width={'full'}>
        <TabList>
          <Tab paddingBottom="4px">YTD</Tab>
          <Tab paddingBottom="4px">YTY</Tab>
        </TabList>

        <TabPanels>
          <TabPanel mt="16px">
            <Y2DTab />
          </TabPanel>
          <TabPanel mt="16px">
            <YTYTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default MaintenanceCostGraph;
