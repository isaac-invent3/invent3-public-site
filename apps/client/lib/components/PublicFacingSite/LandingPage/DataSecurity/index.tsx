import {
  Flex,
  FlexProps,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import Image from 'next/image';
import React from 'react';

const info = [
  {
    title: 'End-to-End Encryption',
    subtitle:
      'Uses AES-256 encryption and SSL/TLS protocols to secure sensitive asset information.',
  },
  {
    title: 'Enterprise Active Directory Authentication',
    subtitle:
      'Supports MFA via authenticator apps, email, or SMS verification.',
  },
  {
    title: 'Role-Based Access Control (RBAC)',
    subtitle:
      'Ensure only authorized personnel can view, edit, or manage asset data.',
  },
  {
    title: 'Compliance with Global Standards',
    subtitle:
      'Adheres to ISO 27001, SOC 2, GDPR, and other industry standards.',
  },
];

const DataSecurity = ({ customStyles }: { customStyles?: FlexProps }) => {
  return (
    <Flex
      justifyContent="center"
      width="full"
      background="linear-gradient(180deg, rgba(255, 211, 97, 0) 27.71%, rgba(255, 211, 97, 0.2) 140.78%)"
    >
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="center"
        pt={{ base: '107px', lg: '247px' }}
        pb={{ base: '56px', lg: '50px' }}
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        position="relative"
        direction="column"
        gap={{ base: '56px', lg: '170px' }}
        {...customStyles}
      >
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          gap={{ base: '107px', lg: '189px' }}
        >
          <Flex
            position="relative"
            width="full"
            maxW={{ base: '351px', lg: '501px' }}
            height={{ base: '237px', lg: '333px' }}
          >
            <Image src="/data-security.svg" alt="data security" fill />
          </Flex>
          <Flex direction="column">
            <Text
              py="12px"
              px="16px"
              color="primary.500"
              bgColor="neutral.250"
              rounded="full"
              width="max-content"
            >
              Data Security
            </Text>
            <Heading
              fontWeight={800}
              fontSize={{ base: '24px', md: '40px' }}
              lineHeight={{ base: '28.51px', md: '47.52px' }}
              color="black"
              mt="24px"
            >
              Enterprise-Grade{' '}
              <Heading
                as="span"
                color="#B279A2"
                fontWeight={800}
                fontSize={{ base: '24px', md: '40px' }}
                lineHeight={{ base: '28.51px', md: '47.52px' }}
              >
                Security & Compliance
              </Heading>
            </Heading>
            <Text
              fontSize={{ base: '14px', md: '16px' }}
              lineHeight={{ base: '20px', md: '24px' }}
              color="primary.accent"
              fontWeight={400}
              mt={{ base: '24px', lg: '40px' }}
            >
              Your data is our top priority. Invent3Pro is built with robust
              security protocols, ensuring full compliance with global standards
              while protecting your most valuable assets.
            </Text>
          </Flex>
        </Flex>
        <VStack width="full" spacing="110px">
          <SimpleGrid
            width="full"
            columns={{ base: 1, sm: 2, lg: 4 }}
            gap="40px"
          >
            {info.map((item, index) => (
              <VStack spacing="24px" key={index} alignItems="flex-start">
                <Heading
                  fontWeight={800}
                  fontSize={{ base: '16px', md: '20px' }}
                  lineHeight="100%"
                  color="black"
                >
                  {item.title}
                </Heading>
                <Text
                  fontSize={{ base: '14px', md: '16px' }}
                  lineHeight={{ base: '20px', md: '24px' }}
                  color="#515151"
                  fontWeight={400}
                >
                  {item.subtitle}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
          <Button
            customStyles={{
              width: { base: 'full', lg: '233px' },
            }}
          >
            Learn More About Our Security
          </Button>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default DataSecurity;
