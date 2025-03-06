import { Flex, useDisclosure, VStack } from '@chakra-ui/react';
import { FormActionButtons } from '@repo/ui/components';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '~/lib/redux/hooks';
import {
  COMPANY_TYPE_ENUM,
  FORM_ENUM,
  ROLE_IDS_ENUM,
  ROUTES,
} from '~/lib/utils/constants';
import CompanyInfo from './SectionOne/CompanyInfo';
import ContactInformation from './SectionOne/ContactInformation';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useSession } from 'next-auth/react';
import {
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
} from '~/lib/redux/services/company.services';
import CompanySuccessModal from './SuccessModal';

interface SummaryStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
  companyType:
    | (typeof COMPANY_TYPE_ENUM)[keyof typeof COMPANY_TYPE_ENUM]
    | undefined;
}

const SummaryStep = (props: SummaryStepProps) => {
  // eslint-disable-next-line no-unused-vars
  const { activeStep, setActiveStep, type, companyType } = props;
  const { companyForm } = useAppSelector((state) => state.company);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [username, setUsername] = useState<string | undefined>(undefined);
  const { handleSubmit } = useCustomMutation();
  const { data } = useSession();
  const user = data?.user;
  const isThirdParty =
    user?.roleIds.includes(ROLE_IDS_ENUM.THIRD_PARTY) ?? false;
  const [createCompany, { isLoading: createLoading }] =
    useCreateCompanyMutation({});
  // eslint-disable-next-line no-unused-vars
  const [updateCompany, { isLoading: updateLoading }] =
    useUpdateCompanyMutation({});

  //Store Username so that it is retained in the state.
  useEffect(() => {
    if (data) {
      setUsername(data?.user?.username);
    }
  }, [data]);

  const CompanyDto = {
    companyId: companyForm?.companyId,
    companyName: companyForm?.companyName!,
    address: companyForm?.address1!,
    emailAddress: companyForm?.companyEmail!,
    phoneNumber: null,
    industryId: companyForm?.industryTypeId!,
    subscriptionPlanId: companyForm?.subscriptionPlanId!,
    webUrl: companyForm?.companyWebsite!,
    [`${type === 'create' ? 'createdBy' : 'lastModifiedBy'}`]: username,
  };

  const CompanyUserDto = {
    phoneNumber: companyForm?.contactPhoneNumber!,
    firstName: companyForm?.contactFirstName!,
    lastName: companyForm?.contactLastName!,
    email: companyForm?.contactEmail!,
    [`${type === 'create' ? 'createdBy' : 'lastModifiedBy'}`]: username,
  };

  const createCompanyPayload = {
    createCompanyDto: { ...CompanyDto, companyType: companyType! },
    createCompanyImageDtos: [
      {
        imageName: companyForm.companyLogo?.imageName!,
        base64Prefix: companyForm.companyLogo?.base64Prefix!,
        base64PhotoImage: companyForm.companyLogo?.base64PhotoImage!,
        isPrimaryImage: true,
        companyId: null,
        createdBy: username!,
      },
    ],
    createUserDto: CompanyUserDto,
  };

  const updateCompanyPayload = {
    updateCompanyDto: CompanyDto,
    multiPurposeCompanyImageDto: [
      {
        imageName: companyForm.companyLogo?.imageName!,
        base64PhotoImage: companyForm.companyLogo?.base64PhotoImage!,
        base64Prefix: companyForm.companyLogo?.base64Prefix!,
        isPrimaryImage: true,
        companyId: companyForm.companyId!,
        actionType: FORM_ENUM.update,
        changeInitiatedBy: username!,
      },
    ],
    updateUserDto: CompanyUserDto,
  };

  const handleSumbitCompany = async () => {
    let response;
    if (type === 'create') {
      response = await handleSubmit(createCompany, createCompanyPayload, '');
    } else {
      response = await handleSubmit(updateCompany, updateCompanyPayload, '');
    }
    if (response?.data) {
      onOpen();
    }
  };

  return (
    <>
      <Flex
        width="full"
        gap="16px"
        direction="column"
        display={activeStep === (isThirdParty ? 3 : 4) ? 'flex' : 'none'}
      >
        <VStack
          width="full"
          alignItems="flex-start"
          spacing={{ base: '32px', lg: '40px' }}
          bgColor="white"
          pt={{ base: '16px' }}
          pl={{ md: '24px', lg: '16px' }}
          pb={{ base: '16px', lg: '40px' }}
          pr={{ md: '24px', lg: '44px' }}
          rounded="8px"
          minH="60vh"
        >
          <VStack
            spacing="8px"
            width={{ base: 'full', md: '50%' }}
            alignItems="flex-start"
          >
            <DetailHeader variant="primary">Company Logo</DetailHeader>

            <Flex
              position="relative"
              width="100px"
              height="75px"
              rounded="8px"
              overflow="hidden"
            >
              <Image
                src={
                  companyForm.companyLogo?.base64Prefix
                    ? `${companyForm.companyLogo.base64Prefix}${companyForm.companyLogo.base64PhotoImage}`
                    : (companyForm.companyLogo?.base64PhotoImage ?? '')
                }
                alt="Company Logo"
                fill
              />
            </Flex>
          </VStack>
          <Flex
            width="full"
            gap={{ base: '32px' }}
            direction={{ base: 'column', lg: 'row' }}
          >
            <Flex width={{ base: 'full', lg: '50%' }}>
              <CompanyInfo />
            </Flex>
            <Flex width={{ base: 'full', lg: '50%' }}>
              <ContactInformation />
            </Flex>
            {/* <Flex width={{ base: 'full', lg: '20%' }}>
              <Subscription />
            </Flex> */}
          </Flex>
        </VStack>
        <FormActionButtons
          cancelLink={`/${ROUTES.COMPANY}`}
          totalStep={5}
          activeStep={5}
          setActiveStep={setActiveStep}
          handleContinue={handleSumbitCompany}
          isLoading={createLoading || updateLoading}
          loadingText={createLoading ? 'Submitting...' : 'Updating...'}
        />
      </Flex>
      <CompanySuccessModal isOpen={isOpen} onClose={onClose} type={type} />
    </>
  );
};

export default SummaryStep;
