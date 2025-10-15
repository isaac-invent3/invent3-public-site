import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../Common/SectionInfo';
import Image from 'next/image';
import { SlantedForwardIcon } from '@/lib/components/CustomIcons';

const Innovation = () => {
  return (
    <Flex justifyContent="center" width="full" bgColor="primary.500">
      <VStack
        width="full"
        alignItems="center"
        py={{ base: '27px', lg: '56px' }}
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        position="relative"
        spacing={{ base: '24px', lg: '66px' }}
      >
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing={{ base: '24px', lg: '40px' }}
        >
          <Heading
            fontWeight={800}
            fontSize={{ base: '24px', md: '40px' }}
            lineHeight={{ base: '28.51px', md: '47.52px' }}
            color="secondary.purple.500"
            width={{ base: 'full', lg: '60%' }}
          >
            Innovation{' '}
            <Heading
              as="span"
              fontWeight={800}
              fontSize={{ base: '24px', md: '40px' }}
              lineHeight={{ base: '28.51px', md: '47.52px' }}
              color="white"
            >
              at the Core
            </Heading>
            <Heading
              fontWeight={800}
              fontSize={{ base: '24px', md: '40px' }}
              lineHeight={{ base: '28.51px', md: '47.52px' }}
              color="white"
            >
              AI & Automation That Works for You
            </Heading>
          </Heading>
          <Text
            fontWeight={400}
            fontSize="16px"
            lineHeight="24px"
            color="#EBEBEB"
            width={{ base: 'full', lg: '40%' }}
          >
            With cutting-edge AI and machine learning capabilities, Invent3Pro
            turns complex data into actionable intelligence, helping you make
            proactive decisions that drive growth.
          </Text>
        </Stack>
        <Grid width="full" templateColumns="repeat(3, 1fr)" gap="24px">
          <GridItem colSpan={{ base: 3, lg: 1 }} width="full">
            <Flex
              width="full"
              height="329px"
              position="relative"
              rounded="16px"
              overflow="hidden"
            >
              <Image src="/innovation-1.png" fill alt="inovation-image-1" />
            </Flex>
          </GridItem>
          <GridItem colSpan={{ base: 3, lg: 2 }} width="full">
            <Flex
              width="full"
              height="329px"
              bgImage="/innovation-2.png"
              bgSize="cover"
              rounded="16px"
              padding="16px"
              direction="column"
              justifyContent="space-between"
            >
              <Flex width="full" justifyContent="flex-end">
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  width="86px"
                  height="86px"
                  rounded="full"
                  bgColor="white"
                  direction="column"
                >
                  <Icon as={SlantedForwardIcon} boxSize="50px" color="black" />
                </Flex>
              </Flex>
              <VStack
                bgColor="white"
                rounded="8px"
                spacing="8px"
                px="12px"
                py="8px"
                width="max-content"
                alignItems="flex-start"
              >
                <Text color="primary.500" fontWeight={800} size="md">
                  Automated Innovation
                </Text>
                <Text fontWeight={400} color="primary.accent" maxW="176px">
                  Invent3Pro turns complex data into actionable intelligence
                </Text>
              </VStack>
            </Flex>
          </GridItem>
        </Grid>
      </VStack>
    </Flex>
  );
};

export default Innovation;
