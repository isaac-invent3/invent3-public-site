import { Flex, Stack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { QUICK_LINKS, SUPPORT_LINKS } from './data';
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
          Invent3 is an AI-powered physical asset and facility management
          platform that optimizes efficiency.
        </Text>
      </VStack>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '24px', md: '80px' }}
        alignItems="flex-start"
      >
        <VStack alignItems="flex-start" spacing="16px">
          <Text
            color="black"
            fontWeight={700}
            fontSize="18px"
            lineHeight="24px"
            whiteSpace="nowrap"
          >
            Quick Links
          </Text>
          {QUICK_LINKS.map((item) => (
            <Link href={item.href} passHref key={item.label}>
              <Text color="black" size="md" whiteSpace="nowrap">
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
            whiteSpace="nowrap"
          >
            Support
          </Text>
          {SUPPORT_LINKS.map((item) => (
            <Link href={item.href} passHref key={item.label}>
              <Text color="black" size="md" whiteSpace="nowrap">
                {item.label}
              </Text>
            </Link>
          ))}
        </VStack>
      </Stack>
    </Stack>
  );
};

export default SectionOne;
