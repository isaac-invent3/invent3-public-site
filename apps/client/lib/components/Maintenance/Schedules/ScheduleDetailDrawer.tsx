import {
  DrawerBody,
  DrawerHeader,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import BackButton from '~/lib/components/UI/Button/BackButton';
import GenericDrawer from '~/lib/components/UI/GenericDrawer';
import MaintenanceScheduleCard from './MaintenanceScheduleCard';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { useGetMaintenanceSchedulesByPlanIdQuery } from '~/lib/redux/services/maintenance/schedule.services';
import { MaintenanceSchedule } from '~/lib/interfaces/maintenance.interfaces';
import InfiniteScroll from 'react-infinite-scroll-component';
import ScheduleSkeletonLoader from './ScheduleSkeletonLoader';

interface ScheduleDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  planId: number;
}

const ScheduleDetailDrawer = (props: ScheduleDetailDrawerProps) => {
  const { isOpen, onClose, planId } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(DEFAULT_PAGE_SIZE);
  const [localSchedules, setLocalSchedules] = useState<MaintenanceSchedule[]>(
    []
  );
  const { data: allSchedules, isLoading } =
    useGetMaintenanceSchedulesByPlanIdQuery(
      {
        id: planId,
        pageSize,
        pageNumber: currentPage,
      },
      { skip: !planId }
    );

  useEffect(() => {
    if (allSchedules?.data?.items) {
      setLocalSchedules((prev) => [...prev, ...allSchedules.data.items]);
    }
  }, [allSchedules]);

  return (
    <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="690px">
      <DrawerHeader p={0} m={0}>
        <HStack
          pt="16px"
          pb="29px"
          pl="32px"
          pr="4"
          width="full"
          justifyContent="space-between"
        >
          <BackButton handleClick={onClose} />
        </HStack>
      </DrawerHeader>
      <DrawerBody p={0} id="allSchedulesDiv">
        <VStack width="full" alignItems="flex-start" spacing="32px" pb="24px">
          <Heading
            fontSize="32px"
            lineHeight="38.02px"
            fontWeight={800}
            color="primary.500"
            pl="32px"
          >
            List of Schedules
          </Heading>
          <VStack
            width="full"
            pl="32px"
            pr="19px"
            alignItems="flex-start"
            spacing="16px"
          >
            <InfiniteScroll
              dataLength={localSchedules.length}
              next={() => {
                setCurrentPage((prev) => prev + 1);
              }}
              hasMore={
                (allSchedules?.data &&
                  allSchedules.data.pageNumber <
                    allSchedules.data.totalPages) ??
                false
              }
              scrollableTarget="allSchedulesDiv"
              loader={<ScheduleSkeletonLoader />}
            >
              {isLoading ? (
                <ScheduleSkeletonLoader />
              ) : localSchedules.length >= 1 ? (
                <VStack width="full" spacing="16px">
                  {localSchedules.map((item: MaintenanceSchedule) => {
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
                  })}
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
            </InfiniteScroll>
          </VStack>
        </VStack>
      </DrawerBody>
    </GenericDrawer>
  );
};

export default ScheduleDetailDrawer;
