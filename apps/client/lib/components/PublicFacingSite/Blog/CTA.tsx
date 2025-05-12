import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import React from 'react';

const CTA = () => {
  return (
    <Flex justifyContent="center" width="full" mt={{ lg: '50px' }}>
      <SimpleGrid
        width="full"
        alignItems="flex-end"
        bgColor="primary.500"
        rounded="10px"
        py="50px"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        position="relative"
        columns={{ base: 1, lg: 2 }}
        gap={{ base: '40px', lg: '124px' }}
      >
        <VStack spacing="24px" alignItems="flex-start">
          <Heading
            fontWeight={800}
            fontSize={{ base: '24px', md: '40px' }}
            lineHeight={{ base: '28.51px', md: '47.52px' }}
            color="white"
          >
            Stay Ahead with Smart Facility Insights
          </Heading>
          <InputGroup
            alignItems="center"
            minH={{ base: '64px' }}
            width="full"
            display="flex"
          >
            <Input
              type="email"
              placeholder="Your Email"
              fontSize="12px"
              fontWeight={500}
              lineHeight="14.26px"
              bgColor="white"
              color="neutral.800"
              rounded="full"
              pr="130px"
              minH={{ base: '62px' }}
              minW="full"
              _placeholder={{
                color: 'neutral.600',
                fontSize: '16px',
              }}
              outline="none"
              _focusVisible={{
                border: 'none',
              }}
              //   onChange={handleSearchChange} // Use the debounced handler
            />
            <InputRightElement pt={{ base: '23px' }} pr="63px">
              <Button
                customStyles={{
                  minH: { base: '46px', lg: '49px' },
                  minW: { base: '106px', lg: '112px' },
                  rounded: 'full',
                }}
              >
                Subscribe
              </Button>
            </InputRightElement>
          </InputGroup>
        </VStack>
        <Text fontWeight={400} color="#FFFFFF" size="lg">
          Get in touch to see how our platform can turn your energy, asset, and
          occupancy data into measurable savings and efficiency.
        </Text>
      </SimpleGrid>
    </Flex>
  );
};

export default CTA;
