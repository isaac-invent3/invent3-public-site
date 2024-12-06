import { Skeleton, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import MaintenanceScheduleCard from '~/lib/components/Maintenance/Schedules/MaintenanceScheduleCard';
import ButtonPagination from '~/lib/components/UI/Pagination/ButtonPagination';
import { MaintenanceScheduleInstance } from '~/lib/interfaces/maintenance.interfaces';
import { useGetAllScheduleInstanceQuery } from '~/lib/redux/services/maintenance/scheduleInstance.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface InstancesProps {
  scheduleId: number;
}
const Instances = (props: InstancesProps) => {
  // eslint-disable-next-line no-unused-vars
  const { scheduleId } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data: allScheduleInstances, isLoading } =
    useGetAllScheduleInstanceQuery({
      pageSize,
      pageNumber: currentPage,
    });

  return (
    <VStack
      width="full"
      mt="36px"
      pl="32px"
      pr="19px"
      mb="100px"
      alignItems="flex-start"
      spacing="32px"
    >
      <Text color="neutral.600">Instances</Text>
      <VStack width="full" spacing="16px">
        {isLoading ? (
          Array(3)
            .fill('')
            .map((_, index) => (
              <Skeleton width="full" rounded="8px" key={index} height="96px" />
            ))
        ) : allScheduleInstances &&
          allScheduleInstances?.data?.items.length >= 1 ? (
          <VStack width="full" spacing="16px">
            {allScheduleInstances?.data?.items.map(
              (item: MaintenanceScheduleInstance) => {
                const {
                  scheduleInstanceId,
                  scheduledDate,
                  scheduleInstanceName,
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
                      scheduleId: scheduleInstanceId,
                      scheduledDate,
                      scheduleName: scheduleInstanceName,
                      durationInHours,
                      contactPerson,
                      contactPersonPhoneNo,
                      contactPersonEmail,
                      maintenanceType,
                      currentStatus,
                      createdBy,
                    }}
                    isPartOfDefaultPlan={false}
                    key={item.scheduleInstanceId}
                  />
                );
              }
            )}
            {(allScheduleInstances?.data?.hasPreviousPage ||
              allScheduleInstances?.data?.hasNextPage) && (
              <ButtonPagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={allScheduleInstances?.data?.totalPages}
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
            No Schedule Instance at the moment.
          </Text>
        )}
      </VStack>
    </VStack>
  );
};

export default Instances;
