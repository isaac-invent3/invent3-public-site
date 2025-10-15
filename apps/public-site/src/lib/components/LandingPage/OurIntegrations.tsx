import { Flex, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../Common/SectionInfo';

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
        <SectionInfo
          badgeText="Our Integrations"
          heading={[['Seamlessly Connect'], 'with the Tools You Already Use']}
          description=" Invent3Pro integrates effortlessly with your existing business
            systems—ensuring a unified, data-driven workflow. No disruptions,
            just seamless connectivity."
          containerStyles={{
            spacing: '24px',
          }}
          headingPrimaryColor="white"
          descriptionStyles={{ color: 'white' }}
        />
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
