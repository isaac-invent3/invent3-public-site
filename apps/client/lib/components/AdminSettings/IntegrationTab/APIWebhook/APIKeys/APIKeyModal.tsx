import { useAppFormik } from '~/lib/hooks/useAppFormik';
/* eslint-disable no-unused-vars */
import { HStack, ModalBody, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useField } from 'formik';

import {
  Button,
  FormInputWrapper,
  FormTextInput,
  GenericModal,
  ModalHeading,
} from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import {
  useGetAllDesignationTypesQuery,
  useSearchDesignationTypeMutation,
} from '~/lib/redux/services/designation.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { useState } from 'react';
import { apiKeySchema } from '~/lib/schemas/settings.schema';
import { useCreateAPIKeyMutation } from '~/lib/redux/services/apiKey.services';

interface APIKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const APIKeyModal = (props: APIKeyModalProps) => {
  const { isOpen, onClose } = props;
  const [createAPIKey, { isLoading: isCreating }] = useCreateAPIKeyMutation({});
  const { handleSubmit } = useCustomMutation();

  const formik = useAppFormik({
    initialValues: {
      companyApiKeyName: null!,
      usageLimit: null!,
    },
    validationSchema: apiKeySchema,
    onSubmit: async (values) => {
      const session = await getSession();
      const finalValue = {
        ...values,
        companyId: session?.user?.companyId!,
        createdBy: session?.user?.username!,
      };
      const response = await handleSubmit(
        createAPIKey,
        finalValue,
        'API Key Generated Successfully'
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
                heading="Generate Key"
                subheading="Create a unique key to securely connect and authenticate your applications with our platform."
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="API Key Name"
                  isRequired
                  description="API Key Name"
                >
                  <Field
                    as={FormTextInput}
                    name="companyApiKeyName"
                    type="text"
                    label="API Key Name"
                  />
                </FormInputWrapper>

                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Usage Limit"
                  isRequired
                  description="Usage Limit"
                >
                  <Field
                    as={FormTextInput}
                    name="usageLimit"
                    type="number"
                    label="Usage Limit"
                  />
                </FormInputWrapper>
                {/* <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Status"
                  isRequired
                  description="Select Status"
                >
                  <GenericAsyncSelect
                    selectName="statusId"
                    selectTitle="Status"
                    data={data}
                    labelKey="designationTypeName"
                    valueKey="designationTypeId"
                    mutationFn={searchDesignationType}
                    isLoading={isLoading || isFetching}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                  />
                </FormInputWrapper> */}
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
                  Generate Key
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
    </GenericModal>
  );
};

export default APIKeyModal;
