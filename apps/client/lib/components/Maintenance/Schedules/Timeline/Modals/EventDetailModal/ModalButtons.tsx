import { HStack } from '@chakra-ui/react';

import { Button } from '@repo/ui/components';

interface ModalButtonsProps {
  planId: number | null;
  scheduleInstanceId: number;
}
const ModalButtons = (props: ModalButtonsProps) => {
  const { scheduleInstanceId, planId } = props;
  return (
    <HStack width="full" justifyContent="flex-end">
      <HStack width="min-content" spacing="8px">
        <Button
          customStyles={{ height: '50px', width: '165px', px: '16px' }}
          variant="secondary"
          href={`/maintenance/plans/${planId}/edit`}
        >
          Edit Maintenance Plan
        </Button>
        <Button
          customStyles={{ height: '50px', px: '12px', width: '173px' }}
          variant="outline"
          href={`/maintenance/schedules/instances/${scheduleInstanceId}/edit`}
        >
          Edit Schedule Instance
        </Button>
        <Button
          customStyles={{
            height: '50px',
            width: '161px',
            px: '8px',
          }}
          variant="primary"
        >
          Mark as Completed
        </Button>
      </HStack>
    </HStack>
  );
};

export default ModalButtons;
