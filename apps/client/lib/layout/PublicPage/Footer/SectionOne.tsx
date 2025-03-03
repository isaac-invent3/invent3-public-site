import { Flex, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { COMPANY_LINK, LEARN_LINK } from './data';
import Link from 'next/link';

const SectionOne = () => {
  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      width="full"
      spacing={{ base: '24px', md: '40px', lg: '80px' }}
      alignItems="flex-start"
    >
      <VStack alignItems="flex-start" spacing={{ base: '16px', md: '24px' }}>
        <Flex
          position="relative"
          height={{ base: '37px', lg: '55px' }}
          width={{ base: '125px', lg: '181px' }}
          flexShrink={0}
        >
          <Image src="/logo-blue.svg" alt="logo" fill />
        </Flex>
        <Text
          color="black"
          size="md"
          lineHeight="24px"
          fontWeight={400}
          width={{ base: 'full', lg: '349px' }}
          maxW="349px"
        >
          Invent3 is an AI-powered asset management platform that optimizes
          efficiency, automates workflows, ensures compliance, and provides
          real-time insights for smarter decision-making.
        </Text>
      </VStack>
      <HStack spacing={{ base: '24px', md: '80px' }} alignItems="flex-start">
        <VStack alignItems="flex-start" spacing="16px">
          <Text
            color="black"
            fontWeight={700}
            fontSize="18px"
            lineHeight="24px"
          >
            Company
          </Text>
          {COMPANY_LINK.map((item) => (
            <Link href={item.href} passHref key={item.label}>
              <Text color="black" size="md">
                {item.label}
              </Text>
            </Link>
          ))}
        </VStack>
        <VStack alignItems="flex-start" spacing="16px">
          <Text
            color="black"
            fontWeight={700}
            fontSize="18px"
            lineHeight="24px"
          >
            Learn
          </Text>
          {LEARN_LINK.map((item) => (
            <Link href={item.href} passHref key={item.label}>
              <Text color="black" size="md">
                {item.label}
              </Text>
            </Link>
          ))}
        </VStack>
      </HStack>
    </Stack>
  );
};

export default SectionOne;
