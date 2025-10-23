import { useAppFormik } from '~/lib/hooks/useAppFormik';
import {
  Flex,
  HStack,
  StackDivider,
  Switch,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  FormActionButtons,
  FormInputWrapper,
  FormTextInput,
  RadioBox,
} from '@repo/ui/components';
import { Field, FormikProvider } from 'formik';
import { useState } from 'react';
import InfoCard from '~/lib/components/UI/InfoCard';

import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateCompanyForm } from '~/lib/redux/slices/CompanySlice';
import { authenticationMethodSchema } from '~/lib/schemas/company/main.schema';
import { AUTHENTICATION_PROTOCOL_ENUM, ROUTES } from '~/lib/utils/constants';

const methodData = [
  {
    label: 'Basic Authentication',
    value: 1,
  },
  {
    label: 'Active Directory Authentication',
    value: 2,
  },
];
interface AuthenticationProtocolProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const AuthenticationProtocol = (props: AuthenticationProtocolProps) => {
  const { activeStep, setActiveStep } = props;
  const dispatch = useAppDispatch();
  const { companyForm: formDetails } = useAppSelector((state) => state.company);
  const [companyAuthProtocol, setCompanyAuthProtocol] = useState(
    AUTHENTICATION_PROTOCOL_ENUM.BASIC
  );
  const formik = useAppFormik({
    initialValues: {
      companyAuthProtocolId:
        formDetails?.companyAuthProtocolId ??
        AUTHENTICATION_PROTOCOL_ENUM.BASIC,
      activeDirectoryUrl: formDetails?.activeDirectoryUrl,
    },
    validationSchema: authenticationMethodSchema(
      companyAuthProtocol === AUTHENTICATION_PROTOCOL_ENUM.ACTIVE_DIRECTORY
    ),
    enableReinitialize: true,
    onSubmit: async (values) => {
      dispatch(updateCompanyForm(values));
      setActiveStep(4);
    },
  });

  return (
    <Flex
      width="full"
      height="full"
      direction="column"
      display={activeStep === 3 ? 'flex' : 'none'}
    >
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack
            spacing={{ base: '24px', lg: '32px' }}
            width="full"
            alignItems="flex-start"
            bgColor="white"
            pt={{ base: '16px', lg: '26px' }}
            pl={{ md: '24px', lg: '16px' }}
            pb={{ base: '16px', lg: '33px' }}
            pr={{ md: '24px', lg: '44px' }}
            rounded="6px"
            minH={{ lg: '60vh' }}
            divider={<StackDivider borderColor="#BBBBBB" opacity={0.4} />}
          >
            <FormInputWrapper
              sectionMaxWidth="191px"
              customSpacing="187px"
              title="Select Authentication Method"
              description="Select Authentication Method"
            >
              <VStack alignItems="flex-start" spacing="29px" maxW="80%">
                <HStack spacing={{ base: '24px', lg: '110px' }} width="full">
                  {methodData.map((item, index) => (
                    <HStack key={index} spacing="16px">
                      <RadioBox
                        isSelected={
                          item.value === formik.values.companyAuthProtocolId
                        }
                        handleClick={() => {
                          setCompanyAuthProtocol(item.value);
                          dispatch(
                            updateCompanyForm({
                              companyAuthProtocolName: item.label,
                            })
                          );
                          formik.setFieldValue(
                            'companyAuthProtocolId',
                            item.value
                          );
                        }}
                      />
                      <Text color="primary.500" size="md" whiteSpace="nowrap">
                        {item.label}
                      </Text>
                    </HStack>
                  ))}
                </HStack>
                <InfoCard
                  infoText=" This authentication protocol mandates that all user accounts
                established under the company must be authenticated exclusively
                through the Active Directory system."
                  customStyle={{ maxW: '528px', pb: '23px' }}
                />
              </VStack>
            </FormInputWrapper>
            {formik.values.companyAuthProtocolId ===
              AUTHENTICATION_PROTOCOL_ENUM.ACTIVE_DIRECTORY && (
              <VStack width="full">
                <FormInputWrapper
                  sectionMaxWidth="157px"
                  customSpacing="65px"
                  title="Active Directory URL"
                  isRequired
                  description="Provide the url for your active directory"
                >
                  <Field
                    as={FormTextInput}
                    name="activeDirectoryUrl"
                    type="text"
                    label="AD URL"
                  />
                </FormInputWrapper>
              </VStack>
            )}

            {formik.values.companyAuthProtocolId ===
              AUTHENTICATION_PROTOCOL_ENUM.BASIC && (
              <VStack
                width="full"
                alignItems="flex-start"
                spacing="24px"
                maxW="80%"
              >
                <Text size="lg" color="primary.500" fontWeight={700}>
                  Authentication Preferences
                </Text>
                <FormInputWrapper
                  sectionMaxWidth="232px"
                  customSpacing="65px"
                  title="Generate Temporary Password for new users"
                  description="Create a one-time password to help new users access their account securely."
                  justifyContent="space-between"
                >
                  <Switch size="md" isChecked readOnly />
                </FormInputWrapper>
                <FormInputWrapper
                  sectionMaxWidth="250px"
                  customSpacing="65px"
                  title="Users must change Password on first login"
                  description="For security, you’ll be required to update your password when logging in for the first time."
                  justifyContent="space-between"
                >
                  <Switch size="md" isChecked readOnly />
                </FormInputWrapper>
              </VStack>
            )}
          </VStack>

          <Flex width="full" mt="16px">
            <FormActionButtons
              cancelLink={`/${ROUTES.COMPANY}`}
              totalStep={5}
              activeStep={3}
              setActiveStep={setActiveStep}
            />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default AuthenticationProtocol;
