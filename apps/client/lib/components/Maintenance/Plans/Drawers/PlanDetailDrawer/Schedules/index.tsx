import { Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import ScheduleList from '~/lib/components/Maintenance/Schedules/ScheduleList';
import { MaintenanceSchedule } from '~/lib/interfaces/maintenance.interfaces';
import {
  useGetGroupMaintenanceSchedulesByPlanIdQuery,
  useGetMaintenanceSchedulesByPlanIdQuery,
} from '~/lib/redux/services/maintenance/schedule.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface SchedulesProps {
  planId: number;
  isGroup?: boolean;
}
const Schedules = (props: SchedulesProps) => {
  const { planId, isGroup = false } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data: allMaintenanceSchedule, isLoading } =
    useGetMaintenanceSchedulesByPlanIdQuery(
      {
        id: planId,
        pageSize,
        pageNumber: currentPage,
      },
      { skip: isGroup }
    );

  const {
    data: allGroupMaintenanceSchedule,
    isLoading: isLoadingGroupSchedules,
  } = useGetGroupMaintenanceSchedulesByPlanIdQuery(
    {
      id: planId,
      pageSize,
      pageNumber: currentPage,
    },
    { skip: !isGroup }
  );

  const [localSchedules, setLocalSchedules] = useState<MaintenanceSchedule[]>(
    []
  );

  const allMainSchedules = useMemo(() => {
    if (isGroup) {
      return allGroupMaintenanceSchedule;
    }
    return allMaintenanceSchedule;
  }, [isGroup]);

  useEffect(() => {
    if (allMainSchedules?.data?.items) {
      setLocalSchedules((prev) => [...prev, ...allMainSchedules.data.items]);
    }
  }, [allMainSchedules]);

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
              (allMainSchedules?.data &&
                allMainSchedules.data.pageNumber <
                  allMainSchedules.data.totalPages) ??
              false
            }
            scrollableTarget="allSchedulesDiv"
            isLoading={isLoading || isLoadingGroupSchedules}
            allSchedules={localSchedules}
            setCurrentPage={setCurrentPage}
          />
        </VStack>
      </VStack>
    </VStack>
  );
};

export default Schedules;
