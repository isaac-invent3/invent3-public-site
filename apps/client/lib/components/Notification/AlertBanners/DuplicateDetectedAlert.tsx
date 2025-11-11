'use client';
import {
  HStack,
  Icon,
  Text,
  VStack,
  Box,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { WarningIcon } from '../../CustomIcons';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import TicketDrawerWrapper from '../../TicketManagement/Drawers/TicketDrawerWrapper';

interface DuplicateDetectedAlertProps {
  ticket?: Ticket;
  duration?: number; // milliseconds, default 10s
  onClose?: () => void;
}

const DuplicateDetectedAlert = ({
  ticket,
  duration = 10000,
  onClose,
}: DuplicateDetectedAlertProps) => {
  const { isOpen, onOpen, onClose: onDrawerClose } = useDisclosure();

  // Auto close after the given duration
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!ticket) return null;

  return (
    <Box
      position="fixed"
      top="80px"
      right="20px"
      zIndex={1000}
      display="flex"
      flexDirection="column"
      gap="16px"
    >
      <HStack
        bgColor="white"
        borderLeft="3px solid #0366EF"
        py="8px"
        px="16px"
        boxShadow="lg"
        justifyContent="space-between"
        alignItems=""
        rounded="2px"
        position="relative"
        maxW="600px"
        align="stretch"
      >
        <Flex
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          bgColor="#0366EF0D"
        />
        <HStack
          spacing="12px"
          align="flex-start"
          position="relative"
          zIndex={10}
          borderRight="1px solid #BBBBBB"
        >
          <Icon as={WarningIcon} boxSize="48px" color="#0366EF" />
          <VStack align="flex-start" spacing="10px">
            <Text
              fontWeight={700}
              fontSize="16px"
              lineHeight="100%"
              color="black"
            >
              Possible Duplicate Detected
            </Text>
            <Text
              size="md"
              lineHeight="100%"
              color="neutral.700"
              fontWeight={400}
              width="full"
            >
              An existing ticket for{' '}
              <Text as="span" fontWeight={700}>
                Air Handling Unit 03
              </Text>{' '}
              reported on Sept 30, 2025. Creating another may cause duplicate
              tracking.
            </Text>
          </VStack>
        </HStack>

        <VStack
          spacing="28px"
          alignItems="flex-end"
          pl="32px"
          height="inherit"
          justifyContent="space-between"
          position="relative"
          zIndex={10}
          whiteSpace="nowrap"
        >
          <Text
            lineHeight="100%"
            fontWeight={700}
            color="#0366EF"
            cursor="pointer"
            onClick={onOpen}
          >
            View Similar Ticket
          </Text>
          <Text
            lineHeight="100%"
            fontWeight={700}
            color="#0366EF"
            cursor="pointer"
            // onClick={onOpen}
          >
            Proceed Anyway
          </Text>
        </VStack>
      </HStack>
      <TicketDrawerWrapper
        isOpen={isOpen}
        onClose={onDrawerClose}
        data={ticket}
        category="new"
        action="view"
      />
    </Box>
  );
};

export default DuplicateDetectedAlert;
