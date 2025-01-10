import ScheduleTimeline from './Timeline';
import { Flex, useDisclosure } from '@chakra-ui/react';
import ScheduleStats from './Stats';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import EventDetailModal from './Timeline/Modals/EventDetailModal';
import { useEffect } from 'react';

const Schedules = () => {
  const { getSearchParam } = useCustomSearchParams();
  const maintenanceScheduleInstanceId = getSearchParam(
    'maintenanceScheduleInstanceId'
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (maintenanceScheduleInstanceId) {
      onOpen();
    }
  }, [maintenanceScheduleInstanceId]);

  return (
    <Flex mt="35px" width="full" gap="16px">
      <Flex width="77%">
        <ScheduleTimeline />
      </Flex>
      <Flex width="23%" mt="52px">
        <ScheduleStats />
      </Flex>
      <EventDetailModal
        isOpen={isOpen}
        onClose={onClose}
        scheduleInstanceId={
          maintenanceScheduleInstanceId ? +maintenanceScheduleInstanceId : null
        }
      />
    </Flex>
  );
};

export default Schedules;
