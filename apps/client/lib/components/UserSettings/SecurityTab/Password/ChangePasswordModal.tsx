import { useAppFormik } from '~/lib/hooks/useAppFormik';
import {
  Heading,
  HStack,
  ModalBody,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Field, FormikProvider } from 'formik';

import {
  Button,
  FormInputWrapper,
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

  const formik = useAppFormik({
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
                px={{ base: '16px', md: '32px' }}
                pt={{ base: '24px', md: '56px' }}
                pb={{ base: '24px', md: '34px' }}
                spacing={{ base: '32px', md: '56px' }}
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
                  <FormInputWrapper
                    sectionMaxWidth="132px"
                    customSpacing="31px"
                    description="Enter your current password"
                    title="Current Password"
                    isRequired
                    formSectionCustomStyle={{
                      maxW: { base: 'full', lg: '132px' },
                    }}
                  >
                    <Field
                      as={FormTextInput}
                      name="currentPassword"
                      type="password"
                      label="Current Password"
                    />
                  </FormInputWrapper>
                  <FormInputWrapper
                    sectionMaxWidth="132px"
                    customSpacing="31px"
                    description="Enter new password"
                    title="New Password"
                    isRequired
                  >
                    <Field
                      as={FormTextInput}
                      name="newPassword"
                      type="password"
                      label="New Password"
                    />
                  </FormInputWrapper>
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
