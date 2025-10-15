import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import Image from 'next/image';
import React from 'react';

const Explore = () => {
  return (
    <Flex justifyContent="center" width="full" bgColor="#D2FEFD33">
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        pt={{ base: '41px', lg: '88px' }}
        pb={{ base: '37px', lg: '88px' }}
        maxW="1440px"
        position="relative"
        direction={{ base: 'column', lg: 'row' }}
        gap={{ base: '32px', lg: '87px' }}
      >
        <VStack
          width={{ base: 'full', lg: '45%' }}
          spacing="32px"
          alignItems="flex-start"
        >
          <VStack width="full" alignItems="flex-start" spacing="24px">
            <Heading
              fontWeight={800}
              fontSize={{ base: '24px', md: '40px' }}
              lineHeight={{ base: '28.51px', md: '47.52px' }}
              color="black"
              maxW="537px"
            >
              We are{' '}
              <Heading
                as="span"
                color="#B279A2"
                fontWeight={800}
                fontSize={{ base: '24px', md: '40px' }}
                lineHeight={{ base: '28.51px', md: '47.52px' }}
              >
                redefining the boundaries
              </Heading>{' '}
              of asset management
            </Heading>
            <Text
              fontSize={{ base: '14px', md: '16px' }}
              lineHeight={{ base: '20px', md: '24px' }}
              color="neutral.600"
              fontWeight={400}
            >
              We are revolutionizing asset management by pushing past
              traditional limits, integrating cutting-edge technology, and
              optimizing efficiency. Our approach enhances visibility,
              streamlines operations, and maximizes asset value. With smart
              automation, predictive insights, and seamless workflows, we
              empower businesses to manage assets proactively, reduce downtime,
              and drive long-term success effortlessly.
            </Text>
          </VStack>
          <Button
            customStyles={{
              width: '203px',
              display: { base: 'none', sm: 'flex' },
            }}
          >
            Explore Now
          </Button>
        </VStack>
        <Flex
          height={{ base: '306px', md: '500px', lg: '490px' }}
          width={{ base: 'full', lg: '55%' }}
          bgColor="#FFFFFF"
        >
          <Flex
            position="relative"
            flex={1}
            mt={{ base: '27px', lg: '50px' }}
            ml={{ base: '43px', lg: '77px' }}
          >
            <Image src="/explore-dashboard.png" alt="dashboard" fill />
          </Flex>
        </Flex>
        <Button
          customStyles={{
            display: { base: 'flex', sm: 'none' },
          }}
        >
          Explore Now
        </Button>
      </Flex>
    </Flex>
  );
};

export default Explore;
