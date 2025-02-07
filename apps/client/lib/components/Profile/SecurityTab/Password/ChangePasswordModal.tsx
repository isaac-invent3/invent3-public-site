import {
  Flex,
  Heading,
  HStack,
  ModalBody,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';

import {
  Button,
  FormSectionInfo,
  FormTextInput,
  GenericModal,
  GenericSuccessModal,
} from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { useChangeUserPasswordMutation } from '~/lib/redux/services/user.services';
import { changePasswordSchema } from '~/lib/schemas/user.schema';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const ChangePasswordModal = (props: ChangePasswordModalProps) => {
  const { isOpen, onClose } = props;
  const { handleSubmit } = useCustomMutation();
  const {
    isOpen: isOpenSuccess,
    onOpen: onOpenSuccess,
    onClose: onCloseSuccess,
  } = useDisclosure();
  const [changePassword, { isLoading }] = useChangeUserPasswordMutation({});

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
    },
    validationSchema: changePasswordSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const session = await getSession();
      let response;
      const info = {
        ...values,
        userId: session?.user?.userId!,
        lastModifiedBy: session?.user.username!,
      };
      response = await handleSubmit(changePassword, info, '');
      if (response?.data) {
        onOpenSuccess();
      }
    },
  });

  const handleCloseSuccessModal = () => {
    onCloseSuccess();
    onClose();
  };

  return (
    <>
      <GenericModal
        isOpen={isOpen}
        onClose={onClose}
        contentStyle={{ width: { md: '526px' } }}
      >
        <ModalBody p={0} m={0} width="full">
          <FormikProvider value={formik}>
            <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
              <VStack
                width="full"
                px="32px"
                pt="56px"
                pb="34px"
                spacing="56px"
                alignItems="center"
              >
                <VStack width="full" spacing="8px" alignItems="center">
                  <Heading
                    fontWeight={800}
                    size={{ base: 'lg', lg: 'xl' }}
                    color="primary.500"
                  >
                    Change Password
                  </Heading>
                </VStack>

                {/* Main Form Starts Here */}
                <VStack width="full" spacing="24px">
                  <HStack width="full" alignItems="flex-start" spacing="31px">
                    <Flex width="full" maxW="132px">
                      <FormSectionInfo
                        title="Current Password"
                        info="Enter your current password"
                        isRequired
                      />
                    </Flex>
                    <Field
                      as={FormTextInput}
                      name="currentPassword"
                      type="password"
                      label="Current Password"
                    />
                  </HStack>
                  <HStack width="full" alignItems="flex-start" spacing="31px">
                    <Flex width="full" maxW="132px">
                      <FormSectionInfo
                        title="New Password"
                        info="Enter new password"
                        isRequired
                      />
                    </Flex>
                    <Field
                      as={FormTextInput}
                      name="newPassword"
                      type="password"
                      label="New Password"
                    />
                  </HStack>
                </VStack>
                {/* Main Form Ends Here */}
                <HStack width="full" spacing="24px" justifyContent="center">
                  <Button
                    variant="secondary"
                    customStyles={{ width: '96px' }}
                    handleClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    customStyles={{ width: '193px' }}
                    isLoading={isLoading || formik.isSubmitting}
                  >
                    Continue
                  </Button>
                </HStack>
              </VStack>
            </form>
          </FormikProvider>
        </ModalBody>
      </GenericModal>
      {isOpenSuccess && (
        <GenericSuccessModal
          isOpen={isOpen}
          onClose={handleCloseSuccessModal}
          successText="Password Changed Successfully!"
          mainModalStyle={{ closeOnOverlayClick: false, closeOnEsc: false }}
        >
          <Button
            handleClick={handleCloseSuccessModal}
            customStyles={{ mb: '54px' }}
          >
            Continue
          </Button>
        </GenericSuccessModal>
      )}
    </>
  );
};

export default ChangePasswordModal;
