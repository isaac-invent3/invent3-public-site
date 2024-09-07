import { Flex, VStack } from '@chakra-ui/react';
import React from 'react';
import { AssetFormDetails } from '~/lib/interfaces/asset.interfaces';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import FormActionButtons from '../FormActionButtons';

interface SummaryStepProps {
  assetFormDetails: AssetFormDetails;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const SummaryStep = ({ assetFormDetails, setActiveStep }: SummaryStepProps) => {
  return (
    <Flex width="full" gap="16px" direction="column">
      <VStack
        width="full"
        alignItems="flex-start"
        spacing="39px"
        bgColor="white"
        pt="16px"
        pl="16px"
        pr="44px"
        pb="40px"
        rounded="8px"
      >
        <SectionOne assetFormDetails={assetFormDetails} />
        <SectionTwo assetFormDetails={assetFormDetails} />
      </VStack>
      <FormActionButtons activeStep={3} setActiveStep={setActiveStep} />
    </Flex>
  );
};

export default SummaryStep;
