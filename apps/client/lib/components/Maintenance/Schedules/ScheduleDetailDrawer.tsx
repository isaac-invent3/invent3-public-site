import {
  DrawerBody,
  DrawerHeader,
  Heading,
  HStack,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BackButton, GenericDrawer } from '@repo/ui/components';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { useGetMaintenanceSchedulesByPlanIdQuery } from '~/lib/redux/services/maintenance/schedule.services';
import { MaintenanceSchedule } from '~/lib/interfaces/maintenance.interfaces';
import ScheduleList from './ScheduleList';

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
            <ScheduleList
              hasMore={
                (allSchedules?.data &&
                  allSchedules.data.pageNumber <
                    allSchedules.data.totalPages) ??
                false
              }
              scrollableTarget="allSchedulesDiv"
              isLoading={isLoading}
              allSchedules={localSchedules}
              setCurrentPage={setCurrentPage}
            />
          </VStack>
        </VStack>
      </DrawerBody>
    </GenericDrawer>
  );
};

export default ScheduleDetailDrawer;
