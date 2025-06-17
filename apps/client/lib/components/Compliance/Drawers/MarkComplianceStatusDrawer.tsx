import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Flex,
  Heading,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {
  BackButton,
  Button,
  FormInputWrapper,
  FormTextAreaInput,
  GenericDrawer,
  GenericSuccessModal,
  TextInput,
} from '@repo/ui/components';
import { Field, FormikProvider, useFormik } from 'formik';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useCreateAssetComplianceMutation } from '~/lib/redux/services/asset/compliance.services';
import { createComplianceSchema } from '~/lib/schemas/asset/compliance.schema';
import CategorySelect from '~/lib/components/AssetManagement/AssetForm/GeneralStep/AssetCategory/CategorySelect';
import { Document } from '~/lib/interfaces/general.interfaces';
import moment from 'moment';
import ComplianceType from './CreateComplianceDrawer/ComplianceType';
import Compliance from '..';

interface MarkComplianceStatusDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MarkComplianceStatusDrawer = (props: MarkComplianceStatusDrawerProps) => {
  const { isOpen, onClose } = props;
  const {
    isOpen: isOpenSuccess,
    onOpen: onOpenSuccess,
    onClose: onCloseSuccess,
  } = useDisclosure();

  const { handleSubmit } = useCustomMutation();

  const [createAssetCompliance, { isLoading: isCreatingCompliance }] =
    useCreateAssetComplianceMutation();

  const initialValues = {
    assetCategoryId: null,
    regulationId: null,
    complianceRegulationId: null,
    nextInspectionDate: null,
    frequencyId: null,
    documents: [],
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: false,
    validationSchema: createComplianceSchema,
    onSubmit: async (data, { setSubmitting }) => {
      console.log({ data });
      setSubmitting(true);
      const session = await getSession();
      const response = await handleSubmit(
        createAssetCompliance,
        {
          createAssetComplianceDto: {
            assetCategoryId: data?.assetCategoryId!,
            regulationId: data?.regulationId!,
            complianceRegulationId: data?.complianceRegulationId!,
            nextInspectionDate: data.nextInspectionDate
              ? moment(data.nextInspectionDate, 'DD/MM/YYYY')
                  .utcOffset(0, true)
                  .toISOString()
              : null,
            createdBy: session?.user?.email!,
          },
          createComplianceDocumentDtos:
            data?.documents.length > 0
              ? data?.documents.map((item: Document) => ({
                  documentName: item.documentName!,
                  document: item.base64Document!,
                  base64Prefix: item.base64Prefix!,
                  createdBy: session?.user?.email!,
                }))
              : null,
        },
        ''
      );

      if (response?.data) {
        formik.resetForm();
        onOpenSuccess();
      }
      setSubmitting(false);
    },
  });

  const handleRemoveDocument = (document: Document) => {
    if (formik.values.documents) {
      const updatedDocuments: Document[] = formik.values?.documents.filter(
        (old: Document) => old !== document
      );
      formik.setFieldValue('documents', updatedDocuments);
    }
  };

  return (
    <>
      <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="627px">
        <DrawerHeader p={0} m={0}>
          <HStack
            pt="16px"
            pb="40px"
            px="24px"
            width="full"
            justifyContent="space-between"
          >
            <BackButton handleClick={onClose} />
          </HStack>
        </DrawerHeader>
        <FormikProvider value={formik}>
          <DrawerBody p={0}>
            <Flex direction="column" width="full" alignItems="flex-start">
              <VStack alignItems="flex-start" spacing="8px" px="24px">
                <Heading
                  size={{ base: 'lg', lg: 'xl' }}
                  color="primary.500"
                  fontWeight={800}
                >
                  Mark Compliance Status
                </Heading>
                <Text color="neutral.700" fontWeight={400} size="md">
                  Track and document all compliance-related activities to ensure
                  accountability, transparency, and regulatory readiness.
                </Text>
              </VStack>

              <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
                <VStack
                  width="full"
                  spacing={{ base: '38px', lg: '40px' }}
                  px="24px"
                  mt="43px"
                  mb="24px"
                >
                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    customSpacing="24px"
                    description="Select Asset Category"
                    title="Asset Category"
                    isRequired
                  >
                    <CategorySelect name="assetCategoryId" />
                  </FormInputWrapper>
                  <ComplianceType />
                  {/* <Compliance /> */}
                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    customSpacing="24px"
                    description="Provide Comments about the Action Taken"
                    title="Comments"
                    isRequired={false}
                  >
                    <Field
                      as={FormTextAreaInput}
                      name="issueDescription"
                      type="text"
                      label="Description"
                      placeholder="Description"
                      customStyle={{ height: '133px' }}
                    />
                  </FormInputWrapper>
                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    customSpacing="24px"
                    description="Provide details about who perfomed this Action"
                    title="Performed By"
                    isRequired
                  >
                    <Field
                      as={TextInput}
                      name="issueDescription"
                      type="text"
                      label="Description"
                      placeholder="Performed By"
                    />
                  </FormInputWrapper>
                </VStack>
              </form>
            </Flex>
          </DrawerBody>

          <DrawerFooter p={0} m={0}>
            <HStack
              width="full"
              spacing="8px"
              justifyContent={{ base: 'center', lg: 'flex-end' }}
              mt="8px"
              px="24px"
              pb="32px"
            >
              <Button
                customStyles={{ width: '138px', height: '50px' }}
                variant="secondary"
                handleClick={onClose}
              >
                Cancel
              </Button>

              <Button
                isLoading={isCreatingCompliance || formik.isSubmitting}
                handleClick={() => {
                  formik.handleSubmit();
                }}
                customStyles={{
                  width: { base: '161px', lg: '237px' },
                  height: '50px',
                }}
              >
                Save
              </Button>
            </HStack>
          </DrawerFooter>
        </FormikProvider>
      </GenericDrawer>

      <GenericSuccessModal
        isOpen={isOpenSuccess}
        onClose={() => {
          onCloseSuccess();
          onClose();
        }}
        successText="Compliance Added Successfully"
        mainModalStyle={{ closeOnOverlayClick: false, closeOnEsc: false }}
      >
        <Button
          customStyles={{ width: '193px' }}
          handleClick={() => {
            onCloseSuccess();
            onClose();
          }}
        >
          Continue
        </Button>
      </GenericSuccessModal>
    </>
  );
};

export default MarkComplianceStatusDrawer;
