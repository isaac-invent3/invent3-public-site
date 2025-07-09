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
import { useCreateFloorMutation } from '~/lib/redux/services/location/floor.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { floorSchema } from '~/lib/schemas/asset/location.schema';
import BuildingSelect from './SelectInputs/BuildingSelect';
// import DocumentUploadAndView from '~/lib/components/Common/DocumentUploadAndView';

interface FloorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultBuildingId: number | null;
  children?: React.ReactNode;
  handleSave?: (data: {
    createdBy: string;
    buildingId: number;
    floorName: string;
    floorRef: string;
  }) => void;
  showDropdown?: boolean;
  showToast?: boolean;
}
const FloorModal = (props: FloorModalProps) => {
  const {
    isOpen,
    onClose,
    defaultBuildingId,
    children,
    handleSave,
    showDropdown = true,
    showToast,
  } = props;
  const [createFloor, { isLoading }] = useCreateFloorMutation({});
  const { handleSubmit } = useCustomMutation();

  const formik = useFormik({
    initialValues: {
      buildingId: (defaultBuildingId ?? undefined)!,
      floorName: '',
      floorRef: '',
      // imageBasePrefix: null,
      // floorPlanImage: null,
      // planName: null,
    },
    validationSchema: floorSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();
      // const { planName, ...finalData } = values;
      const finalValue = { ...values, createdBy: session?.user?.username! };
      if (handleSave) {
        handleSave(finalValue);
        resetForm();
      } else {
        const response = await handleSubmit(
          createFloor,
          finalValue,
          showToast ? 'Floor Created Successfully' : ''
        );
        if (response?.data) {
          onClose();
          resetForm();
        }
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
              py={{ base: '24px', md: '40px' }}
              px="20px"
            >
              <ModalHeading
                heading="Add New Floor"
                subheading="Add a new floor that is not on the system yet"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                {children ??
                  (showDropdown && (
                    <FormInputWrapper
                      sectionMaxWidth="141px"
                      customSpacing="16px"
                      title="Building"
                      description="Select Building"
                      isRequired
                    >
                      <BuildingSelect type="general" />
                    </FormInputWrapper>
                  ))}

                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Floor Name"
                  description="Input Floor name"
                  isRequired
                >
                  <Field
                    as={FormTextInput}
                    name="floorName"
                    type="text"
                    label="Floor Name"
                  />
                </FormInputWrapper>
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Floor Reference"
                  description="Input Floor Reference"
                >
                  <Field
                    as={FormTextInput}
                    name="floorRef"
                    type="text"
                    label="Floor Reference"
                  />
                </FormInputWrapper>
                {/* <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Floor Plan"
                  description="Upload Floor Plan"
                  isRequired={false}
                  flexShrink={0}
                >
                  <HStack width="max-content">
                    <DocumentUploadAndView
                      variant="secondary"
                      handleRemoveDocuments={(documents) => {
                        {
                          formik.setFieldValue('floorPlanImage', null);
                          formik.setFieldValue('imageBasePrefix', null);
                          formik.setFieldValue('planName', null);
                        }
                      }}
                      handleAddDocuments={(documents) => {
                        if (documents?.[0]) {
                          formik.setFieldValue(
                            'floorPlanImage',
                            documents[0].base64Document
                          );
                          formik.setFieldValue(
                            'imageBasePrefix',
                            documents[0].base64Prefix
                          );
                          formik.setFieldValue(
                            'planName',
                            documents[0].documentName
                          );
                        }
                      }}
                      documents={
                        formik.values.floorPlanImage
                          ? [
                              {
                                base64Document: formik.values.floorPlanImage,
                                base64Prefix: formik.values.imageBasePrefix,
                                documentId: null,
                                documentName: formik.values.planName,
                              },
                            ]
                          : []
                      }
                      // setError={(error) => helpers.setError(error)}
                      // error={meta.error}
                      // handleOpenExistingDocumentModal={onOpen}
                    />
                  </HStack>
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
                  isLoading={isLoading || formik.isSubmitting}
                >
                  Add Floor
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
    </GenericModal>
  );
};

export default FloorModal;
