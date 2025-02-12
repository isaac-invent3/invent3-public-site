import { FormActionButtons } from '@repo/ui/components';
import React from 'react';
import { ROUTES } from '~/lib/utils/constants';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import { Flex, useDisclosure, VStack } from '@chakra-ui/react';
import UserSuccessModal from './SuccessModal';

interface SummaryStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
}

const SummaryStep = (props: SummaryStepProps) => {
  const { activeStep, setActiveStep, type } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();
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
          spacing="40px"
          bgColor="white"
          pt="16px"
          pl="16px"
          pr={{ base: '16px', md: '44px' }}
          pb="40px"
          rounded="8px"
          minH="60vh"
        >
          <SectionOne />
          <SectionTwo />
        </VStack>
        <FormActionButtons
          cancelLink={`/${ROUTES.USERS}`}
          totalStep={4}
          activeStep={4}
          setActiveStep={setActiveStep}
          handleContinue={onOpen}
        />
      </Flex>
      <UserSuccessModal
        isOpen={isOpen}
        onClose={onClose}
        successText={
          type === 'create'
            ? 'User Created Successfully!'
            : 'User Updated Sucessfully'
        }
      />
    </>
  );
};

export default SummaryStep;
