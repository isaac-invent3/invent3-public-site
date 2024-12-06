import { DrawerBody, DrawerHeader, HStack } from '@chakra-ui/react';
import React from 'react';
import Button from '~/lib/components/UI/Button';
import BackButton from '~/lib/components/UI/Button/BackButton';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import InfoSection from './InfoSection';
import GenericDrawer from '~/lib/components/UI/GenericDrawer';
import Schedules from './Schedules';

interface PlanDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: MaintenancePlan;
}

const PlanDetailsModal = (props: PlanDetailsModalProps) => {
  const { isOpen, onClose, data } = props;
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
        <Schedules planId={data?.maintenancePlanId} />
      </DrawerBody>
    </GenericDrawer>
  );
};

export default PlanDetailsModal;
