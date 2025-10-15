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
import SectionInfo from '../../Common/SectionInfo';

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
          width="full"
          justifyContent="space-between"
        >
          <Flex
            position="relative"
            width={{ base: 'full', lg: '50%' }}
            maxW={{ base: '351px', lg: '501px' }}
            height={{ base: '237px', lg: '333px' }}
          >
            <Image src="/data-security.svg" alt="data security" fill />
          </Flex>
          <SectionInfo
            badgeText="Data Security"
            heading={['Enterprise-Grade', ['Security & Compliance']]}
            description="We prioritize data protection, ensuring your business meets regulatory requirements while keeping information secure."
            containerStyles={{
              spacing: '24px',
              alignItems: 'flex-start',
              width: { base: 'full', lg: '50%' },
            }}
            descriptionStyles={{ mt: '16px', width: 'full' }}
          />
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
          {/* <Button
            customStyles={{
              width: { base: 'full', lg: '233px' },
            }}
          >
            Learn More About Our Security
          </Button> */}
        </VStack>
      </Flex>
    </Flex>
  );
};

export default DataSecurity;
