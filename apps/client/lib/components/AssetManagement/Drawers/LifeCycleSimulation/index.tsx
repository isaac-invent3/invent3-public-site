import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Flex,
  Heading,
  HStack,
} from '@chakra-ui/react';
import {
  BackButton,
  FormStepper,
  GenericDrawer,
  SlideTransition,
} from '@repo/ui/components';
import React, { useState } from 'react';
import AssetParameters from './AssetParameters';
import MaintenanceDepreciationParameters from './MaintenanceDepreciationParameters';
import Scenarios from './Scenarios';
import Review from './Review';

interface LifeCycleSimulationProps {
  isOpen: boolean;
  onClose: () => void;
}

const LifeCycleSimulation = (props: LifeCycleSimulationProps) => {
  const { isOpen, onClose } = props;
  const [activeStep, setActiveStep] = useState(2);

  const STEPS = [
    'Define Asset Parameters',
    'Define Maintenance & Depreciation Parameters',
    'Simulate Lifecycle Scenarios',
    'Review & Save Plan',
  ];

  return (
    <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="1034px">
      <DrawerHeader p={0} m={0} px={8} mt="40px">
        <Heading fontWeight={800} mb="12px">
          Asset Lifecycle Simulation Wizard
        </Heading>
      </DrawerHeader>
      <DrawerBody p={0}>
        <Flex width="full" direction="column" pb={{ md: '24px' }} height="90%">
          <Flex
            width="full"
            gap={{ md: '8px' }}
            mt="24px"
            direction="column"
            flex={1}
          >
            <FormStepper
              currentStep={activeStep}
              steps={STEPS}
              shouldWrap
              maxW="120px"
            />
            <Flex
              width="full"
              px={{ base: '16px', md: 0 }}
              bgColor={{ base: 'white', md: 'transparent' }}
              direction="column"
              pb="24px"
              mt="36px"
              flex={1}
              minH="full"
            >
              <AssetParameters
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                onClose={onClose}
              />
              <SlideTransition
                trigger={activeStep === 2}
                style={{ minHeight: activeStep === 2 ? '100%' : 0, flex: 1 }}
              >
                <MaintenanceDepreciationParameters
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
              </SlideTransition>
              <SlideTransition
                trigger={activeStep === 3}
                style={{ minHeight: activeStep === 3 ? '100%' : 0, flex: 1 }}
              >
                <Scenarios
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
              </SlideTransition>
              <SlideTransition
                trigger={activeStep === 4}
                style={{ minHeight: activeStep === 4 ? '100%' : 0, flex: 1 }}
              >
                <Review activeStep={activeStep} setActiveStep={setActiveStep} />
              </SlideTransition>
            </Flex>
          </Flex>
        </Flex>
      </DrawerBody>
      <DrawerFooter width="full"></DrawerFooter>
    </GenericDrawer>
  );
};

export default LifeCycleSimulation;
