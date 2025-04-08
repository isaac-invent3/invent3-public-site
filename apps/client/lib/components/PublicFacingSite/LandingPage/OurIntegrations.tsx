import { Flex, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const integrations = [
  'CRM & Service Management',
  'Financial & Accounting Software',
  'IoT',
  'Fleet & Logistics Management',
  'ERP Systems',
  'BMS',
  'Cloud Storage & Security',
];
const OurIntegrations = () => {
  return (
    <Flex
      justifyContent="center"
      width="full"
      bgColor="primary.500"
      position="relative"
      mt={{ base: '107px', lg: '137px' }}
    >
      <Image
        src="/integration-bg.png"
        position="absolute"
        height={{ lg: 'full' }}
        right={0}
      />
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="flex-end"
        py="100px"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        position="relative"
        direction={{ base: 'column', lg: 'row' }}
        gap={{ base: '60px', lg: '104px' }}
      >
        <VStack width="full" spacing="32px" alignItems="flex-start">
          <Text
            py="12px"
            px="16px"
            color="primary.500"
            bgColor="neutral.250"
            rounded="full"
          >
            Our Integrations
          </Text>
          <Heading
            fontWeight={800}
            fontSize={{ base: '24px', md: '40px' }}
            lineHeight={{ base: '28.51px', md: '47.52px' }}
            color="white"
            maxW="537px"
          >
            <Heading
              as="span"
              color="#B279A2"
              fontWeight={800}
              fontSize={{ base: '24px', md: '40px' }}
              lineHeight={{ base: '28.51px', md: '47.52px' }}
            >
              Seamlessly Connect{' '}
            </Heading>
            with the Tools You Already Use
          </Heading>
          <Text
            fontSize={{ base: '14px', md: '16px' }}
            lineHeight={{ base: '20px', md: '24px' }}
            color="neutral.250"
            fontWeight={400}
            maxW="565px"
          >
            Invent3Pro integrates effortlessly with your existing business
            systems—ensuring a unified, data-driven workflow. No disruptions,
            just seamless connectivity.
          </Text>
        </VStack>
        <HStack flexWrap="wrap" spacing="24px">
          {integrations.map((item, index) => (
            <Text
              key={index}
              border="1px solid #838383"
              bgColor="#FFFFFF1A"
              rounded="full"
              py="16px"
              px="24px"
              fontSize={{ base: '12px', lg: '14px' }}
              fontWeight={700}
              color="white"
            >
              {item}
            </Text>
          ))}
        </HStack>
      </Flex>
    </Flex>
  );
};

export default OurIntegrations;
