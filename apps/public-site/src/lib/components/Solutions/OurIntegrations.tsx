import { Flex, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../Common/SectionInfo';

const integrations = [
  'ERP & Finance Systems',
  'HR & Workforce Management',
  'IoT & Smart Sensors',
  'Communication & Collaboration',
];
const OurIntegrations = () => {
  return (
    <Flex
      justifyContent="center"
      width="full"
      bgColor="primary.500"
      position="relative"
      mt={{ base: '130px', lg: '120px' }}
    >
      <Image
        src="/solution-integration.png"
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
          heading={['Works with the', ['tools'], 'You Already Use']}
          description="When it comes to asset and facility management, Invent3Pro is ahead of the curve. Here’s why businesses trust us over traditional solutions:"
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
