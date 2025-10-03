import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ROUTES } from '~/lib/utils/constants';

const EscalationAlert = ({ escalationCount }: { escalationCount: number }) => {
  return (
    <HStack
      width="full"
      bgColor="white"
      rounded="8px"
      //   minH="112px"
      py="8px"
      pb="22px"
      px="16px"
      justifyContent="space-between"
      borderLeft="3px solid #D67D00"
      position="relative"
      alignItems="flex-start"
      height="full"
    >
      <Flex
        bgColor="#D67D001A"
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
      />

      <HStack
        spacing="12px"
        position="relative"
        zIndex={9}
        alignItems="flex-start"
      >
        <Flex position="relative" width="32px" height="32px">
          <Image src="/warning2.png" alt="warning_icon" fill />
        </Flex>
        <VStack spacing="10px" alignItems="flex-start" maxW="267px">
          <Text
            fontSize="20px"
            lineHeight="100%"
            fontWeight={700}
            color="#D67D00"
          >
            Escalation Alert!
          </Text>
          <Text color="black" size="lg" lineHeight="100%" fontWeight={400}>
            {escalationCount} Tickets have been escalated due to inactivity
            beyond 48 hours.
          </Text>
        </VStack>
      </HStack>
      <VStack
        height="full"
        alignItems="flex-end"
        justifyContent="space-between"
        position="relative"
        zIndex={9}
      >
        <Text size="lg" color="black" lineHeight="100%" fontWeight={700}>
          Total Escalated: {escalationCount}
        </Text>
        <Link href={`/${ROUTES.TICKETS}`}>
          <Text
            cursor="pointer"
            lineHeight="100%"
            fontWeight={700}
            color="blue.500"
          >
            View Details
          </Text>
        </Link>
      </VStack>
    </HStack>
  );
};

export default EscalationAlert;
