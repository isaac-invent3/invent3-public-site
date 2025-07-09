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
import { User } from '~/lib/interfaces/user.interfaces';
import { useInitiateResetPasswordMutation } from '~/lib/redux/services/user.services';

interface ResetUserPasswordProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const ResetUserPassword = (props: ResetUserPasswordProps) => {
  const { isOpen, onClose, user: userDetails } = props;
  const [initiatePasswordReset, { isLoading }] =
    useInitiateResetPasswordMutation({});
  const { handleSubmit } = useCustomMutation();

  const handleResetUserPassword = async () => {
    const session = await getSession();
    const response = await handleSubmit(
      initiatePasswordReset,
      {
        userId: userDetails?.userId!,
        firstName: userDetails?.firstName!,
        requestedBy: session?.user.username!,
      },
      `Password Reset Sent Successfully`
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
              Reset User Password?
            </Heading>
            <ChakraText
              size="md"
              color="neutral.700"
              maxW="296px"
              textAlign="center"
              fontWeight={400}
            >
              Are you sure you want to reset the password of this user?
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
              customStyles={{
                bgColor: '#F50000',
                width: '193px',
                _hover: { bgolor: '#F50000' },
                _active: { bgColor: '#F50000' },
              }}
              handleClick={handleResetUserPassword}
            >
              Reset Password
            </Button>
          </HStack>
        </VStack>
      </ModalBody>
    </GenericModal>
  );
};

export default ResetUserPassword;
