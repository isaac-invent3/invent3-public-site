import { Flex, Grid, GridItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import TicketSummary from './TicketSummary';
import MaintenanceSuccessChart from '../../../Common/Charts/MaintenanceSuccessChart';
import TaskCompletionRateChart from '../../../Common/Charts/TaskCompletionRateChart';
import AssetSummary from './AssetSummary';
import { useSession } from 'next-auth/react';
import { useGetFrontdeskChartDataQuery } from '~/lib/redux/services/dashboard/frontdesk.services';
import { generateLastFiveYears } from '~/lib/utils/helperFunctions';
import { Option } from '~/lib/interfaces/general.interfaces';

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
      <Flex gap="16px" width="full" height="full">
        <Flex width="max-content" minH="full">
          <TicketSummary />
        </Flex>
        <Flex width="full">
          <AssetSummary />
        </Flex>
      </Flex>
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap="16px"
        width="full"
        height="full"
      >
        <GridItem colSpan={1} width="full">
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
        </GridItem>

        <GridItem colSpan={2}>
          <MaintenanceSuccessChart
            missedColorCode="#EABC30"
            completedColorCode="#033376"
          />
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default LeftSide;
