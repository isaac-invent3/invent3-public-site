import { HStack } from '@chakra-ui/react';

import { Button, GenericSuccessModal } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';

interface TaskSuccessModalProps {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  onClose: (addAnotherTask: boolean) => void;
  type: 'create' | 'edit';
  format: 'modal' | 'page';
  text?:string
}
const TaskSuccessModal = (props: TaskSuccessModalProps) => {
  const { isOpen, onClose, type, format, text } = props;
  const successText =
    type === 'create'
      ? 'A new task has been created and added to the schedule successfully'
      : 'Task has been updated successfully';
  return (
    <GenericSuccessModal
      isOpen={isOpen}
      onClose={() => onClose(false)}
      headingText="Successful!"
      successText={text ?? successText}
      mainModalStyle={{ closeOnOverlayClick: false, closeOnEsc: false }}
    >
      <HStack spacing={{ base: '16px', md: '24px' }}>
        {type === 'create' && (
          <Button
            variant="secondary"
            customStyles={{ width: '96px', height: '30px' }}
            {...(format === 'modal'
              ? { handleClick: () => onClose(false) }
              : {})}
            {...(format === 'page' ? { href: `/${ROUTES.TASKS}` } : {})}
          >
            Back to Page
          </Button>
        )}
        <Button
          customStyles={{ width: { base: '150px', md: '193px' }, }}
          handleClick={() => onClose(type === 'create')}
        >
          {type === 'edit' ? 'Continue' : 'Add Another Task'}
        </Button>
      </HStack>
    </GenericSuccessModal>
  );
};

export default TaskSuccessModal;
