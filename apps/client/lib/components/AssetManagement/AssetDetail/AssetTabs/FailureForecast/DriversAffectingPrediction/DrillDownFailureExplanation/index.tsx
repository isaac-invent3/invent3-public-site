import React from 'react';
import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  HStack,
  VStack,
} from '@chakra-ui/react';
import {
  BackButton,
  Button,
  GenericDrawer,
  ModalHeading,
} from '@repo/ui/components';
import ExplanationAccordion from './ExplanationAccordion';
import Summary from './Summary';
import { AssetForecast } from '~/lib/interfaces/forecast.interfaces';

interface DrillDownFailureExplanationProps {
  isOpen: boolean;
  onClose: () => void;
  assetForcast?: AssetForecast;
}

const DrillDownFailureExplanation = (
  props: DrillDownFailureExplanationProps
) => {
  const { isOpen, onClose, assetForcast } = props;
  return (
    <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="685px">
      <DrawerHeader p={0} m={0}>
        <HStack
          pt="16px"
          pb="40px"
          px={{ base: '24px' }}
          width="full"
          justifyContent="space-between"
        >
          <BackButton handleClick={onClose} />
        </HStack>
      </DrawerHeader>
      <DrawerBody p={0} width="full">
        <VStack width="full" spacing={8}>
          <VStack width="full" spacing={4} alignItems="flex-start">
            <ModalHeading
              heading="Drill-Down Failure Explanation"
              subheading="Detailed analysis of predictive factors contributing to potential failure."
              headingStyle={{
                color: 'black',
                size: { md: 'lg' },
                fontWeight: 700,
              }}
              customStyle={{ px: '24px' }}
            />
            <Summary failureDate={assetForcast?.forecastedLabelStartDate} />
          </VStack>
          <ExplanationAccordion assetForcast={assetForcast} />
        </VStack>
      </DrawerBody>
      <DrawerFooter p={0} mb="30px">
        <HStack
          width="full"
          px={{ base: '24px' }}
          justifyContent="flex-end"
          spacing={2}
          flexWrap="wrap"
        >
          <Button
            variant="secondary"
            customStyles={{ width: 'min-content', bgColor: 'transparent' }}
          >
            Dismiss
          </Button>
          <Button variant="secondary" customStyles={{ width: 'min-content' }}>
            Download Full Analysis Report
          </Button>
          <Button customStyles={{ width: '132px' }} loadingText="Generating...">
            Create Ticket
          </Button>
        </HStack>
      </DrawerFooter>
    </GenericDrawer>
  );
};

export default DrillDownFailureExplanation;
