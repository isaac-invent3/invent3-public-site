import { Flex, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../../Common/SectionInfo';
import { Button } from '@repo/ui/components';
import Image from 'next/image';

interface CTAProps {
  heading: (string | string[])[];
  description: string;
}
const CTA = (props: CTAProps) => {
  const { heading, description } = props;
  return (
    <Flex
      justifyContent="center"
      width="full"
      mt={{ base: '80px', lg: '154px' }}
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
          direction="row"
          bgColor="primary.500"
          py={{ base: '70px', lg: '56px' }}
          px={{ base: '16px', lg: '56px' }}
          width="full"
          rounded={{ base: '8px', lg: '16px' }}
          position="relative"
          justifyContent="center"
        >
          <Flex
            height="441px"
            position="absolute"
            top={{ lg: -9, xl: '-20' }}
            left={{ lg: 10 }}
            display={{ base: 'none', lg: 'flex' }}
          >
            <Flex position="relative" width="295px" height="full">
              <Image src="/cta-lady.png" alt="cta-image" fill />
            </Flex>
          </Flex>
          <Flex
            direction="column"
            gap={{ base: '42px', lg: '48px' }}
            ml={{ lg: '395px' }}
          >
            <SectionInfo
              heading={heading}
              headingStyles={{
                width: 'full',
                maxW: { lg: '690px' },
                textAlign: { base: 'center', lg: 'left' },
              }}
              description={description}
              descriptionStyles={{
                textAlign: { base: 'center', lg: 'left' },
                color: 'white',
              }}
              containerStyles={{
                alignItems: { base: 'center', lg: 'flex-start' },
                spacing: '32px',
              }}
              headingPrimaryColor="white"
            />
            <Stack
              direction={{ base: 'column', lg: 'row' }}
              spacing={{ base: '16px', lg: '32px' }}
            >
              <Button
                customStyles={{
                  width: { base: 'full', lg: '220px' },
                  bgColor: 'white',
                  color: 'primary.500',
                  _hover: { bgColor: 'white', color: 'primary.500' },
                }}
                href="/contact-us"
              >
                Request a free Demo
              </Button>
              <Button
                customStyles={{
                  width: { base: 'full', lg: '220px' },
                  borderColor: 'white',
                  color: 'white',
                  _hover: { bgColor: 'white', color: 'primary.500' },
                }}
                variant="outline"
              >
                Talk to Sales
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CTA;
