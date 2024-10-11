import { Divider, Flex, VStack } from '@chakra-ui/react';
import React from 'react';
import FormActionButtons from '~/lib/components/UI/Form/FormActionButtons';
import Header from '../Header';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';

interface SummarySectionProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
}
const SummarySection = (props: SummarySectionProps) => {
  const { activeStep, setActiveStep, type } = props;
  const breadCrumbText =
    type === 'create'
      ? 'Add New Maintenance Schedule'
      : 'Edit Maintenance Schedule';

  return (
    <Flex
      width="full"
      height="full"
      direction="column"
      display={activeStep === 1 ? 'flex' : 'none'}
    >
      <Header
        headingText="Maintenance Schedule Summary"
        breadCrumbText={breadCrumbText}
      />
      <VStack
        spacing="32px"
        width="full"
        alignItems="flex-start"
        bgColor="white"
        pt="26px"
        pl="16px"
        pb="32px"
        pr="30px"
        mt="40px"
        rounded="6px"
        minH="60vh"
        divider={<Divider borderColor="#BBBBBB" />}
      >
        <SectionOne />
        <SectionTwo />
      </VStack>
      <Flex width="full" mt="16px">
        <FormActionButtons
          cancelLink="/maintenance"
          totalStep={1}
          activeStep={1}
          setActiveStep={setActiveStep}
        />
      </Flex>
    </Flex>
  );
};

export default SummarySection;
