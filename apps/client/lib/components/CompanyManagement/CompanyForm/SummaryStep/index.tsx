import { Flex, VStack } from '@chakra-ui/react';
import { FormActionButtons } from '@repo/ui/components';
import Image from 'next/image';
import React from 'react';
import { useAppSelector } from '~/lib/redux/hooks';
import { ROUTES } from '~/lib/utils/constants';
import CompanyInfo from './SectionOne/CompanyInfo';
import ContactInformation from './SectionOne/ContactInformation';
import DetailHeader from '~/lib/components/UI/DetailHeader';

interface SummaryStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
}

const SummaryStep = (props: SummaryStepProps) => {
  // eslint-disable-next-line no-unused-vars
  const { activeStep, setActiveStep, type } = props;
  const { companyForm } = useAppSelector((state) => state.company);

  return (
    <>
      <Flex
        width="full"
        gap="16px"
        direction="column"
        display={activeStep === 4 ? 'flex' : 'none'}
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
          // handleContinue={handleSumbitAsset}
          // isLoading={createLoading || updateLoading}
          // loadingText={createLoading ? 'Submitting...' : 'Updating...'}
        />
      </Flex>
    </>
  );
};

export default SummaryStep;
