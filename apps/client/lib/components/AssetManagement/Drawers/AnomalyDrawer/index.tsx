import {
  Collapse,
  DrawerBody,
  DrawerHeader,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { BackButton, EmptyState, GenericDrawer } from '@repo/ui/components';
import React, { useState } from 'react';
import { ChevronDownIcon } from '~/lib/components/CustomIcons';
import { BMSAnomaly } from '~/lib/interfaces/dashboard/bms.interfaces';
import AnomalyContainer from './AnomalyContainer';

interface AnomalyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  anomalies?: BMSAnomaly[];
}

const AnomalyDrawer = (props: AnomalyDrawerProps) => {
  const { isOpen, onClose, anomalies } = props;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
        <VStack width="full" alignItems="flex-start" spacing="8px">
          {anomalies?.map((item, index) => (
            <AnomalyContainer
              anomaly={item}
              key={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
          {anomalies?.length === 0 && (
            <EmptyState emptyText="No Anomaly at the moment" />
          )}
        </VStack>
      </DrawerBody>
    </GenericDrawer>
  );
};

export default AnomalyDrawer;
