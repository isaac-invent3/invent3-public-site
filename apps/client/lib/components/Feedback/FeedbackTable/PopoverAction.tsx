/* eslint-disable no-unused-vars */
import { Text, VStack, useDisclosure } from '@chakra-ui/react';
import { GenericPopover } from '@repo/ui/components';
import { Feedback } from '~/lib/interfaces/feedback.interfaces';
import ViewFeedbackDrawer from '../Drawers/ViewFeedbackDrawer';

interface PopoverActionProps {
  feedback: Feedback;
}
const PopoverAction = (props: PopoverActionProps) => {
  const { feedback } = props;
  const {
    isOpen: isOpenView,
    onOpen: onOpenView,
    onClose: onCloseView,
  } = useDisclosure();

  return (
    <>
      <GenericPopover width="137px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text cursor="pointer" onClick={onOpenView}>
            View Details
          </Text>
        </VStack>
      </GenericPopover>

      <ViewFeedbackDrawer
        data={feedback}
        isOpen={isOpenView}
        onClose={onCloseView}
      />
    </>
  );
};

export default PopoverAction;
