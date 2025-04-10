import { Flex, SimpleGrid, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useState } from 'react';
import SectionInfo from '../../Common/SectionInfo';
import AccordionFeature from '../../Common/AccordionFeature';

const rolesSolutionItems = [
  {
    title: 'For Managers',
    content:
      'Use predictive analytics, cost-saving insights, and compliance tracking to drive long-term business growth and make strategic, data-driven decisions with confidence.',
  },
  {
    title: 'For Field Teams',
    content:
      'Use predictive analytics, cost-saving insights, and compliance tracking to drive long-term business growth and make strategic, data-driven decisions with confidence.',
  },
  {
    title: 'For C-level Executives',
    content:
      'Use predictive analytics, cost-saving insights, and compliance tracking to drive long-term business growth and make strategic, data-driven decisions with confidence.',
  },
];
const RoleSolution = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  return (
    <Flex justifyContent="center" width="full">
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="center"
        pt={{ base: '107px', lg: '247px' }}
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        position="relative"
        direction="column"
        gap="60px"
      >
        <SimpleGrid gap="40px" width="full" columns={{ base: 1, lg: 2 }}>
          <VStack width="full" spacing="60px">
            <SectionInfo
              badgeText="A platform for everyone"
              heading={[
                'Solutions for',
                ['Every Role'],
                'in Your Organization',
              ]}
              headingStyles={{ width: 'full' }}
              description="Invent3Pro is designed to meet the needs of every stakeholder—whether you're leading strategy, managing operations, or working in the field. Discover how we empower each title."
              descriptionStyles={{ mt: '16px' }}
            />
            <AccordionFeature
              items={rolesSolutionItems}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              showButton
            />
          </VStack>
          <Flex width="full" height="full" position="relative">
            <Image src="/role-1.png" alt="title" fill />
          </Flex>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default RoleSolution;
