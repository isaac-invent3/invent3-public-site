import {
  DrawerBody,
  DrawerHeader,
  Flex,
  HStack,
  Spinner,
  VStack,
} from '@chakra-ui/react';

import { BackButton, Button, GenericDrawer } from '@repo/ui/components';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import InfoSection from './InfoSection';
import Schedules from './Schedules';
import GenericErrorState from '~/lib/components/UI/GenericErrorState';
import { useGetMaintenancePlanByIdQuery } from '~/lib/redux/services/maintenance/plan.services';
import { useEffect, useState } from 'react';

interface PlanDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId?: number;
  data: MaintenancePlan | null;
  viewOnly?: boolean;
}

const PlanDetailsModal = (props: PlanDetailsModalProps) => {
  const { isOpen, onClose, planId, data, viewOnly = false } = props;
  const { data: planDetail, isLoading } = useGetMaintenancePlanByIdQuery(
    { id: +planId! },
    { skip: !planId || data !== null }
  );
  const [plan, setPlan] = useState<MaintenancePlan | null>(data);

  useEffect(() => {
    if (planDetail?.data) {
      setPlan(planDetail?.data?.maintenancePlanInfoHeader);
    }
  }, [planDetail]);

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
          {!viewOnly && plan && (
            <Button
              customStyles={{ width: '138px', height: '35px' }}
              href={`/maintenance/plans/${plan?.maintenancePlanId}/edit`}
            >
              Edit Plan
            </Button>
          )}
        </HStack>
      </DrawerHeader>
      <DrawerBody p={0} id="allSchedulesDiv">
        {isLoading ? (
          <VStack width="full" height="full" justifyContent="center">
            <Spinner
              thickness="4px"
              size="lg"
              color="primary.500"
              emptyColor="gray.200"
            />
          </VStack>
        ) : plan ? (
          <Flex direction="column">
            <InfoSection data={plan} />
            <Schedules planId={plan?.maintenancePlanId} />
          </Flex>
        ) : (
          <GenericErrorState subtitle="Maintenance plan not found" />
        )}
      </DrawerBody>
    </GenericDrawer>
  );
};

export default PlanDetailsModal;
