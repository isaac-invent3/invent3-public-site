import { Flex, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../Common/SectionInfo';
import Image from 'next/image';

const industries = [
  'Healthcare',
  'Retail & Warehousing',
  'Banking & Finance',
  'Transportation',
  'Real Estate',
  'Corporate & Office Spaces',
  'Logistics',
];

const CustomTailored = () => {
  return (
    <Flex justifyContent="center" width="full">
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        py={{ base: '80px', lg: '120px' }}
        maxW="1440px"
        direction="column"
        gap={{ base: '40px', lg: '60px' }}
      >
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="24px">
          <SectionInfo
            badgeText="Built for all Industries"
            heading={[['Custom-Tailored'], 'for Your Industry']}
            containerStyles={{
              spacing: '32px',
              justifyContent: 'space-between',
              height: 'full',
            }}
          />
          <Text size="lg" fontWeight={400}>
            From healthcare to finance, logistics to real estate, our platform
            is equipped with specialized tools to meet sector-specific
            challenges, ensuring maximum efficiency and compliance.
          </Text>
        </SimpleGrid>

        <SimpleGrid
          width="full"
          bgColor="primary.500"
          rounded="10px"
          p="24px"
          columns={{ base: 1, lg: 2 }}
          spacing="24px"
        >
          <VStack spacing="32px" alignItems="flex-start" width="full">
            <SectionInfo
              heading={['Built for all', ['Industries']]}
              headingPrimaryColor="white"
            />
            <HStack width="full" flexWrap="wrap" spacing="24px">
              {industries.map((item, index) => (
                <Text
                  key={index}
                  bgColor="#E6E6E6"
                  py="12px"
                  px="24px"
                  rounded="full"
                  size="lg"
                >
                  {item}
                </Text>
              ))}
            </HStack>
          </VStack>
          <Flex
            width="full"
            height="full"
            minH="423px"
            position="relative"
            bgColor="white"
            rounded="10px"
          >
            <Image src="/industries-1.svg" alt="architects" fill />
          </Flex>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default CustomTailored;
