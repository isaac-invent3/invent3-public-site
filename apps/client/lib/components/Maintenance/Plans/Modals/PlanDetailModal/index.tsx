import { HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import Button from '~/lib/components/UI/Button';
import BackButton from '~/lib/components/UI/Button/BackButton';
import GenericModal from '~/lib/components/UI/Modal';
import {
  MaintenancePlan,
  MaintenanceSchedule,
} from '~/lib/interfaces/maintenance.interfaces';
import InfoSection from './InfoSection';
import { useGetPlannedMaintenanceByAssetIdQuery } from '~/lib/redux/services/asset/general.services';
import MaintenanceScheduleCard from '../../../Schedules/MaintenanceScheduleCard';

interface PlanDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: MaintenancePlan;
}

const PlanDetailsModal = (props: PlanDetailsModalProps) => {
  const { isOpen, onClose, data } = props;
  const { data: allMaintenanceSchedule, isLoading } =
    useGetPlannedMaintenanceByAssetIdQuery({ id: 7 });
  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{ width: { md: '690px' }, rounded: 'none' }}
    >
      <HStack
        pt="16px"
        pb="29px"
        pl="32px"
        pr="4"
        width="full"
        justifyContent="space-between"
      >
        <BackButton handleClick={onClose} />
        <Button customStyles={{ width: '138px', height: '35px' }}>
          Edit Plan
        </Button>
      </HStack>
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
            allMaintenanceSchedule?.data?.items.map(
              (item: MaintenanceSchedule) => (
                <MaintenanceScheduleCard data={item} key={item.scheduleId} />
              )
            )
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
    </GenericModal>
  );
};

export default PlanDetailsModal;
