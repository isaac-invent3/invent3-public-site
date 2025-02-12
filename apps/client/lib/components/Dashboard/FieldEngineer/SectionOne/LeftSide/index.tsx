import { Flex, Grid, GridItem, SimpleGrid } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Option } from '~/lib/interfaces/general.interfaces';
import { useGetFrontdeskChartDataQuery } from '~/lib/redux/services/dashboard/frontdesk.services';
import { generateLastFiveYears } from '~/lib/utils/helperFunctions';
import MaintenanceSuccessChart from '../../../Common/Charts/MaintenanceSuccessChart';
import TaskCompletionRateChart from '../../../Common/Charts/TaskCompletionRateChart';
import AssetSummary from './AssetSummary';
import TicketSummary from './TicketSummary';

const LeftSide = () => {
  const session = useSession();
  const user = session?.data?.user;
  const [selectedYear, setSelectedYear] = useState<Option | undefined>(
    generateLastFiveYears()[0] as Option
  );
  const { data, isLoading, isFetching } = useGetFrontdeskChartDataQuery({
    userId: user?.userId!,
    year: +selectedYear?.value!,
  });
  return (
    <Flex direction="column" gap="16px" width="full">
      <Flex
        gap="16px"
        width="full"
        height="full"
        flexDir={{ base: 'column', md: 'row' }}
      >
        <Flex
          width={{ base: 'full', md: '50%' }}
          minH="full"
          overflow="scroll"
          flexDir={{ base: 'column', md: 'row' }}
        >
          <TicketSummary />
        </Flex>
        <Flex
          width={{ base: 'full', md: '50%' }}
          overflow="scroll"
          flexDir={{ base: 'column', md: 'row' }}
        >
          <AssetSummary />
        </Flex>
      </Flex>

      <Grid
        templateColumns={{ base: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}
        gap="16px"
        width="full"
        height="full"
      >
        <GridItem colSpan={{ base: 2, xl: 1 }} width="full">
          <SimpleGrid width="full" columns={1} minH="350px">
            <TaskCompletionRateChart
              notCompletedColorCode="#EABC30"
              completedColorCode="#033376"
              data={
                data?.data?.completeAndIncompleteTasks.map((item) => ({
                  complete: item.complete,
                  inComplete: item.inComplete,
                  monthId: item.monthId,
                  year: item.year,
                })) ?? []
              }
              isLoading={isLoading || isFetching}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
            />
          </SimpleGrid>
        </GridItem>

        <GridItem colSpan={{ base: 2, lg: 2, xl: 2 }}>
          <SimpleGrid height="full" minH="350px" columns={1}>
            <MaintenanceSuccessChart
              missedColorCode="#EABC30"
              completedColorCode="#033376"
            />
          </SimpleGrid>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default LeftSide;
