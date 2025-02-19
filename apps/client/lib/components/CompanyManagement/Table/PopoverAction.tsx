/* eslint-disable no-unused-vars */
import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { GenericPopover } from '@repo/ui/components';
import { Company } from '~/lib/interfaces/company.interfaces';
import { ROUTES } from '~/lib/utils/constants';

interface PopoverActionProps {
  company: Company;
}
const PopoverAction = ({ company }: PopoverActionProps) => {
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
          <Text
            cursor="pointer"
            as="a"
            href={`/${ROUTES.COMPANY}/${company.companyId}/edit`}
          >
            Edit
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
