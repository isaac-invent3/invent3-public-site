import { Flex } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';
import SectionInfo from '../Common/SectionInfo';

const CTA = () => {
  return (
    <Flex justifyContent="center" width="full" mt={{ lg: '50px' }}>
      <Flex
        width="full"
        alignItems="flex-start"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        position="relative"
      >
        <Flex
          direction="row"
          bgColor="primary.500"
          py={{ base: '70px', lg: '56px' }}
          px={{ base: '16px', lg: '56px' }}
          width="full"
          rounded={{ base: '8px', lg: '16px' }}
          position="relative"
          justifyContent="center"
        >
          <SectionInfo
            heading={[
              'Then',
              ['Invent3.ai'],
              'Promise; Reliable, Secure, and Intelligent',
            ]}
            headingStyles={{
              width: 'full',
              maxW: { lg: '628px' },
              textAlign: { base: 'center', lg: 'left' },
            }}
            description={
              'We provide more than software—we deliver confidence. Invent3Pro ensures top-tier security, regulatory compliance, and AI-driven efficiency, making it the trusted choice for industry leaders.'
            }
            descriptionStyles={{
              textAlign: { base: 'center', lg: 'left' },
              color: 'white',
              maxW: '520px',
            }}
            containerStyles={{
              alignItems: { base: 'center', lg: 'flex-start' },
              spacing: '32px',
            }}
            headingPrimaryColor="white"
          />
          <Flex
            height={{ lg: '350px', xl: '390px' }}
            position="absolute"
            top={{ lg: -10, xl: '-20' }}
            right={{ lg: 30 }}
            display={{ base: 'none', lg: 'flex' }}
          >
            <Flex position="relative" width="295px" height="full">
              <Image src="/industry-lady.png" alt="cta-image" fill />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CTA;
