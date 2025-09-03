import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Stack,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {
  Button,
  FormInputWrapper,
  FormTextInput,
  LeaveDialogModal,
} from '@repo/ui/components';
import { Field, FormikProvider, useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  clearSingleAdminForm,
  updateCompanyForm,
} from '~/lib/redux/slices/CompanySlice';
import { contactInfoSchema } from '~/lib/schemas/company/main.schema';

interface AdminFormProps {
  setShowAdminForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const AdminForm = (props: AdminFormProps) => {
  const { setShowAdminForm } = props;
  const { adminForm: formDetails, companyForm: companyDetails } =
    useAppSelector((state) => state.company);
  const dispatch = useAppDispatch();
  const {
    isOpen: isOpenDialog,
    onOpen: onOpenDialog,
    onClose: onCloseDialog,
  } = useDisclosure();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      localId: formDetails.localId ?? null,
      contactId: formDetails.contactId ?? null,
      contactFirstName: formDetails?.contactFirstName,
      contactLastName: formDetails?.contactLastName,
      contactEmail: formDetails?.contactEmail,
      contactPhoneNumber: formDetails?.contactPhoneNumber,
    },
    validationSchema: contactInfoSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const newAdminInfo = {
        ...values,
      };

      // Check for duplicates (ignore current record if updating)
      const duplicate = companyDetails.admins.find(
        (admin) =>
          admin.localId !== values.localId && // ignore self if updating
          (admin.contactEmail === values.contactEmail ||
            admin.contactPhoneNumber === values.contactPhoneNumber)
      );

      if (duplicate) {
        toast({
          title: 'Duplicate entry',
          description:
            'An admin with the same email or phone number already exists.',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top-right',
        });
        return;
      }

      if (values.localId) {
        //Update an existing admin
        const newCompanyAdmin = companyDetails.admins.filter(
          (item) => item.localId !== values.localId
        );
        dispatch(
          updateCompanyForm({
            admins: [...newCompanyAdmin, newAdminInfo],
          })
        );
        //Mark as updated if admin Id exist and is not included in the list
        if (
          formDetails.contactId &&
          !companyDetails.updatedAdminIDs.includes(formDetails.contactId)
        ) {
          dispatch(
            updateCompanyForm({
              updatedAdminIDs: [
                ...companyDetails.updatedAdminIDs,
                formDetails.contactId,
              ],
            })
          );
        }
      } else {
        // Store the new admin
        dispatch(
          updateCompanyForm({
            admins: [
              ...companyDetails.admins,
              {
                ...newAdminInfo,
                localId: companyDetails.admins.length + 1,
              },
            ],
          })
        );
      }
      resetForm();
      dispatch(clearSingleAdminForm());
      setShowAdminForm(false);
    },
  });

  const handleProceedDialog = () => {
    setShowAdminForm(false);
    onCloseDialog();
  };

  return (
    <>
      <Flex width="full" height="full" direction="column">
        <FormikProvider value={formik}>
          <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
            <VStack
              spacing="16px"
              width="full"
              alignItems="flex-end"
              bgColor="#E4E4E4"
              pt="16px"
              pl="21px"
              pr="24px"
              pb="22px"
              rounded="8px"
            >
              <Grid
                templateColumns={{
                  base: '1fr',
                  md: 'repeat(2, 1fr)',
                }}
                gap={{ base: '24px', lg: '43px' }}
                width="full"
                alignItems="flex-start"
              >
                <GridItem colSpan={{ base: 1, md: 2 }}>
                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    customSpacing="47px"
                    title="Name"
                    description="Provide the contact person full name."
                    isRequired
                  >
                    <Stack
                      direction={{ base: 'column', md: 'row' }}
                      width="full"
                      justifyContent="space-between"
                      spacing="24px"
                    >
                      <Field
                        as={FormTextInput}
                        name="contactFirstName"
                        type="text"
                        label="First Name"
                      />

                      <Field
                        as={FormTextInput}
                        name="contactLastName"
                        type="text"
                        label="Last Name"
                      />
                    </Stack>
                  </FormInputWrapper>
                </GridItem>

                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="47px"
                  title="Email"
                  description="Provide the person’s email"
                  isRequired
                >
                  <Field
                    as={FormTextInput}
                    name="contactEmail"
                    type="email"
                    label="Enter Email"
                  />
                </FormInputWrapper>

                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="47px"
                  title="Phone Number"
                  description="Provide the person’s email"
                  isRequired
                >
                  <Field
                    as={FormTextInput}
                    name="contactPhoneNumber"
                    type="text"
                    label="Enter Phone Number"
                  />
                </FormInputWrapper>
              </Grid>
              <HStack
                spacing={{ base: '16px', md: '24px' }}
                justifyContent={{ base: 'space-between', md: undefined }}
              >
                <Button
                  variant="outline"
                  customStyles={{
                    width: { md: '96px', base: '40%' },
                    p: { base: '12px', md: '16px' },
                  }}
                  handleClick={() => onOpenDialog()}
                >
                  Cancel
                </Button>
                <Button
                  customStyles={{
                    width: { md: '161px', base: '50%' },
                    p: { base: '12px', md: '16px' },
                  }}
                  handleClick={formik.handleSubmit}
                >
                  {formDetails?.localId ? 'Update' : 'Add'} Admin
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </Flex>
      <LeaveDialogModal
        isOpen={isOpenDialog}
        onClose={onCloseDialog}
        handleProceed={handleProceedDialog}
      />
    </>
  );
};

export default AdminForm;
