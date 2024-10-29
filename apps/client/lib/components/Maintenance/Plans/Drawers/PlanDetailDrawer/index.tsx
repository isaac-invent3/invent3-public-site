import {
  DrawerBody,
  DrawerHeader,
  HStack,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Button from '~/lib/components/UI/Button';
import BackButton from '~/lib/components/UI/Button/BackButton';
import {
  MaintenancePlan,
  MaintenanceSchedule,
} from '~/lib/interfaces/maintenance.interfaces';
import InfoSection from './InfoSection';
import MaintenanceScheduleCard from '../../../Schedules/MaintenanceScheduleCard';
import { useGetMaintenanceSchedulesByPlanIdQuery } from '~/lib/redux/services/maintenance/schedule.services';
import ButtonPagination from '~/lib/components/UI/Pagination/ButtonPagination';
import GenericDrawer from '~/lib/components/UI/GenericDrawer';

interface PlanDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: MaintenancePlan;
}

const PlanDetailsModal = (props: PlanDetailsModalProps) => {
  const { isOpen, onClose, data } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(25);
  const { data: allMaintenanceSchedule, isLoading } =
    useGetMaintenanceSchedulesByPlanIdQuery({
      id: data?.maintenancePlanId,
      pageSize,
      pageNumber: currentPage,
    });
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
          <Button
            customStyles={{ width: '138px', height: '35px' }}
            href={`/maintenance/plans/${data?.maintenancePlanId}/edit`}
          >
            Edit Plan
          </Button>
        </HStack>
      </DrawerHeader>
      <DrawerBody p={0}>
        <InfoSection data={data} />
        <VStack
          width="full"
          mt="36px"
          pl="32px"
          pr="19px"
          mb="100px"
          alignItems="flex-start"
          spacing="32px"
        >
          <Text size="md" fontWeight={700}>
            Maintenance Schedule
          </Text>
          <VStack width="full" spacing="16px">
            {isLoading ? (
              Array(3)
                .fill('')
                .map((_, index) => (
                  <Skeleton
                    width="full"
                    rounded="8px"
                    key={index}
                    height="96px"
                  />
                ))
            ) : allMaintenanceSchedule?.data?.items.length >= 1 ? (
              <VStack width="full" spacing="16px">
                {allMaintenanceSchedule?.data?.items.map(
                  (item: MaintenanceSchedule) => (
                    <MaintenanceScheduleCard
                      data={item}
                      isPartOfDefaultPlan={data?.planTypeName === 'Default'}
                      key={item.scheduleId}
                    />
                  )
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
      </DrawerBody>
    </GenericDrawer>
  );
};

export default PlanDetailsModal;
