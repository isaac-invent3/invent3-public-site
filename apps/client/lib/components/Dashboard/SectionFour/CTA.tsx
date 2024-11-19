import { Flex, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

const CTA = () => {
  return (
    <Flex
      width="full"
      height="full"
      minH="354px"
      maxW="354px"
      rounded="8px"
      border="1px solid white"
      background="linear-gradient(138.78deg, #1578DC 11.13%, #5AACFF 90.96%)"
      pt="19px"
      pl="21px"
      alignItems="flex-end"
      position="relative"
      gap="8px"
      overflow="hidden"
    >
      <VStack
        width="46%"
        height="full"
        justifyContent="space-between"
        alignItems="flex-start"
        pb="59px"
        position="relative"
        zIndex={99}
      >
        <Text
          fontWeight={700}
          fontSize="28px"
          lineHeight="33.26px"
          color="black"
        >
          Get your work done while on the move
        </Text>
        <Text color="white" size="lg" fontWeight={700}>
          Download the <br /> mobile app today
        </Text>
      </VStack>
      <Flex
        position="absolute"
        width="198px"
        height="85%"
        alignItems="flex-end"
        right={'01px'}
      >
        <Image src="/phone.png" alt="A hand holding a phone" fill />
      </Flex>
    </Flex>
  );
};

export default CTA;
