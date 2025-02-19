/* eslint-disable no-unused-vars */
import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { GenericPopover } from '@repo/ui/components';
import { Company } from '~/lib/interfaces/company.interfaces';

interface PopoverActionProps {
  company: Company;
}
const PopoverAction = (props: PopoverActionProps) => {
  const {
    isOpen: isOpenView,
    onOpen: onOpenView,
    onClose: onCloseView,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDeactivate,
    onClose: onCloseDelete,
  } = useDisclosure();
  return (
    <>
      <GenericPopover width="137px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text cursor="pointer" onClick={onOpenView}>
            View Details
          </Text>
          <Text cursor="pointer" onClick={onOpenDeactivate}>
            Deactivate
          </Text>
        </VStack>
      </GenericPopover>
    </>
  );
};

export default PopoverAction;
