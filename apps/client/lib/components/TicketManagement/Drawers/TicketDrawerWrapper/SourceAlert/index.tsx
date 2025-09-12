import { HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import Detail from '~/lib/components/UI/ContentDetails/Detail';
import PredictiveAlert from './PredictiveAlert';

const SourceAlert = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <VStack spacing="8px" width="full">
        <HStack width="full" justifyContent="space-between">
          <Text color="neutral.600" fontWeight={700}>
            Source Alert
          </Text>
          <Text color="blue.500" cursor="pointer" onClick={onOpen}>
            View Full Predictive Alert
          </Text>
        </HStack>
        <HStack
          width="full"
          rounded="6px"
          borderWidth="1px"
          borderColor="#C9C9C9"
          p="8px"
          justifyContent="space-between"
        >
          <Detail
            label="Asset"
            value="HVAC Unit 3A"
            itemContainerStyle={{ direction: 'column' }}
            valueStyle={{ color: 'black' }}
            labelStyle={{ size: 'base', fontWeight: 700 }}
          />
          <Detail
            label="Risk Level"
            value="85%"
            itemContainerStyle={{ direction: 'column' }}
            valueStyle={{ color: 'red.500', fontWeight: 700 }}
            labelStyle={{ size: 'base', fontWeight: 700 }}
          />
          <Detail
            label="Predicted Failure Date"
            value="23 / 10 / 2024"
            itemContainerStyle={{ direction: 'column' }}
            valueStyle={{ color: 'black' }}
            labelStyle={{ size: 'base', fontWeight: 700 }}
          />
        </HStack>
      </VStack>
      <PredictiveAlert isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default SourceAlert;
