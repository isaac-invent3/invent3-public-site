import { HStack } from '@chakra-ui/react';
import React from 'react';
import Button from '~/lib/components/UI/Button';
import GenericSuccessModal from '~/lib/components/UI/Modal/GenericSuccessModal';

interface TaskSuccessModalProps {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  onClose: (addAnotherTask: boolean) => void;
  type: 'create' | 'edit';
}
const TaskSuccessModal = (props: TaskSuccessModalProps) => {
  const { isOpen, onClose, type } = props;
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
      customStyle={{ closeOnOverlayClick: false }}
    >
      <HStack spacing="24px">
        {type === 'create' && (
          <Button
            variant="secondary"
            customStyles={{ width: '96px', height: '30px' }}
            handleClick={() => onClose(false)}
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
