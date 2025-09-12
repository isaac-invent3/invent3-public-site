import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { BackButton, Button, GenericDrawer } from '@repo/ui/components';
import React from 'react';
import Detail from '~/lib/components/Profile/Detail';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { ThirdPartyIntegration } from '~/lib/interfaces/integration.interfaces';
import AlertSummary from './AlertSummary';
import FailureDrivers from './FailureDrivers';
import SuggestedActions from './SuggestedActions';
import HistoryDataSnapShot from './HistoricalSnapshot';

interface PredictiveAlertProps {
  isOpen: boolean;
  onClose: () => void;
}

const PredictiveAlert = (props: PredictiveAlertProps) => {
  const { isOpen, onClose } = props;

  return (
    <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="548px">
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
      <DrawerBody p={0}>
        <VStack width="full" alignItems="flex-start" spacing="56px">
          <VStack
            width="full"
            px={{ base: '24px' }}
            py="16px"
            bgColor="#B4BFCA4D"
            alignItems="flex-start"
          >
            <HStack spacing="25px">
              <Text size="xl" lineHeight="100%" fontWeight={400}>
                <Text fontWeight={700} size="xl" lineHeight="100%" as="span">
                  Predictive Alert:{' '}
                </Text>
                HVAC Unit 3A
              </Text>
              <Text
                color="white"
                bgColor="red.500"
                py="4px"
                px="12px"
                rounded="full"
              >
                High Risk
              </Text>
            </HStack>
            <Text fontWeight={700} color="neutral.600">
              Generated on Sept 6, 2025
            </Text>
          </VStack>
          <VStack
            px={{ base: '24px' }}
            width="full"
            divider={<StackDivider borderColor="#BBBBBB" />}
            spacing="24px"
          >
            <AlertSummary />
            <FailureDrivers />
            <HistoryDataSnapShot />
            <SuggestedActions />
          </VStack>
        </VStack>
      </DrawerBody>
    </GenericDrawer>
  );
};

export default PredictiveAlert;
