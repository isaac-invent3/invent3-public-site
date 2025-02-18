import { Flex, VStack } from '@chakra-ui/react';
import { FormActionButtons, FormInputWrapper } from '@repo/ui/components';
import Image from 'next/image';
import React from 'react';
import { useAppSelector } from '~/lib/redux/hooks';
import { ROUTES } from '~/lib/utils/constants';

interface SummaryStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
}

const SummaryStep = (props: SummaryStepProps) => {
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
          <FormInputWrapper
            sectionMaxWidth="141px"
            customSpacing="47px"
            title="Company Logo"
            description="Size max: 10MB each Format: JPG, PNG"
          >
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
                    : (companyForm.companyLogo?.base64PhotoImage ??
                      '/images/default-company-logo.png')
                }
                alt="Company Logo"
                fill
              />
            </Flex>
          </FormInputWrapper>
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
