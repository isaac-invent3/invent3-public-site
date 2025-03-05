import { Box, Flex, Grid, GridItem, Stack } from '@chakra-ui/react';
import {
  FormActionButtons,
  FormInputWrapper,
  FormTextInput,
} from '@repo/ui/components';
import { Field, FormikProvider, useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateCompanyForm } from '~/lib/redux/slices/CompanySlice';
import { contactInfoSchema } from '~/lib/schemas/company/main.schema';
import { ROUTES } from '~/lib/utils/constants';

interface ContactInformationStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const ContactInformationStep = (props: ContactInformationStepProps) => {
  const { activeStep, setActiveStep } = props;
  const { companyForm: formDetails } = useAppSelector((state) => state.company);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      contactFirstName: formDetails?.contactFirstName,
      contactLastName: formDetails?.contactLastName,
      contactEmail: formDetails?.contactEmail,
      contactPhoneNumber: formDetails?.contactPhoneNumber,
    },
    validationSchema: contactInfoSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      dispatch(updateCompanyForm(values));
      setActiveStep(3);
    },
  });

  return (
    <Flex
      width="full"
      height="full"
      direction="column"
      display={activeStep === 2 ? 'flex' : 'none'}
    >
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <Box
            minH={{ lg: '60vh' }}
            bgColor="white"
            pt={{ base: '16px', lg: '26px' }}
            pl={{ md: '24px', lg: '16px' }}
            pb={{ base: '16px', lg: '33px' }}
            pr={{ md: '24px', lg: '44px' }}
            rounded="6px"
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
                  title="Company Admin"
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
                title="Admin Email"
                description="Provide the person’s email"
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
                title="Admin Phone Number"
                description="Provide the person’s email"
              >
                <Field
                  as={FormTextInput}
                  name="contactPhoneNumber"
                  type="text"
                  label="Enter Phone Number"
                />
              </FormInputWrapper>
            </Grid>
          </Box>

          <Flex width="full" mt="16px">
            <FormActionButtons
              cancelLink={`/${ROUTES.COMPANY}`}
              totalStep={4}
              activeStep={2}
              setActiveStep={setActiveStep}
            />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default ContactInformationStep;
