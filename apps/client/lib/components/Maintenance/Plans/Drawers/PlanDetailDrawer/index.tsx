import { DrawerBody, DrawerHeader, Flex, HStack } from '@chakra-ui/react';

import {
  BackButton,
  Button,
  GenericDrawer,
  LoadingSpinner,
} from '@repo/ui/components';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import InfoSection from './InfoSection';
import Schedules from './Schedules';
import GenericErrorState from '~/lib/components/UI/GenericErrorState';
import { useGetMaintenancePlanByIdQuery } from '~/lib/redux/services/maintenance/plan.services';
import { useEffect, useState } from 'react';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import {
  MAINTENANCE_PLAN_ENUM,
  ROUTES,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';

interface PlanDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId?: number;
  data: MaintenancePlan | null;
  viewOnly?: boolean;
}

const PlanDetailsModal = (props: PlanDetailsModalProps) => {
  const { isOpen, onClose, planId, data, viewOnly = false } = props;
  const { removeSearchParam } = useCustomSearchParams();
  const {
    data: planDetail,
    isLoading,
    isError,
  } = useGetMaintenancePlanByIdQuery(
    { id: +planId! },
    { skip: !planId || data !== null }
  );
  const [plan, setPlan] = useState<MaintenancePlan | null>(data);

  useEffect(() => {
    if (planDetail?.data) {
      setPlan(planDetail?.data?.maintenancePlanInfoHeader);
    }
  }, [planDetail]);

  const handleClose = () => {
    removeSearchParam(SYSTEM_CONTEXT_DETAILS.MAINTENANCE_PLANS.slug);
    onClose();
  };

  return (
    <GenericDrawer isOpen={isOpen} onClose={handleClose} maxWidth="690px">
      <DrawerHeader p={0} m={0}>
        <HStack
          pt="16px"
          pb="29px"
          pl={{ base: '16px', lg: '32px' }}
          pr="4"
          width="full"
          justifyContent="space-between"
        >
          <BackButton handleClick={handleClose} />
          {!viewOnly && plan && (
            <Button
              customStyles={{ width: '138px', height: '35px' }}
              href={`/${ROUTES.MAINTENANCE}/${ROUTES.MAINTENANCE_PLANS}/${plan?.maintenancePlanId}/edit`}
            >
              Edit Plan
            </Button>
          )}
        </HStack>
      </DrawerHeader>
      <DrawerBody p={0} id="allSchedulesDiv">
        {isLoading ? (
          <LoadingSpinner />
        ) : plan ? (
          <Flex direction="column">
            <InfoSection data={plan} />
            <Schedules
              planId={plan?.maintenancePlanId}
              isGroup={plan?.planTypeId === MAINTENANCE_PLAN_ENUM.default}
            />
          </Flex>
        ) : (
          isError && <GenericErrorState subtitle="Maintenance plan not found" />
        )}
      </DrawerBody>
    </GenericDrawer>
  );
};

export default PlanDetailsModal;
