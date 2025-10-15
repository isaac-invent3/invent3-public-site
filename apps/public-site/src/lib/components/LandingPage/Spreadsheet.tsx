import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import Image from 'next/image';
import React from 'react';

const Spreadsheet = () => {
  return (
    <Flex justifyContent="center" width="full" bgColor="primary.500">
      <Flex
        width={{ base: 'full', lg: '90%' }}
        justifyContent="space-between"
        alignItems="center"
        py={{ base: '45px', lg: '40px' }}
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        position="relative"
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: '80px', xl: '215px' }}
      >
        <Flex
          position="relative"
          height={{ base: '282px', lg: '305px' }}
          width="full"
          maxW={{ base: '351px', lg: '379px' }}
          flexShrink={0}
        >
          <Image src="/devices.png" alt="devices" fill />
        </Flex>

        <VStack
          width="full"
          spacing={{ base: '32px', lg: '24px' }}
          alignItems="flex-start"
        >
          <Heading
            fontWeight={800}
            fontSize={{ base: '24px', md: '40px' }}
            lineHeight={{ base: '28.51px', md: '47.52px' }}
            color="white"
            maxW="686px"
          >
            Say{' '}
            <Heading
              as="span"
              color="#B279A2"
              fontWeight={800}
              fontSize={{ base: '24px', md: '40px' }}
              lineHeight={{ base: '28.51px', md: '47.52px' }}
            >
              Goodbye{' '}
            </Heading>
            to daunting Spreadsheets
          </Heading>
          <Text
            fontSize={{ base: '14px', md: '16px' }}
            lineHeight={{ base: '20px', md: '24px' }}
            color="neutral.300"
            maxW="632px"
          >
            Cut down on cumbersome manual administration, get the complete
            AI-powered CAFM solution with Invent3Pro for all your physical asset
            and facility management needs
          </Text>
          <Button
            customStyles={{
              width: { base: 'full', md: '175px' },
              bgColor: 'white',
              color: 'primary.500',
              _hover: {
                bgColor: 'white',
                color: 'primary.500',
              },
              _active: {
                bgColor: 'white',
                color: 'primary.500',
              },
            }}
            href="/waitlist"
          >
            Join Waitlist
          </Button>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default Spreadsheet;
