import {
  Text as ChakraText,
  Heading,
  HStack,
  ModalBody,
  VStack,
} from '@chakra-ui/react';
import { Button, GenericModal } from '@repo/ui/components';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Company } from '~/lib/interfaces/company.interfaces';
import { useToggleCompanyStatusMutation } from '~/lib/redux/services/company.services';
import { USER_STATUS_ENUM } from '~/lib/utils/constants';

interface ToggleCompanyStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company;
}

const ToggleCompanyStatusModal = (props: ToggleCompanyStatusModalProps) => {
  const { isOpen, onClose, company: companyDetails } = props;
  const [toggleStatus, { isLoading }] = useToggleCompanyStatusMutation({});
  const { handleSubmit } = useCustomMutation();
  const isActive =
    companyDetails?.subscriptionStatusId === USER_STATUS_ENUM.ACTIVE;
  const loadingText = isActive ? 'Deactivating...' : 'Activating...';

  const handleToggleStatus = async () => {
    const session = await getSession();
    const response = await handleSubmit(
      toggleStatus,
      {
        companyId: companyDetails?.companyId!,
        lastModifiedBy: session?.user.username!,
      },
      `Company ${isActive ? 'Deactivated' : 'Activated'} Successfully`
    );
    if (response?.data) {
      onClose();
    }
  };

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{
        width: '526px',
      }}
    >
      <ModalBody p={0} m={0} width="full">
        <VStack
          width="full"
          alignItems="flex-start"
          spacing="40px"
          pt="65px"
          pb="50px"
          px={{ base: '16px', lg: '32px' }}
        >
          <VStack spacing="8px" width="full">
            <Heading
              size={{ base: 'lg', md: 'xl' }}
              fontWeight={800}
              color="primary.500"
            >
              {isActive ? 'Deactivate' : 'Activate'} Company?
            </Heading>
            <ChakraText
              size="md"
              color="neutral.700"
              maxW="296px"
              textAlign="center"
              fontWeight={400}
            >
              Are you sure you want to {isActive ? 'deactivate' : 'activate'}{' '}
              this company?
            </ChakraText>
          </VStack>
          <HStack width="full" spacing="24px" justifyContent="center">
            <Button
              handleClick={onClose}
              variant="secondary"
              customStyles={{ width: '145px' }}
            >
              Cancel
            </Button>
            <Button
              isLoading={isLoading}
              loadingText={loadingText}
              customStyles={{
                bgColor: isActive ? '#F50000' : '#0E2642',
                width: '193px',
                _hover: { bgolor: isActive ? '#F50000' : '#0E2642' },
                _active: { bgColor: isActive ? '#F50000' : '#0E2642' },
              }}
              handleClick={handleToggleStatus}
            >
              {isActive ? 'Deactivate Company' : 'Activate Company'}
            </Button>
          </HStack>
        </VStack>
      </ModalBody>
    </GenericModal>
  );
};

export default ToggleCompanyStatusModal;
