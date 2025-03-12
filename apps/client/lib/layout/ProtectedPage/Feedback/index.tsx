import { Text, useDisclosure } from '@chakra-ui/react';
import { MessagingIcon } from '~/lib/components/CustomIcons';
import HeaderIcon from '../Header/HeaderIcon';
import FeedbackForm from './FeedbackForm';

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

      {isOpen && <FeedbackForm isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default Feedback;
