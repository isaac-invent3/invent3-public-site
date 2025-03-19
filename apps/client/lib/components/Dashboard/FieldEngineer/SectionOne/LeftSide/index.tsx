import { Flex, Grid, GridItem, SimpleGrid } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Option } from '~/lib/interfaces/general.interfaces';
import { generateLastFiveYears } from '~/lib/utils/helperFunctions';
import MaintenanceSuccessChart from '../../../Common/Charts/MaintenanceSuccessChart';
import TaskCompletionRateChart from '../../../Common/Charts/TaskCompletionRateChart';
import AssetSummary from './AssetSummary';
import TicketSummary from './TicketSummary';
import {
  useGetFieldEngineerkMaintenanceSuccessChartDataQuery,
  useGetFieldEngineerTaskChartDataQuery,
} from '~/lib/redux/services/dashboard/fieldengineer.services';
import { monthOptions } from '~/lib/utils/constants';

const LeftSide = () => {
  const session = useSession();
  const user = session?.data?.user;
  const [selectedYear, setSelectedYear] = useState<Option | undefined>(
    generateLastFiveYears()[0] as Option
  );
  const { data, isLoading, isFetching } = useGetFieldEngineerTaskChartDataQuery(
    {
      userId: user?.userId!,
      // year: +selectedYear?.value!,
    }
  );
  const currentMonth = new Date().getMonth();
  const actualMonthOptions = monthOptions.slice(1, monthOptions.length);
  const currentMonthOption = actualMonthOptions.find(
    (item) => item.value === currentMonth + 1
  );

  const [selectedMonth, setSelectedMonth] = useState<Option | null>(
    currentMonthOption ?? null
  );

  const { data: maintenanceData, isLoading: loadingMaintenance } =
    useGetFieldEngineerkMaintenanceSuccessChartDataQuery({
      // monthNo: +selectedMonth?.value!,
      userId: user?.userId!,
    });

  const selectedMonthMaintenance = maintenanceData?.data?.find(
    (item) => item.monthId === selectedMonth?.value
  );

  const maintenance = selectedMonthMaintenance
    ? {
        missed: selectedMonthMaintenance?.missed,
        completed: selectedMonthMaintenance?.completed,
        monthId: selectedMonthMaintenance?.monthId,
      }
    : undefined;

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
                data?.data?.map((item) => ({
                  complete: item.tasksCompleted,
                  inComplete: item.taskNotCompleted,
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
              isLoading={loadingMaintenance}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              data={maintenance}
            />
          </SimpleGrid>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default LeftSide;
