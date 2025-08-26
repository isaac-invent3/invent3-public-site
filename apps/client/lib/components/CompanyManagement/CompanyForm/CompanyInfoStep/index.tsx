import { Flex, Stack, VStack } from '@chakra-ui/react';
import {
  FormActionButtons,
  FormInputWrapper,
  FormTextInput,
} from '@repo/ui/components';
import { Field, FormikProvider, useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateCompanyForm } from '~/lib/redux/slices/CompanySlice';
import { ROLE_IDS_ENUM, ROUTES } from '~/lib/utils/constants';
import CompanyLocation from './CompanyLocation';
import CompanyLogo from './CompanyLogo';
import IndustryTypeSelect from './IndustryTypeSelect';
import { companyInfoSchema } from '~/lib/schemas/company/main.schema';
import EmployeeSelect from '~/lib/components/UserManagement/UserForm/EmployeeInfo/IDP/EmployeeSelect';
import { useSession } from 'next-auth/react';

interface CompanyInfoStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const CompanyInfoStep = (props: CompanyInfoStepProps) => {
  const { activeStep, setActiveStep } = props;
  const { companyForm: formDetails } = useAppSelector((state) => state.company);
  const dispatch = useAppDispatch();
  const session = useSession();
  const user = session?.data?.user;
  const isThirdParty =
    user?.roleIds.includes(ROLE_IDS_ENUM.THIRD_PARTY) ?? false;

  const formik = useFormik({
    initialValues: {
      companyLogo: formDetails.companyLogo ?? null,
      companyName: formDetails.companyName ?? '',
      registrationNumber: formDetails.registrationNumber ?? '',
      industryTypeId: formDetails.industryTypeId ?? null,
      companyEmail: formDetails.companyEmail ?? '',
      companyWebsite: formDetails.companyWebsite ?? '',
      address1: formDetails.address1 ?? '',
      address2: formDetails.address2 ?? '',
      countryId: formDetails.countryId ?? null,
      stateId: formDetails.stateId ?? null,
      lgaId: formDetails.lgaId ?? null,
      postalCode: formDetails.postalCode ?? null,
      clientAdminId: formDetails.clientAdminId ?? null,
    },
    validationSchema: companyInfoSchema(false),
    enableReinitialize: false,
    onSubmit: async (values) => {
      dispatch(updateCompanyForm(values));
      setActiveStep(2);
    },
  });

  return (
    <Flex
      width="full"
      height="full"
      direction="column"
      display={activeStep === 1 ? 'flex' : 'none'}
    >
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack
            spacing={{ base: '24px', lg: '43px' }}
            width="full"
            alignItems="flex-start"
            bgColor="white"
            pt={{ base: '16px', lg: '26px' }}
            pl={{ md: '24px', lg: '16px' }}
            pb={{ base: '16px', lg: '33px' }}
            pr={{ md: '24px', lg: '44px' }}
            rounded="6px"
            minH={{ lg: '60vh' }}
          >
            <CompanyLogo />

            <FormInputWrapper
              sectionMaxWidth="141px"
              customSpacing="47px"
              title="Company Name"
              description="Provide essential information about the Company being added."
              isRequired
            >
              <Field
                as={FormTextInput}
                name="companyName"
                type="text"
                label="Company Name"
              />
            </FormInputWrapper>
            <Stack
              width="full"
              direction={{ base: 'column', lg: 'row' }}
              spacing={{ base: '24px', lg: '32px' }}
            >
              <FormInputWrapper
                sectionMaxWidth="141px"
                customSpacing="47px"
                title="Registration Number"
                description="Provide the company’s registration number"
                w={{ base: 'full', lg: '50%' }}
              >
                <Field
                  as={FormTextInput}
                  name="registrationNumber"
                  type="text"
                  label="Registration Number"
                />
              </FormInputWrapper>

              <FormInputWrapper
                sectionMaxWidth="141px"
                customSpacing="47px"
                title="Industry Type"
                description="Select the Industry type"
                w={{ base: 'full', lg: '50%' }}
                isRequired
              >
                <IndustryTypeSelect
                  selectName="industryTypeId"
                  selectTitle="Industry Type"
                  handleSelect={(option) =>
                    dispatch(
                      updateCompanyForm({ industryTypeName: option.label })
                    )
                  }
                />
              </FormInputWrapper>
            </Stack>
            <Stack
              width="full"
              direction={{ base: 'column', lg: 'row' }}
              spacing={{ base: '24px', lg: '32px' }}
            >
              <FormInputWrapper
                sectionMaxWidth="141px"
                customSpacing="47px"
                title="Company Email"
                description="Provide the company’s email"
                w={{ base: 'full', lg: '50%' }}
              >
                <Field
                  as={FormTextInput}
                  name="companyEmail"
                  type="email"
                  label="Company Email"
                />
              </FormInputWrapper>

              <FormInputWrapper
                sectionMaxWidth="141px"
                customSpacing="47px"
                title="Company Website"
                description="Provide the company’s Website"
                w={{ base: 'full', lg: '50%' }}
              >
                <Field
                  as={FormTextInput}
                  name="companyWebsite"
                  type="url"
                  label="Company Website"
                />
              </FormInputWrapper>
            </Stack>

            <CompanyLocation />
            {isThirdParty && (
              <FormInputWrapper
                sectionMaxWidth="142px"
                customSpacing="47px"
                title="Assign CMF Manager"
                description="Select and assign a user to manage this company"
                w={{ base: 'full', lg: '50%' }}
              >
                <EmployeeSelect
                  selectName="clientAdminId"
                  selectTitle="Select User"
                />
              </FormInputWrapper>
            )}
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons
              cancelLink={`/${ROUTES.COMPANY}`}
              totalStep={4}
              activeStep={1}
              setActiveStep={setActiveStep}
            />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default CompanyInfoStep;
