import { Grid, GridItem, SimpleGrid } from '@chakra-ui/react';
import { Option } from '@repo/interfaces';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {
  useGetFrontdeskChartDataQuery,
  useGetFrontdeskMaintenanceSuccessChartDataQuery,
} from '~/lib/redux/services/dashboard/frontdesk.services';
import { generateLastFiveYears } from '~/lib/utils/helperFunctions';
import MaintenanceSuccessChart from '../../Common/Charts/MaintenanceSuccessChart';
import TaskCompletionRateChart from '../../Common/Charts/TaskCompletionRateChart';
import TicketTrend from './TicketTrend';
import { monthOptions } from '~/lib/utils/constants';

const SectionTwo = () => {
  const session = useSession();
  const user = session?.data?.user;
  const [selectedYear, setSelectedYear] = useState<Option | undefined>(
    generateLastFiveYears()[0] as Option
  );
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const actualMonthOptions = monthOptions.slice(1, monthOptions.length);
  const currentMonthOption = actualMonthOptions.find(
    (item) => item.value === currentMonth + 1
  );

  const [selectedMonth, setSelectedMonth] = useState<Option | null>(
    currentMonthOption ?? null
  );
  const { data, isLoading, isFetching } = useGetFrontdeskChartDataQuery({
    userId: user?.userId!,
    year: +selectedYear?.value!,
  });

  const { data: maintenanceData, isLoading: loadingMaintenance } =
    useGetFrontdeskMaintenanceSuccessChartDataQuery({
      year: currentYear,
      monthNo: +selectedMonth?.value!,
      userId: user?.userId!,
    });

  return (
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
      }}
      width="full"
      gap={{ md: '16px' }}
    >
      <GridItem colSpan={2}>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          width="full"
          bgColor="white"
          rounded="8px"
        >
          <TicketTrend
            data={data?.data?.openedAndResolvedTickets ?? []}
            isLoading={isLoading || isFetching}
          />
          <TaskCompletionRateChart
            notCompletedColorCode="#00A129"
            completedColorCode="#033376"
            data={data?.data?.completeAndIncompleteTasks ?? []}
            isLoading={isLoading || isFetching}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        </SimpleGrid>
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 2, lg: 1 }} mt={{ base: '1em', md: 0 }}>
        <MaintenanceSuccessChart
          missedColorCode="#00A129"
          completedColorCode="#033376"
          isLoading={loadingMaintenance}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          data={{
            missed: maintenanceData?.data?.missed ?? 0,
            completed: maintenanceData?.data?.completed ?? 0,
            percentageMissed: maintenanceData?.data?.percentageMissed ?? 0,
            percentageCompleted:
              maintenanceData?.data?.percentageCompleted ?? 0,
            monthId: maintenanceData?.data?.monthId ?? 0,
          }}
        />
      </GridItem>
    </Grid>
  );
};

export default SectionTwo;
