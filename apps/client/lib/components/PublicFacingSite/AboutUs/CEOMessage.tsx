import {
  Avatar,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { VideoPlayIcon } from '../../CustomIcons/PublicFacingSite';

const CEOMessage = () => {
  return (
    <Flex justifyContent="center" width="full">
      <SimpleGrid
        width="full"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        columns={{ base: 1, lg: 2 }}
        gap={{ base: '40px', lg: '80px' }}
        pt="80px"
      >
        <Flex
          width="full"
          height={{ base: '382px', lg: '388px' }}
          rounded={{ base: '8px', lg: '20px' }}
          bgColor="black"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <Icon as={VideoPlayIcon} boxSize="80px" />
          <Text
            color="primary.500"
            bgColor="white"
            py={{ base: '8px', lg: '16px' }}
            px={{ base: '12px', lg: '16px' }}
            rounded="full"
            position="absolute"
            bottom={0}
            left={0}
            ml={{ base: '11px', lg: '24px' }}
            mb={{ base: '10px', lg: '27px' }}
            fontWeight={700}
          >
            Learn About Our Story
          </Text>
        </Flex>
        <VStack
          width="full"
          spacing={{ base: '24px', lg: '71px' }}
          alignItems={{ base: 'center', lg: 'flex-start' }}
        >
          <VStack
            width="full"
            alignItems={{ base: 'center', lg: 'flex-start' }}
            spacing="24px"
          >
            <Heading
              color="primary.500"
              fontSize={{ base: '28px', lg: '40px' }}
              fontWeight={800}
              lineHeight="100%"
            >
              Word From the{' '}
              <Heading
                as="span"
                color="secondary.purple.500"
                fontSize={{ base: '28px', lg: '40px' }}
                fontWeight={800}
                lineHeight="100%"
              >
                CEO
              </Heading>
            </Heading>
            <Text
              fontSize={{ base: '14px', lg: '20px' }}
              lineHeight={{ base: '18px', lg: '32px' }}
              maxW="800px"
              textAlign={{ base: 'center', lg: 'left' }}
              color="primary.accent"
            >
              "At Invent3, we believe asset management should be seamless,
              intelligent, and cost-effective. Our vision is to empower
              businesses with automation, real-time insights, and
              compliance-driven solutions—ensuring assets are optimized,
              maintenance is proactive, and operations run efficiently at all
              times.”
            </Text>
          </VStack>
          <Stack
            spacing="8px"
            direction={{ base: 'column', lg: 'row' }}
            alignItems="center"
          >
            <Avatar
              width={{ base: '60px', lg: '40px' }}
              height={{ base: '60px', lg: '40px' }}
            />
            <Stack
              spacing={{ base: '8px', lg: '4px' }}
              alignItems={{ base: 'center', lg: 'flex-start' }}
            >
              <Text
                size="lg"
                lineHeight="24px"
                color="primary.500"
                fontWeight={800}
              >
                Syl Omope
              </Text>
              <Text
                size="md"
                lineHeight="20px"
                letterSpacing="0.04em"
                color="black"
              >
                Co-Founder & CEO
              </Text>
            </Stack>
          </Stack>
        </VStack>
      </SimpleGrid>
    </Flex>
  );
};

export default CEOMessage;
