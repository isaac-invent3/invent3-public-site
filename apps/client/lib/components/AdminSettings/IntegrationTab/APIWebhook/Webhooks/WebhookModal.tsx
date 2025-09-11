/* eslint-disable no-unused-vars */
import { HStack, ModalBody, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';

import {
  Button,
  FormInputWrapper,
  FormTextInput,
  GenericModal,
  ModalHeading,
} from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { webhookSchema } from '~/lib/schemas/settings.schema';
import { useCreateWebhookMutation } from '~/lib/redux/services/webhook.services';

interface WebhookModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const WebhookModal = (props: WebhookModalProps) => {
  const { isOpen, onClose } = props;
  const [createWebhook, { isLoading: isCreating }] = useCreateWebhookMutation(
    {}
  );
  const { handleSubmit } = useCustomMutation();

  const formik = useFormik({
    initialValues: {
      webhookUrlName: null!,
      event: null!,
      secret: null!,
      authKey: null!,
    },
    validationSchema: webhookSchema,
    onSubmit: async (values) => {
      const session = await getSession();
      const finalValue = {
        ...values,
        companyId: session?.user?.companyId!,
        createdBy: session?.user?.username!,
      };
      const response = await handleSubmit(
        createWebhook,
        finalValue,
        'Webhook Generated Successfully'
      );
      if (response?.data) {
        onClose();
      }
    },
  });

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{ width: { sm: '450px' } }}
    >
      <ModalBody p={0} m={0} width="full">
        <FormikProvider value={formik}>
          <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
            <VStack
              width="full"
              spacing="32px"
              p={{ base: '24px', md: '24px' }}
            >
              <ModalHeading
                heading="Webhook Configuration"
                subheading="Create a unique key to securely connect and authenticate your applications with our platform."
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Webhook URL Name"
                  isRequired
                  description="Webhook URL Name"
                >
                  <Field
                    as={FormTextInput}
                    name="webhookUrlName"
                    type="text"
                    label="Webhook URL Name"
                  />
                </FormInputWrapper>

                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Webhook URL"
                  isRequired
                  description="Webhook URL"
                >
                  <Field
                    as={FormTextInput}
                    name="event"
                    type="url"
                    label="Webhook URL"
                  />
                </FormInputWrapper>

                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Event Name"
                  isRequired
                  description="Event Name"
                >
                  <Field
                    as={FormTextInput}
                    name="event"
                    type="text"
                    label="Event Name"
                  />
                </FormInputWrapper>

                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Secret"
                  isRequired={false}
                  description="Secret"
                >
                  <Field
                    as={FormTextInput}
                    name="secret"
                    type="text"
                    label="Secret"
                  />
                </FormInputWrapper>
              </VStack>
              {/* Main Form Ends Here */}
              <HStack width="full" spacing="24px">
                <Button
                  variant="secondary"
                  customStyles={{ width: '96px' }}
                  handleClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={isCreating || formik.isSubmitting}
                >
                  Submit
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
    </GenericModal>
  );
};

export default WebhookModal;
