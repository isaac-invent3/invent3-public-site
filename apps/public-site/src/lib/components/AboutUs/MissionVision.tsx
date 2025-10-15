import { Flex, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const info = [
  {
    title: 'Vision',
    subtitle:
      'To redefine asset and facility management through AI-driven automation, empowering businesses to operate smarter, faster, and more efficiently.',
  },
  {
    title: 'Mission',
    subtitle:
      'We help organizations maximize asset value, reduce operational risks, and enhance efficiency by providing intelligent, automated, and data-driven management solutions.',
  },
];
const MissionVision = () => {
  return (
    <Flex justifyContent="center" width="full">
      <SimpleGrid
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        pt={{ base: '76px', lg: '260px' }}
        maxW="1440px"
        position="relative"
        columns={{ base: 1, md: 2 }}
        gap="24px"
      >
        {info.map((item, index) => (
          <VStack
            width="full"
            p="24px"
            pb={{ base: '24px', lg: '48px' }}
            key={index}
            alignItems="flex-start"
            bgColor="#F3F3F3"
            rounded="4px"
            height="full"
            spacing="24px"
          >
            <Text
              py="12px"
              px={{ base: '33px', lg: '28px' }}
              color="primary.500"
              bgColor="neutral.250"
              rounded="full"
              width="max-content"
            >
              Our {item.title}
            </Text>
            <Heading
              fontWeight={800}
              fontSize={{ base: '28px', md: '40px' }}
              lineHeight="100%"
              color="primary.500"
            >
              Our{' '}
              <Heading
                as="span"
                color="#B279A2"
                fontWeight={800}
                fontSize={{ base: '28px', md: '40px' }}
                lineHeight="100%"
              >
                {item.title}
              </Heading>
            </Heading>
            <Text
              fontSize={{ base: '14px', md: '16px' }}
              lineHeight={{ base: '18px', md: '24px' }}
              color="primary.accent"
              fontWeight={{ base: 500, lg: 400 }}
            >
              {item.subtitle}
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default MissionVision;
