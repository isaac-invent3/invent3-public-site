import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../Common/SectionInfo';
import Link from 'next/link';

const CTA = () => {
  return (
    <Flex
      justifyContent="center"
      width="full"
      mt={{ base: '80px', lg: '120px' }}
    >
      <Flex
        width="full"
        alignItems="flex-start"
        py={{ base: '27px', lg: '34px' }}
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        position="relative"
      >
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          bgColor="primary.500"
          py={{ base: '67px', lg: '90px' }}
          px={{ base: '24px', lg: '56px' }}
          width="full"
          rounded={{ base: '8px', lg: '16px' }}
          position="relative"
          justifyContent="center"
          alignItems="center"
          gap="60px"
        >
          <SectionInfo
            heading={['Ready to', ['Optimize'], 'Your Operations?']}
            description="Take control of your assets, streamline workflows, and gain actionable insights with Invent3Pro."
            containerStyles={{
              spacing: '32px',
            }}
            headingPrimaryColor="white"
            headingStyles={{ maxW: '546px' }}
            descriptionStyles={{ color: 'white', maxW: '572px' }}
          />
          <Link href="/contact-us">
            <Button
              bgColor="white"
              height="50px"
              rounded="8px"
              width={{ base: 'full', lg: '263px' }}
              color="primary.500"
              fontSize="14px"
              fontWeight={500}
            >
              Get Started Today
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CTA;
