/* eslint-disable no-unused-vars */
import { Text, VStack } from '@chakra-ui/react';
import { GenericPopover } from '@repo/ui/components';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { AuditLog } from '~/lib/interfaces/log.interfaces';
import { useAppDispatch } from '~/lib/redux/hooks';
import { setAuditLog } from '~/lib/redux/slices/AuditLogSlice';
import { SYSTEM_CONTEXT_DETAILS } from '~/lib/utils/constants';

interface PopoverActionProps {
  log: AuditLog;
}

const PopoverAction = ({ log }: PopoverActionProps) => {
  const dispatch = useAppDispatch();
  const { updateSearchParam } = useCustomSearchParams();
  return (
    <>
      <GenericPopover width="137px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text
            cursor="pointer"
            onClick={() => {
              dispatch(setAuditLog(log));
              updateSearchParam(
                SYSTEM_CONTEXT_DETAILS.AUDIT.slug,
                log.logMessageId
              );
            }}
          >
            View Details
          </Text>
        </VStack>
      </GenericPopover>
    </>
  );
};

export default PopoverAction;
