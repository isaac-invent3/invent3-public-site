import { Grid, GridItem, SimpleGrid } from '@chakra-ui/react';
import { Option } from '@repo/interfaces';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {
  useGetFrontdeskChartDataQuery,
  useGetFrontdeskMaintenanceSuccessChartDataQuery,
} from '~/lib/redux/services/dashboard/frontdesk.services';
import { generateLastFiveYears } from '~/lib/utils/helperFunctions';
import TicketTrend from './TicketTrend';
import { monthOptions } from '~/lib/utils/constants';
import MaintenanceSuccessChart from '~/lib/components/Dashboard/Common/Charts/MaintenanceSuccessChart';
import StageDistribution from './StageDistribution';

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
  const { data, isLoading, isFetching } = useGetFrontdeskChartDataQuery(
    {
      userId: user?.userId!,
      year: +selectedYear?.value!,
    },
    { skip: !user?.userId }
  );

  const { data: maintenanceCompleteData, isLoading: loadingMaintenance } =
    useGetFrontdeskMaintenanceSuccessChartDataQuery(
      {
        userId: user?.userId!,
      },
      { skip: !user?.userId }
    );

  const tempData = maintenanceCompleteData?.data?.find(
    (item) => item.monthId === selectedMonth?.value
  );

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
          columns={{ base: 1 }}
          width="full"
          bgColor="white"
          rounded="8px"
        >
          <TicketTrend
            data={data?.data?.openedAndResolvedTickets ?? []}
            isLoading={isLoading || isFetching}
          />
        </SimpleGrid>
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 2, lg: 1 }} mt={{ base: '1em', md: 0 }}>
        <StageDistribution
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          isLoading={false}
        />
      </GridItem>
    </Grid>
  );
};

export default SectionTwo;
