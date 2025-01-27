import { Text, VStack } from '@chakra-ui/react';
import { MaintenanceScheduleInstance } from '~/lib/interfaces/maintenance.interfaces';
import { GenericPopover } from '@repo/ui/components';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { SYSTEM_CONTEXT_DETAILS } from '~/lib/utils/constants';

const PopoverAction = (scheduleInstance: MaintenanceScheduleInstance) => {
  const { updateSearchParam } = useCustomSearchParams();

  return (
    <>
      <GenericPopover width="129px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text
            cursor="pointer"
            onClick={() => {
              updateSearchParam(
                SYSTEM_CONTEXT_DETAILS.MAINTENANCE_SCHEDULE_INSTANCE.slug,
                scheduleInstance?.scheduleInstanceId
              );
            }}
          >
            View
          </Text>
        </VStack>
      </GenericPopover>
    </>
  );
};

export default PopoverAction;
