import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  VStack,
} from '@chakra-ui/react';

import HeaderInfo from './HeaderInfo';
import OtherInfo from './OtherInfo';
import PlanDetail from './PlanDetail';
import DrawerButtons from './DrawerButtons';
import { useGetScheduleInstanceByIdQuery } from '~/lib/redux/services/maintenance/scheduleInstance.services';
import { BackButton, GenericDrawer, LoadingSpinner } from '@repo/ui/components';
import GenericErrorState from '~/lib/components/UI/GenericErrorState';

interface MaintenanceScheduleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  scheduleInstanceId: number | null;
}
const MaintenanceScheduleDrawer = (props: MaintenanceScheduleDrawerProps) => {
  const { isOpen, onClose, scheduleInstanceId } = props;
  const { data, isLoading, isError, isFetching } =
    useGetScheduleInstanceByIdQuery(
      {
        instanceId: scheduleInstanceId!,
      },
      { skip: !scheduleInstanceId }
    );

  return (
    <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="690px">
      <DrawerHeader p={0} m={0} px={{ base: '16px', md: '18px' }} mt="21px">
        <BackButton handleClick={onClose} />
      </DrawerHeader>

      <DrawerBody p={0} m={0} position="relative">
        {isLoading || isFetching ? (
          <VStack my="220px" width="full" alignItems="center">
            <LoadingSpinner />
          </VStack>
        ) : data?.data ? (
          <VStack mt={{ base: '16px', lg: '42px' }}>
            <VStack
              width="full"
              spacing="40px"
              alignItems="flex-start"
              px="18px"
              pb="20px"
            >
              <HeaderInfo data={data?.data} />
              <OtherInfo data={data?.data} />
            </VStack>
            <VStack
              width="full"
              alignItems="flex-start"
              spacing="68px"
              mt="28px"
              px="16px"
              pb="26px"
            >
              <PlanDetail data={data?.data} />
            </VStack>
          </VStack>
        ) : (
          isError && <GenericErrorState subtitle="Invalid Schedule" />
        )}
      </DrawerBody>
      <DrawerFooter>
        {data?.data && !data?.data?.completionDate && (
          <DrawerButtons
            planId={data?.data?.maintenancePlanId}
            scheduleInstanceId={data?.data?.scheduleInstanceId}
          />
        )}
      </DrawerFooter>
    </GenericDrawer>
  );
};

export default MaintenanceScheduleDrawer;
