import { DrawerBody, DrawerHeader, HStack } from '@chakra-ui/react';

import { BackButton, Button, GenericDrawer } from '@repo/ui/components';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import InfoSection from './InfoSection';
import Schedules from './Schedules';

interface PlanDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: MaintenancePlan;
  viewOnly?: boolean;
}

const PlanDetailsModal = (props: PlanDetailsModalProps) => {
  const { isOpen, onClose, data, viewOnly = false } = props;
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
          {!viewOnly && (
            <Button
              customStyles={{ width: '138px', height: '35px' }}
              href={`/maintenance/plans/${data?.maintenancePlanId}/edit`}
            >
              Edit Plan
            </Button>
          )}
        </HStack>
      </DrawerHeader>
      <DrawerBody p={0} id="allSchedulesDiv">
        <InfoSection data={data} />
        <Schedules planId={data?.maintenancePlanId} />
      </DrawerBody>
    </GenericDrawer>
  );
};

export default PlanDetailsModal;
