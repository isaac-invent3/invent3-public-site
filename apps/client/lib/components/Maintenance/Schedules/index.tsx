import { Flex, useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import ScheduleStats from './Stats';
import ScheduleTimeline from './Timeline';
import EventDetailModal from './Timeline/Modals/EventDetailModal';

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
    <>
      <Flex
        mt={{ base: '24px', md: '35px' }}
        width="full"
        gap="16px"
        flexDir={{ base: 'column', lg: 'row' }}
        px={{ base: '16px', md: 0 }}
      >
        <Flex
          width={{ base: 'full', lg: '77%' }}
          mt={{ base: '16px', lg: undefined }}
          order={{ base: 1, lg: 0 }}
        >
          <ScheduleTimeline />
        </Flex>

        <Flex
          width={{ base: 'full', lg: '23%' }}
          mt={{ base: undefined, lg: '52px' }}
          order={{ base: 0, lg: 1 }}
        >
          <ScheduleStats />
        </Flex>
      </Flex>

      <EventDetailModal
        isOpen={isOpen}
        onClose={onClose}
        scheduleInstanceId={
          maintenanceScheduleInstanceId ? +maintenanceScheduleInstanceId : null
        }
      />
    </>
  );
};

export default Schedules;
