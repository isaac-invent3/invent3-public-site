import { Heading, Text, VStack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import React from 'react';

const Detail = () => {
  return (
    <VStack spacing="32px" width="full" alignItems="flex-start">
      <VStack spacing="8px" width="full" alignItems="flex-start">
        <Text fontWeight={800} size="lg" lineHeight="24px" color="#B279A2">
          How It Works
        </Text>
        <VStack spacing={{ base: '16px', lg: '24px' }} alignItems="flex-start">
          <Heading
            fontWeight={800}
            size={{ base: 'lg', lg: '2xl' }}
            color="black"
          >
            Simplified Asset Management in Four Easy Steps
          </Heading>
          <Text
            fontWeight={400}
            size="md"
            lineHeight="20px"
            color="neutral.600"
          >
            Invent3 eliminates the complexities of asset tracking, making it
            simple to manage, monitor, and maintain all your business assets.
          </Text>
        </VStack>
      </VStack>
      <Button
        customStyles={{
          width: { base: 'full', lg: '174px' },
          display: { base: 'none', lg: 'flex' },
        }}
      >
        Get Started
      </Button>
    </VStack>
  );
};

export default Detail;
