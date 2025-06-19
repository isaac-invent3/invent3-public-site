import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  BackButton,
  Button,
  DateTimeButtons,
  ErrorMessage,
  FormInputWrapper,
  FormTextAreaInput,
  FormTextInput,
  GenericDrawer,
} from '@repo/ui/components';
import { Field, FormikProvider, useFormik } from 'formik';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useMarkComplianceStatusMutation } from '~/lib/redux/services/asset/compliance.services';
import { markComplianceSchema } from '~/lib/schemas/asset/compliance.schema';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import ComplianceStatusType from './ComplianceStatusTypes';
import PolicyByCategorySelect from './PolicyByCategorySelect';
import { clearSelectedTableIds } from '~/lib/redux/slices/CommonSlice';

interface MarkComplianceStatusDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MarkComplianceStatusDrawer = (props: MarkComplianceStatusDrawerProps) => {
  const { isOpen, onClose } = props;
  const { handleSubmit } = useCustomMutation();

  const [markComplianceStatus, { isLoading }] =
    useMarkComplianceStatusMutation();
  const selectedAssets = useAppSelector(
    (state) => state.common.selectedTableIds
  );
  const dispatch = useAppDispatch();

  const initialValues = {
    policyId: null,
    performedBy: '',
    assetComplianceStatusId: null,
    comments: null,
    date: null,
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: false,
    validationSchema: markComplianceSchema,
    onSubmit: async (data, { setSubmitting }) => {
      console.log({ data });
      setSubmitting(true);
      const session = await getSession();
      const response = await handleSubmit(
        markComplianceStatus,
        {
          assetComplianceStatusId: data?.assetComplianceStatusId!,
          policyId: data?.policyId!,
          comments: data?.comments!,
          performedBy: data?.performedBy!,
          dateCreated: moment(data.date, 'DD/MM/YYYY')
            .utcOffset(0, true)
            .toISOString(),
          assetId: selectedAssets,
          createdBy: session?.user?.email!,
        },
        'Compliance Status Marked Successfully'
      );

      if (response?.data) {
        formik.resetForm();
        dispatch(clearSelectedTableIds());
        onClose();
      }
      setSubmitting(false);
    },
  });

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
                  <PolicyByCategorySelect />
                  <ComplianceStatusType />
                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    customSpacing="24px"
                    description="Specify the Date the inspection was carried out"
                    title="Date Created Out"
                    isRequired
                  >
                    <VStack alignItems="flex-start">
                      <DateTimeButtons
                        buttonVariant="secondary"
                        includeTime={false}
                        showPredefinedDates={false}
                        selectedDate={formik.values.date ?? undefined}
                        handleDateTimeSelect={(dateTime) => {
                          formik.setFieldValue(
                            'date',
                            dateTime?.trim() ?? null
                          );
                        }}
                        customButtonLabel="Date"
                      />
                      {formik.submitCount > 0 && formik.errors.date && (
                        <ErrorMessage>{formik.errors.date}</ErrorMessage>
                      )}
                    </VStack>
                  </FormInputWrapper>
                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    customSpacing="24px"
                    description="Provide details about who perfomed this Action"
                    title="Performed By"
                    isRequired
                  >
                    <Field
                      as={FormTextInput}
                      name="performedBy"
                      type="text"
                      label="Performed By"
                      placeholder="Performed By"
                    />
                  </FormInputWrapper>
                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    customSpacing="24px"
                    description="Provide Comments about the Action Taken"
                    title="Comments"
                    isRequired={false}
                  >
                    <Field
                      as={FormTextAreaInput}
                      name="comments"
                      type="text"
                      label="Description"
                      placeholder="Description"
                      customStyle={{ height: '133px' }}
                    />
                  </FormInputWrapper>
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
                isLoading={isLoading || formik.isSubmitting}
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
    </>
  );
};

export default MarkComplianceStatusDrawer;
