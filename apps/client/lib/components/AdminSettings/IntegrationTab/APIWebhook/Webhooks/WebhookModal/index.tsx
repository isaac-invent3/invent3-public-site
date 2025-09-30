/* eslint-disable no-unused-vars */
import {
  Flex,
  HStack,
  ModalBody,
  ModalFooter,
  ModalHeader,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';

import {
  Button,
  ErrorMessage,
  FormInputWrapper,
  FormSelect,
  FormTextInput,
  GenericModal,
  ModalHeading as Heading,
} from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { webhookSchema } from '~/lib/schemas/settings.schema';
import {
  useCreateWebhookMutation,
  useGetAllAuthenticationMethodQuery,
  useUpdateWebhookMutation,
} from '~/lib/redux/services/webhook.services';
import EventType from './EventType';
import { useAppSelector } from '~/lib/redux/hooks';
import { useState } from 'react';
import { DEFAULT_PAGE_SIZE, FORM_ENUM } from '~/lib/utils/constants';
import { CompanyWebhookURL } from '~/lib/interfaces/webhook.interfaces';
import _ from 'lodash';
import { generateOptions } from '~/lib/utils/helperFunctions';

interface WebhookModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'create' | 'edit';
  data?: CompanyWebhookURL;
}
const WebhookModal = (props: WebhookModalProps) => {
  const { isOpen, onClose, type, data } = props;
  const { data: allAuthMethods, isLoading: isLoadingMethods } =
    useGetAllAuthenticationMethodQuery({
      pageNumber: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    });
  const [createWebhook, { isLoading: isCreating }] = useCreateWebhookMutation(
    {}
  );
  const [updateWebhook, { isLoading: isUpdating }] = useUpdateWebhookMutation(
    {}
  );
  const { initialRoleModules, formRoleModules } = useAppSelector(
    (state) => state.role
  );
  const [permissionError, setPermissionError] = useState('');
  const { handleSubmit } = useCustomMutation();

  const formik = useFormik({
    initialValues: {
      webhookUrlName: data?.webhookUrlName || null,
      url: data?.url || null,
      authMethodId: null!,
    },
    validationSchema: webhookSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setPermissionError('');
      if (formRoleModules.length < 1) {
        setPermissionError('Please select at least one event type');
        return;
      }
      setSubmitting(true);
      const session = await getSession();
      const username = session?.user?.username;
      const selectedPermissions = formRoleModules.map((item) => ({
        webhookSystemModuleContextPermissionId:
          item.roleSystemModuleContextPermissionId,
        webhookId: data?.companyWebhookUrlId ?? null,
        systemModuleContextTypeId: item.systemModuleContextTypeId!,
        systemSubModuleContextTypeId: item.systemSubModuleContextTypeId!,
        actionType: FORM_ENUM.add,
        changeInitiatedBy: username!,
      }));
      let response;
      if (type === 'edit') {
        // Find deleted permissions
        const deletedPermissions = _.differenceWith(
          initialRoleModules,
          formRoleModules,
          (a, b) =>
            a.systemModuleContextTypeId === b.systemModuleContextTypeId &&
            a.systemSubModuleContextTypeId === b.systemSubModuleContextTypeId
        );

        // Find newly added permissions
        const newPermissions = _.differenceWith(
          formRoleModules,
          initialRoleModules,
          (a, b) =>
            a.systemModuleContextTypeId === b.systemModuleContextTypeId &&
            a.systemSubModuleContextTypeId === b.systemSubModuleContextTypeId
        );
        const newPermissionDtoArray = newPermissions.map((item) => ({
          webhookSystemModuleContextPermissionId:
            item.roleSystemModuleContextPermissionId,
          webhookId: data?.companyWebhookUrlId ?? null,
          systemModuleContextTypeId: item.systemModuleContextTypeId!,
          systemSubModuleContextTypeId: item.systemSubModuleContextTypeId!,
          actionType: FORM_ENUM.add,
          changeInitiatedBy: username!,
        }));

        const deletedPermissionDtoArray = deletedPermissions.map((item) => ({
          webhookSystemModuleContextPermissionId:
            item.roleSystemModuleContextPermissionId,
          webhookId: data?.companyWebhookUrlId,
          systemModuleContextTypeId: item.systemModuleContextTypeId!,
          systemSubModuleContextTypeId: item.systemSubModuleContextTypeId!,
          actionType: FORM_ENUM.delete,
          changeInitiatedBy: username!,
        }));

        const allPermissionDto = [
          ...deletedPermissionDtoArray,
          ...newPermissionDtoArray,
        ];
        response = await handleSubmit(
          updateWebhook,
          {
            updateWebhookDto: {
              webhookUrlName: values.webhookUrlName!,
              companyWebhookUrlId: data?.companyWebhookUrlId!,
              url: values.url!,
              authMethodId: values.authMethodId!,
              lastModifiedBy: username!,
            },
            updateWebhookSystemModuleContextPermissionDtos: allPermissionDto,
          },
          'Webhook Updated successfully',
          onClose
        );
      }
      if (type === 'create') {
        response = await handleSubmit(
          createWebhook,
          {
            createWebhookDto: {
              webhookUrlName: values.webhookUrlName!,
              url: values.url!,
              authMethodId: values.authMethodId!,
              createdBy: username!,
            },
            createWebhookSystemModuleContextPermissionDtos: selectedPermissions,
          },
          'Webhook created successfully',
          onClose
        );
      }
      setSubmitting(false);
    },
  });

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{ width: { sm: '450px', lg: '896px' } }}
    >
      <ModalHeader pt="32px" px="24px" pb="8px">
        <Heading
          heading="Webhook Configuration"
          subheading="Create a unique key to securely connect and authenticate your applications with our platform."
        />
      </ModalHeader>
      <ModalBody p={0} m={0} width="full">
        <FormikProvider value={formik}>
          <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
            <VStack
              width="full"
              spacing="32px"
              p={{ base: '24px', md: '24px' }}
              alignItems="flex-end"
            >
              {/* Main Form Starts Here */}
              <VStack width="full" spacing="24px">
                <VStack width="full" spacing="16px">
                  <SimpleGrid
                    width="full"
                    columns={{ base: 1, md: 2 }}
                    gap="16px"
                  >
                    <FormInputWrapper
                      sectionMaxWidth="141px"
                      customSpacing="8px"
                      title="Webhook Name"
                      isRequired
                      description="Webhook Name"
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
                      customSpacing="8px"
                      title="Webhook URL"
                      isRequired
                      description="Webhook URL"
                    >
                      <Field
                        as={FormTextInput}
                        name="url"
                        type="url"
                        label="Webhook URL"
                      />
                    </FormInputWrapper>
                  </SimpleGrid>
                  <SimpleGrid
                    width="full"
                    columns={{ base: 1, md: 2 }}
                    gap="16px"
                  >
                    <FormInputWrapper
                      sectionMaxWidth="141px"
                      customSpacing="8px"
                      title="Authentication Method"
                      isRequired
                      description="Authentication Method"
                    >
                      <FormSelect
                        name="authMethodId"
                        title="Authentication Method"
                        options={generateOptions(
                          allAuthMethods?.data?.items || [],
                          'authMethodName',
                          'authMethodId'
                        )}
                        isLoading={isLoadingMethods}
                        selectStyles={{ height: '46px', pt: '0px' }}
                        // showTitleAfterSelect={false}
                      />
                    </FormInputWrapper>
                  </SimpleGrid>
                </VStack>
                <VStack width="full" spacing="16px" alignItems="flex-start">
                  <EventType companyWebhookUrl={data?.companyWebhookUrlId} />
                  {permissionError && (
                    <Flex width="full" mt="4px">
                      <ErrorMessage>{permissionError}</ErrorMessage>
                    </Flex>
                  )}
                </VStack>
              </VStack>
              {/* Main Form Ends Here */}
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
      <ModalFooter>
        <HStack spacing="24px">
          <Button
            variant="secondary"
            customStyles={{ width: '96px' }}
            handleClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            handleClick={() => formik.handleSubmit()}
            isLoading={isCreating || formik.isSubmitting || isUpdating}
            customStyles={{ width: '193px' }}
          >
            Submit
          </Button>
        </HStack>
      </ModalFooter>
    </GenericModal>
  );
};

export default WebhookModal;
