/* eslint-disable no-unused-vars */
import { ModalBody } from '@chakra-ui/react';

import { GenericModal } from '@repo/ui/components';

interface SubCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const SubCategoryModal = (props: SubCategoryModalProps) => {
  const { isOpen, onClose } = props;

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{ width: { sm: '450px' } }}
    >
      <ModalBody p={0} m={0} width="full">
        Hello
      </ModalBody>
    </GenericModal>
  );
};

export default SubCategoryModal;
