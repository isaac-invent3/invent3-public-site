import { Box, Flex, Grid, GridItem, Stack, Text } from '@chakra-ui/react';
import {
  FormActionButtons,
  FormInputWrapper,
  FormSelect,
  FormTextInput,
} from '@repo/ui/components';
import { Field, FieldArray, FormikProvider, useFormik } from 'formik';
import { AddIcon } from '~/lib/components/CustomIcons';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateCompanyForm } from '~/lib/redux/slices/CompanySlice';
import { companyContactInformationSchema } from '~/lib/schemas/company/main.schema';
import { ROUTES } from '~/lib/utils/constants';

interface ContactInformationStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const ContactInformationStep = (props: ContactInformationStepProps) => {
  const { activeStep, setActiveStep } = props;
  const { companyForm: formDetails } = useAppSelector((state) => state.company);
  const dispatch = useAppDispatch();

  const baseContactInfo = {
    contactFirstName: '',
    contactLastName: '',
    contactEmail: '',
    contactPhoneNumber: '',
    contactJobTitle: '',
  };

  const prevContactInformation = [
    ...formDetails.contactInformation,
    baseContactInfo,
  ];

  const formik = useFormik({
    initialValues: {
      contactInformation: prevContactInformation,
    },
    validationSchema: companyContactInformationSchema,
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
            <FieldArray name="contactInformation">
              {({ insert, remove, form }) => {
                return (
                  <Grid
                    templateColumns={{
                      base: '1fr',
                      md: 'repeat(2, 1fr)',
                    }}
                    gap={{ base: '24px', lg: '43px' }}
                    width="full"
                    alignItems="flex-start"
                  >
                    {formik.values.contactInformation.map((contact, index) => (
                      <>
                        <GridItem colSpan={{ base: 1, md: 2 }}>
                          <FormInputWrapper
                            sectionMaxWidth="141px"
                            customSpacing="47px"
                            title="Contact Name"
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
                                name={`contactInformation[${index}].contactFirstName`}
                                type="text"
                                label="First Name"
                              />

                              <Field
                                as={FormTextInput}
                                name={`contactInformation[${index}].contactLastName`}
                                type="text"
                                label="Last Name"
                              />
                            </Stack>
                          </FormInputWrapper>
                        </GridItem>

                        <FormInputWrapper
                          sectionMaxWidth="141px"
                          customSpacing="47px"
                          title="Contact Email"
                          description="Provide the person’s email"
                        >
                          <Field
                            as={FormTextInput}
                            name={`contactInformation[${index}].contactEmail`}
                            type="email"
                            label="Enter Email"
                          />
                        </FormInputWrapper>

                        <FormInputWrapper
                          sectionMaxWidth="141px"
                          customSpacing="47px"
                          title="Contact Phone Number"
                          description="Provide the person’s email"
                        >
                          <Field
                            as={FormTextInput}
                            name={`contactInformation[${index}].contactPhoneNumber`}
                            type="text"
                            label="Enter Phone Number"
                          />
                        </FormInputWrapper>

                        <FormInputWrapper
                          sectionMaxWidth="141px"
                          customSpacing="47px"
                          title="Job Title"
                          description="Provide the person’s Job Title"
                        >
                          <FormSelect
                            name={`contactInformation[${index}].contactJobTitle`}
                            title="Job Title"
                            options={[{label:'Test', value:'test'}]}
                            isSearchable
                          />
                        </FormInputWrapper>
                      </>
                    ))}

                    <Text
                      display="flex"
                      alignItems="center"
                      gap="8px"
                      color="#0366EF"
                      size="md"
                      cursor="pointer"
                      onClick={() => insert(0, baseContactInfo)}
                    >
                      <AddIcon boxSize="18px" /> Add Another Contact
                    </Text>
                  </Grid>
                );
              }}
            </FieldArray>
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
