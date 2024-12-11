import { HStack } from '@chakra-ui/react';
import React from 'react';
import { Button } from '@repo/ui/components';
import GenericSuccessModal from '~/lib/components/UI/Modal/GenericSuccessModal';

interface TaskSuccessModalProps {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  onClose: (addAnotherTask: boolean) => void;
  type: 'create' | 'edit';
  format: 'modal' | 'page';
}
const TaskSuccessModal = (props: TaskSuccessModalProps) => {
  const { isOpen, onClose, type, format } = props;
  const successText =
    type === 'create'
      ? 'A new task has been created and added to the schedule successfully'
      : 'Task has been updated successfully';
  return (
    <GenericSuccessModal
      isOpen={isOpen}
      onClose={() => onClose(false)}
      headingText="Successful!"
      successText={successText}
      mainModalStyle={{ closeOnOverlayClick: false, closeOnEsc: false }}
    >
      <HStack spacing="24px">
        {type === 'create' && (
          <Button
            variant="secondary"
            customStyles={{ width: '96px', height: '30px' }}
            {...(format === 'modal'
              ? { handleClick: () => onClose(false) }
              : {})}
            {...(format === 'page' ? { href: '/task-management' } : {})}
          >
            Back to Page
          </Button>
        )}
        <Button
          customStyles={{ width: '193px' }}
          handleClick={() => onClose(type === 'create')}
        >
          {type === 'edit' ? 'Continue' : 'Add Another Task'}
        </Button>
      </HStack>
    </GenericSuccessModal>
  );
};

export default TaskSuccessModal;
