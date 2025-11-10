import { Flex, VStack } from '@chakra-ui/react';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import DynamicTabs from '~/lib/components/UI/DynamicTab';
import Anomalies from './Anomalies';
import Predictions from './Predictions';
import Recommendations from './Recommendations';
import Trends from './Trends';

const AITabs = () => {
  const { updateSearchParam, getSearchParam } = useCustomSearchParams();
  const tabParam = getSearchParam('tab');

  const AllTabs = [
    {
      name: 'Anomalies',
      component: <Anomalies />,
    },
    {
      name: 'Predictions',
      component: <Predictions />,
    },
    {
      name: 'Recommendations',
      component: <Recommendations />,
    },
    {
      name: 'Trends',
      component: <Trends />,
    },
  ];

  return (
    <VStack
      width="full"
      height="full"
      alignItems="flex-start"
      spacing="16px"
      bgColor="white"
      rounded="8px"
      minH="353px"
      pt={6}
    >
      <DynamicTabs
        tabs={AllTabs}
        activeTabParam={tabParam}
        onTabChange={(name) => updateSearchParam('tab', name)}
        isLoading={false}
      />
    </VStack>
  );
};

export default AITabs;
