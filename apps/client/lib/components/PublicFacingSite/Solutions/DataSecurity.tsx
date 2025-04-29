import {
  Flex,
  FlexProps,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import SectionInfo from '../Common/SectionInfo';

const info = [
  {
    title: 'End-to-End Encryption',
    subtitle: 'Your data is protected at every stage.',
  },
  {
    title: 'Audit Logs & Monitoring',
    subtitle: 'Track all system activities for compliance and security',
  },
  {
    title: 'Role-Based Access Control (RBAC)',
    subtitle: 'Ensure the right people access the right data.',
  },
  {
    title: 'Regulatory Compliance',
    subtitle: 'Align with GDPR, ISO 27001, and industry standards.',
  },
];

const DataSecurity = ({ customStyles }: { customStyles?: FlexProps }) => {
  return (
    <Flex justifyContent="center" width="full">
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="center"
        pt={{ base: '136px', lg: '176px' }}
        pb={{ base: '56px', lg: '50px' }}
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        position="relative"
        direction="column"
        gap={{ base: '64px', lg: '86px' }}
        {...customStyles}
      >
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          gap="107px"
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
            badgeText="Security and Compliance"
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
        </VStack>
      </Flex>
    </Flex>
  );
};

export default DataSecurity;
