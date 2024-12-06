import { Skeleton, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import MaintenanceScheduleCard from '~/lib/components/Maintenance/Schedules/MaintenanceScheduleCard';
import ButtonPagination from '~/lib/components/UI/Pagination/ButtonPagination';
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

  return (
    <VStack width="full" alignItems="flex-start" spacing="40px">
      <VStack
        width="full"
        mt="36px"
        pl="32px"
        pr="19px"
        alignItems="flex-start"
        spacing="16px"
      >
        <Text size="md" fontWeight={700} width="full" pb="4px">
          Maintenance Schedule
        </Text>
        {isLoading ? (
          Array(3)
            .fill('')
            .map((_, index) => (
              <Skeleton width="full" rounded="8px" key={index} height="97px" />
            ))
        ) : allMaintenanceSchedule &&
          allMaintenanceSchedule?.data?.items.length >= 1 ? (
          <VStack width="full" spacing="16px">
            {allMaintenanceSchedule?.data?.items.map(
              (item: MaintenanceSchedule) => {
                const {
                  scheduleId,
                  scheduledDate,
                  scheduleName,
                  durationInHours,
                  contactPerson,
                  contactPersonEmail,
                  contactPersonPhoneNo,
                  createdBy,
                  maintenanceType,
                  currentStatus,
                } = item;
                return (
                  <MaintenanceScheduleCard
                    data={{
                      scheduleId,
                      scheduledDate,
                      scheduleName,
                      durationInHours,
                      contactPerson,
                      contactPersonPhoneNo,
                      contactPersonEmail,
                      maintenanceType,
                      currentStatus,
                      createdBy,
                    }}
                    isPartOfDefaultPlan={false}
                    key={item.scheduleId}
                  />
                );
              }
            )}
            {(allMaintenanceSchedule?.data?.hasPreviousPage ||
              allMaintenanceSchedule?.data?.hasNextPage) && (
              <ButtonPagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={allMaintenanceSchedule?.data?.totalPages}
              />
            )}
          </VStack>
        ) : (
          <Text
            width="full"
            size="md"
            fontWeight={400}
            fontStyle="italic"
            my="41px"
            color="neutral.600"
            textAlign="center"
          >
            No Maintenance Schedule at the moment.
          </Text>
        )}
      </VStack>
    </VStack>
  );
};

export default Schedules;
