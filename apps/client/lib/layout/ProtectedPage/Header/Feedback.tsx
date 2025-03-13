import { Text, useDisclosure } from '@chakra-ui/react';
import { MessagingIcon } from '~/lib/components/CustomIcons';
import FeedbackFormModal from '~/lib/components/Feedback/Modals/FeedbackFormModal';
import HeaderIcon from '../Header/HeaderIcon';

const Feedback = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <HeaderIcon
        icon={MessagingIcon}
        size="20px"
        w="115px"
        gap="8px"
        rounded="30px"
        handleClick={onOpen}
      >
        <Text fontSize="12px" color="neutral.600">
          Feedback
        </Text>
      </HeaderIcon>

      {isOpen && <FeedbackFormModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default Feedback;
