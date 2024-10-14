import { HStack } from '@chakra-ui/react';
import React from 'react';
import Button from '~/lib/components/UI/Button';

interface ModalButtonsProps {
  id: string;
}
const ModalButtons = (props: ModalButtonsProps) => {
  const { id } = props;
  return (
    <HStack width="full" justifyContent="flex-end">
      <HStack width="min-content" spacing="8px">
        <Button
          customStyles={{ height: '50px', width: '137px', px: '16px' }}
          variant="secondary"
          href={`/maintenance/${id}/edit`}
        >
          Edit Schedule
        </Button>
        <Button
          customStyles={{ height: '50px', px: '12px', width: '137px' }}
          variant="outline"
        >
          Reschedule
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
