import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  Image,
} from '@chakra-ui/react';
import React from 'react';

const Statistics = () => {
  return (
    <Flex justifyContent="center" width="full">
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="center"
        pt={{ base: '36px', lg: '89px' }}
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        position="relative"
        direction="column"
        gap="60px"
      >
        <VStack width="full" spacing={{ base: '32px', lg: '24px' }}>
          <Text
            py="12px"
            px="16px"
            color="primary.500"
            bgColor="neutral.250"
            rounded="full"
          >
            Statistics
          </Text>
          <Heading
            fontWeight={800}
            fontSize={{ base: '24px', md: '40px' }}
            lineHeight={{ base: '28.51px', md: '47.52px' }}
            color="primary.500"
            maxW="686px"
            width="full"
            textAlign="center"
          >
            The{' '}
            <Heading
              as="span"
              color="#B279A2"
              fontWeight={800}
              fontSize={{ base: '24px', md: '40px' }}
              lineHeight={{ base: '28.51px', md: '47.52px' }}
            >
              Numbers Speak{' '}
            </Heading>
            for Themselves
          </Heading>
        </VStack>

        <VStack width="full" spacing="24px" alignItems="flex-start">
          <Grid
            templateColumns="repeat(4, 1fr)"
            gap="24px"
            width="full"
            minH="285px"
          >
            <GridItem colSpan={{ base: 4, lg: 2 }} height="full" minH="285px">
              <Flex
                width="full"
                bgImage="/statistics-1.png"
                height="full"
                position="relative"
                bgSize="contain"
                rounded="12px"
                overflow="hidden"
                px={{ base: '16px', lg: '32px' }}
                pb={{ base: '19px', lg: '27px' }}
                alignItems="flex-end"
              >
                <Flex
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  background="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 76.49%)"
                />
                <Text
                  position="relative"
                  zIndex={999}
                  color="white"
                  fontSize={{ base: '14px', lg: '18px' }}
                  lineHeight="140%"
                  maxW="548px"
                >
                  Invent3.ai delivers real results—optimizing asset performance,
                  reducing costs, and driving operational success. See how our
                  platform is making an impact
                </Text>
              </Flex>
            </GridItem>
            <GridItem colSpan={{ base: 2, lg: 1 }} height="full" minH="215px">
              <VStack
                width="full"
                rounded="12px"
                bgImage="/statistics-2.png"
                height="full"
                bgSize="contain"
                px={{ base: '16px', lg: '24px' }}
                pt={{ base: '24px', lg: '31px' }}
                pb={{ base: '8px', lg: '21px' }}
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <VStack alignItems="flex-start">
                  <Heading
                    fontSize={{ base: '28px', md: '40px' }}
                    color="primary.500"
                    fontWeight={800}
                  >
                    99.9%
                  </Heading>
                  <Text color="primary.500" fontWeight={800}>
                    System uptime
                  </Text>
                </VStack>
                <Text
                  color="primary.500"
                  fontWeight={700}
                  fontSize={{ base: '12px', lg: '14px' }}
                  lineHeight="20px"
                  maxW="249px"
                >
                  Reliable and always available when you need it.
                </Text>
              </VStack>
            </GridItem>
            <GridItem colSpan={{ base: 2, lg: 1 }} height="full" minH="215px">
              <VStack
                width="full"
                height="full"
                justifyContent="flex-end"
                spacing="16px"
                alignItems="flex-start"
                pb={{ lg: '16px' }}
              >
                <VStack alignItems="flex-start">
                  <Heading
                    fontSize={{ base: '28px', md: '40px' }}
                    color="primary.500"
                    fontWeight={800}
                  >
                    25%
                  </Heading>
                  <Text color="primary.500" fontWeight={800}>
                    in Asset Utilization
                  </Text>
                </VStack>
                <Text
                  color="primary.500"
                  fontWeight={700}
                  fontSize={{ base: '12px', lg: '14px' }}
                  lineHeight="20px"
                >
                  Optimize usage and extend the lifecycle of critical assets.
                </Text>
              </VStack>
            </GridItem>
          </Grid>
          <Grid
            templateColumns="repeat(4, 1fr)"
            gap="24px"
            width="full"
            minH="285px"
          >
            <GridItem colSpan={{ base: 4, lg: 1 }} height="full" minH="215px">
              <VStack
                width="full"
                rounded="12px"
                bgImage="/statistics-3.png"
                height="full"
                bgSize="contain"
                px={{ base: '16px', lg: '24px' }}
                pt={{ base: '29px', lg: '36px' }}
                pb={{ base: '12px', lg: '23px' }}
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <VStack alignItems="flex-start">
                  <Heading
                    fontSize={{ base: '28px', md: '40px' }}
                    color="white"
                    fontWeight={800}
                  >
                    40%
                  </Heading>
                  <Text color="white" fontWeight={800}>
                    System uptime
                  </Text>
                </VStack>
                <Text
                  color="white"
                  fontWeight={700}
                  fontSize={{ base: '12px', lg: '14px' }}
                  lineHeight="20px"
                  maxW="249px"
                >
                  Prevent unexpected failures with predictive maintenance
                </Text>
              </VStack>
            </GridItem>
            <GridItem colSpan={{ base: 4, lg: 3 }} height="full" minH="215px">
              <VStack
                width="full"
                rounded="12px"
                bgColor="#5379F6"
                height="full"
                px={{ base: '16px', lg: '24px' }}
                pt={{ base: '29px', lg: '36px' }}
                pb={{ base: '12px', lg: '23px' }}
                justifyContent="space-between"
                alignItems="flex-start"
                position="relative"
              >
                <Image
                  src={'/statistics-4.svg'}
                  position="absolute"
                  bottom={0}
                  right={0}
                  display={{ base: 'none', lg: 'initial' }}
                />
                <Image
                  src={'/statistics-mobile-4.svg'}
                  position="absolute"
                  bottom={0}
                  right={0}
                  display={{ lg: 'none' }}
                />
                <VStack alignItems="flex-start">
                  <Heading
                    fontSize={{ base: '28px', md: '40px' }}
                    color="white"
                    fontWeight={800}
                  >
                    60%
                  </Heading>
                  <Text color="white" fontWeight={800}>
                    System uptime
                  </Text>
                </VStack>
                <Text
                  color="white"
                  fontWeight={700}
                  fontSize={{ base: '12px', lg: '14px' }}
                  lineHeight="20px"
                  maxW={{ base: '156px', md: '312px' }}
                >
                  Streamlined ticketing and automation reduce delays.
                </Text>
              </VStack>
            </GridItem>
          </Grid>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default Statistics;
