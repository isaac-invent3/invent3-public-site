import { Flex, SimpleGrid, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useState } from 'react';
import SectionInfo from '../../Common/SectionInfo';
import AccordionFeature from '../../Common/AccordionFeature';

const keyFeatureItems = [
  {
    title: 'Centralized Asset Management',
    content:
      'Enable seamless operations across branches, headquarters, and remote offices.',
  },
  {
    title: 'Predictive Maintenance',
    content:
      'Enable seamless operations across branches, headquarters, and remote offices.',
  },
  {
    title: 'Regulatory Compliance Tracking',
    content:
      'Enable seamless operations across branches, headquarters, and remote offices.',
  },
  {
    title: 'Incident Reporting & Risk Mitigation',
    content:
      'Enable seamless operations across branches, headquarters, and remote offices.',
  },
  {
    title: 'Multi-Branch Coordination',
    content:
      'Enable seamless operations across branches, headquarters, and remote offices.',
  },
];
const KeyFeatures = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  return (
    <Flex justifyContent="center" width="full">
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="center"
        pt={{ base: '78px', lg: '181px' }}
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        position="relative"
        direction="column"
        gap="60px"
      >
        <SimpleGrid gap="40px" width="full" columns={{ base: 1, lg: 2 }}>
          <VStack width="full" spacing={{ base: '40px', lg: '60px' }}>
            <SectionInfo
              badgeText="Key Features"
              heading={['Key', ['Features'], 'for Banking & Finance']}
              headingStyles={{ width: 'full' }}
            />
            <AccordionFeature
              items={keyFeatureItems}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              showButton
              allowToggle
            />
          </VStack>
          <Flex width="full" justifyContent="center">
            <Flex
              width="full"
              maxW={{ base: '358px', lg: 'full' }}
              height={{ base: '530px', lg: 'full' }}
              position="relative"
            >
              <Image src="/banking-image-1.png" alt="title" fill />
            </Flex>
          </Flex>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default KeyFeatures;
