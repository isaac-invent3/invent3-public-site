/* eslint-disable no-unused-vars */
import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { GenericPopover } from '@repo/ui/components';
import { Company } from '~/lib/interfaces/company.interfaces';
import { ROUTES, USER_STATUS_ENUM } from '~/lib/utils/constants';
import ToggleCompanyStatusModal from '../Modals/ToggleCompanyStatusModal';

interface PopoverActionProps {
  company: Company;
}
const PopoverAction = ({ company }: PopoverActionProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isActive = company?.subscriptionStatusId === USER_STATUS_ENUM.ACTIVE;
  return (
    <>
      <GenericPopover width="137px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text
            cursor="pointer"
            as="a"
            href={`/${ROUTES.COMPANY}/${company.companyId}/details`}
          >
            View Details
          </Text>
          <Text
            cursor="pointer"
            as="a"
            href={`/${ROUTES.COMPANY}/${company.companyId}/data-upload`}
          >
            Upload Data
          </Text>
          <Text
            cursor="pointer"
            as="a"
            href={`/${ROUTES.COMPANY}/${company.companyId}/edit`}
          >
            Edit
          </Text>
          <Text
            cursor="pointer"
            color={isActive ? 'red.500' : 'black'}
            onClick={() => onOpen()}
          >
            {isActive ? 'Deactivate' : 'Activate'}
          </Text>
        </VStack>
      </GenericPopover>
      <ToggleCompanyStatusModal
        isOpen={isOpen}
        onClose={onClose}
        company={company}
      />
    </>
  );
};

export default PopoverAction;
