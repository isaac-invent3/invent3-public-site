import { useAppFormik } from '~/lib/hooks/useAppFormik';
import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Flex,
  Heading,
  HStack,
  Switch,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {
  BackButton,
  Button,
  FormAddButton,
  FormInputWrapper,
  FormTextAreaInput,
  GenericDrawer,
  GenericSuccessModal,
} from '@repo/ui/components';
import { Field, FormikProvider } from 'formik';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useCreateAssetComplianceMutation } from '~/lib/redux/services/asset/compliance.services';
import { createComplianceSchema } from '~/lib/schemas/asset/compliance.schema';
import { Document } from '~/lib/interfaces/general.interfaces';
import moment from 'moment';
import StageSelect from './StageSelect';
import ConditionBuilder from './ConditionBuilder';

interface StageTransitionRuleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const StageTransitionRuleDrawer = (props: StageTransitionRuleDrawerProps) => {
  const { isOpen, onClose } = props;
  const {
    isOpen: isOpenSuccess,
    onOpen: onOpenSuccess,
    onClose: onCloseSuccess,
  } = useDisclosure();
  const {
    isOpen: isOpenConditionBuilder,
    onOpen: onOpenConditionBuilder,
    onClose: onCloseConditionBuilder,
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

  const formik = useAppFormik({
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
            frequencyId: data?.frequencyId!,
            complianceRegulationId: data?.complianceRegulationId!,
            nextInspectionDate: data.nextInspectionDate
              ? moment(data.nextInspectionDate, 'DD/MM/YYYY')
                  .utc()
                  .toISOString()
              : null,
            createdBy: session?.user?.email!,
          },
          createComplianceDocumentDtos:
            data?.documents.length > 0
              ? data?.documents.map((item: Document) => ({
                  documentName: item.documentName!,
                  base64Document: item.base64Document!,
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

  return (
    <>
      <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="525px">
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
                  Add New Stage Transition Rule
                </Heading>
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
                    description="Select the stage you want to define transitions for."
                    title="Destination Stage"
                    isRequired
                  >
                    <StageSelect />
                  </FormInputWrapper>
                  <VStack width="full" spacing={4} alignItems="flex-start">
                    <Heading size="md" color="primary.500">
                      Allowed Transitions
                    </Heading>
                    <FormInputWrapper
                      sectionMaxWidth="141px"
                      customSpacing="24px"
                      description="Stage Transition Condition"
                      title="Conditions"
                      isRequired
                    >
                      <VStack width="full" spacing={4} alignItems="flex-start">
                        <HStack width="full" justifyContent="space-between">
                          <Text>Text</Text>
                          <Text cursor="pointer">Edit</Text>
                        </HStack>
                        <FormAddButton handleClick={onOpenConditionBuilder}>
                          Add Condition
                        </FormAddButton>
                      </VStack>
                    </FormInputWrapper>
                    <FormInputWrapper
                      sectionMaxWidth="141px"
                      customSpacing="24px"
                      description="Provide details about the task objective"
                      title="Description"
                      isRequired
                    >
                      <Field
                        as={FormTextAreaInput}
                        name="description"
                        type="text"
                        label="Description"
                        placeholder="Description"
                        customStyle={{ height: '95px' }}
                      />
                    </FormInputWrapper>
                    <FormInputWrapper
                      sectionMaxWidth="141px"
                      customSpacing="24px"
                      description="Status of the transition rule"
                      title="Status"
                      isRequired
                    >
                      <HStack spacing={5}>
                        <Text size="md" lineHeight="140%">
                          Active
                        </Text>
                        <Switch size="sm" />
                      </HStack>
                    </FormInputWrapper>
                  </VStack>
                  <VStack
                    width="full"
                    spacing={1}
                    alignItems="flex-start"
                    p={4}
                    bgColor="neutral.200"
                    rounded="8px"
                  >
                    <Text fontWeight={700} size="md">
                      Preview
                    </Text>
                    <Text color="neutral.600" size="md" maxW="80%" minH="100px">
                      IF Current Stage = Acquisition AND Conditions = Asset Age
                      &gt; 3 years THEN Allowed Transitions → In Use,
                      Maintenance. Status: Active.
                    </Text>
                  </VStack>
                </VStack>
              </form>
            </Flex>
          </DrawerBody>

          <DrawerFooter p={0} m={0}>
            <HStack
              width="full"
              spacing="16px"
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
                  width: { base: '157px' },
                  height: '50px',
                }}
              >
                Save Rule
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
        successText="You have added a new Stage transition rule successfully"
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
      <ConditionBuilder
        isOpen={isOpenConditionBuilder}
        onClose={onCloseConditionBuilder}
      />
    </>
  );
};

export default StageTransitionRuleDrawer;
