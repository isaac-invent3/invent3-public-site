'use client'; // Error boundaries must be Client Components
import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function NotFound() {
  const router = useRouter();
  const session = useSession();
  return (
    <Flex
      width="full"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <VStack
        width="full"
        maxW={{ base: '90%', md: '555px' }}
        spacing={{ base: '16px', md: '24px' }}
      >
        <VStack spacing={{ base: '16px', md: '32px' }}>
          <Flex
            position="relative"
            width={{ base: '278px', md: '555px' }}
            height={{ base: '108px', md: '208px' }}
          >
            <Image src={'/oops.png'} fill alt="oops-image" />
          </Flex>
          <Heading
            color="primary.500"
            fontSize={{ base: '24px', md: '32px' }}
            lineHeight={{ base: '32px', md: '40px' }}
            letterSpacing="0.04em"
            textAlign="center"
          >
            404 - PAGE NOT FOUND
          </Heading>
        </VStack>
        <VStack spacing={{ base: '16px', md: '24px' }}>
          <Text
            fontSize={{ base: '14px', md: '16px' }}
            lineHeight={{ base: '20px', md: '24px' }}
            letterSpacing="0.04em"
            color="primary.accent"
            textAlign="center"
            maxW="555px"
          >
            The page you're looking for doesn’t exist or has been moved. Let’s
            get you back on track!
          </Text>
          <Button
            customStyles={{ width: 'max-content' }}
            handleClick={() => router.push(session?.data ? '/dashboard' : '/')}
          >
            Go to Homepage
          </Button>
        </VStack>
      </VStack>
    </Flex>
  );
}
