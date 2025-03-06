'use client';

import { Flex } from '@chakra-ui/react';
import { FormStepper, SlideTransition } from '@repo/ui/components';
import { useState } from 'react';
import CompanyInfoStep from './CompanyInfoStep';
import ContactInformationStep from './ContactInformationStep';
import Header from './Header';
import SubscriptionStep from './SubscriptionStep';
import SummaryStep from './SummaryStep';
import { COMPANY_TYPE_ENUM, ROLE_IDS_ENUM } from '~/lib/utils/constants';
import withFormLeaveDialog from '../../UI/FormLeaveDialogProvider';
import { useSession } from 'next-auth/react';

interface CompanyFormProps {
  type: 'create' | 'edit';
  companyType?: (typeof COMPANY_TYPE_ENUM)[keyof typeof COMPANY_TYPE_ENUM];
}
const CompanyForm = (props: CompanyFormProps) => {
  const { type, companyType } = props;
  const [activeStep, setActiveStep] = useState(1);
  const session = useSession();
  const user = session?.data?.user;
  const isThirdParty =
    user?.roleIds.includes(ROLE_IDS_ENUM.THIRD_PARTY) ?? false;

  const THIRD_PARTY_STEPS = ['Company Info', 'Company Contact', 'Summary'];
  const SUPER_ADMIN_STEPS = [
    'Company Info',
    'Company Admin',
    'Subscription',
    'Summary',
  ];

  const STEPS = isThirdParty ? THIRD_PARTY_STEPS : SUPER_ADMIN_STEPS;

  return (
    <Flex width="full" direction="column" pb={{ md: '24px' }}>
      <Header type={type} />
      <Flex width="full" gap={{ md: '8px' }} mt="32px" direction="column">
        <FormStepper currentStep={activeStep} steps={STEPS} />
        <Flex
          width="full"
          px={{ base: '16px', md: 0 }}
          bgColor={{ base: 'white', md: 'transparent' }}
          direction="column"
          pb="24px"
        >
          <CompanyInfoStep
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
          <SlideTransition trigger={activeStep === 2}>
            <ContactInformationStep
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </SlideTransition>
          {!isThirdParty && (
            <SlideTransition trigger={activeStep === 3}>
              <SubscriptionStep
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            </SlideTransition>
          )}

          <SlideTransition trigger={activeStep === (isThirdParty ? 3 : 4)}>
            <SummaryStep
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              companyType={companyType}
              type={type}
            />
          </SlideTransition>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default withFormLeaveDialog(CompanyForm);
