'use client';
import { Flex, Heading, Icon, Text, VStack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { LongRightIcon } from '~/lib/components/CustomIcons';

export default function PermissionDenied() {
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
        maxW={{ base: '90%' }}
        spacing={{ base: '16px', md: '24px' }}
      >
        <VStack spacing={{ base: '16px', md: '32px' }}>
          <Heading
            fontSize={{ base: '40px', md: '104px' }}
            lineHeight="120%"
            letterSpacing="0.04em"
            textAlign="center"
            fontWeight={800}
            bgImage="url('/text-bg.jpg')"
            bgSize="cover"
            bgPos="center"
            bgRepeat="no-repeat"
            bgClip="text"
            sx={{
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Access Denied!
          </Heading>
          <Heading
            color="primary.500"
            fontSize={{ base: '24px', md: '32px' }}
            lineHeight={{ base: '32px', md: '40px' }}
            letterSpacing="0.04em"
            textAlign="center"
            fontWeight={800}
          >
            403 - NO PERMISSION
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
            You don’t have permission to view this page. If you think this is a
            mistake, please contact your administrator.
          </Text>
          <Button
            customStyles={{ width: '195px', color: 'white' }}
            handleClick={() => router.push(session?.data ? '/dashboard' : '/')}
          >
            Go to Homepage
            <Icon as={LongRightIcon} boxSize="16px" ml="16px" />
          </Button>
        </VStack>
      </VStack>
    </Flex>
  );
}
