import { Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ScheduleList from '~/lib/components/Maintenance/Schedules/ScheduleList';
import { MaintenanceSchedule } from '~/lib/interfaces/maintenance.interfaces';
import { useGetMaintenanceSchedulesByPlanIdQuery } from '~/lib/redux/services/maintenance/schedule.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface SchedulesProps {
  planId: number;
}
const Schedules = (props: SchedulesProps) => {
  const { planId } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data: allMaintenanceSchedule, isLoading } =
    useGetMaintenanceSchedulesByPlanIdQuery({
      id: planId,
      pageSize,
      pageNumber: currentPage,
    });
  const [localSchedules, setLocalSchedules] = useState<MaintenanceSchedule[]>(
    []
  );

  useEffect(() => {
    if (allMaintenanceSchedule?.data?.items) {
      setLocalSchedules((prev) => [
        ...prev,
        ...allMaintenanceSchedule.data.items,
      ]);
    }
  }, [allMaintenanceSchedule]);

  return (
    <VStack width="full" alignItems="flex-start" spacing="40px">
      <VStack
        width="full"
        my="28px"
        pl={{ base: '16px', md: '32px' }}
        pr="19px"
        alignItems="flex-start"
        spacing="20px"
      >
        <Text
          size="md"
          color="primary.500"
          fontWeight={700}
          width="full"
          pb="4px"
          borderBottom="1px solid #BBBBBB80"
        >
          Maintenance Schedule
        </Text>
        <VStack width="full" spacing="16px">
          <ScheduleList
            hasMore={
              (allMaintenanceSchedule?.data &&
                allMaintenanceSchedule.data.pageNumber <
                  allMaintenanceSchedule.data.totalPages) ??
              false
            }
            scrollableTarget="allSchedulesDiv"
            isLoading={isLoading}
            allSchedules={localSchedules}
            setCurrentPage={setCurrentPage}
          />
        </VStack>
      </VStack>
    </VStack>
  );
};

export default Schedules;
