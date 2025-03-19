import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

interface FeatureCardProps {
  title: string;
  subtitle: string;
  image: string;
}
const FeatureCard = (props: FeatureCardProps) => {
  const { title, subtitle, image } = props;
  return (
    <VStack
      width="full"
      spacing={{ base: '40px', md: '60px' }}
      bgColor="primary.500"
      px={{ base: '14px', lg: '40px', xl: '70px' }}
      pt={{ base: '32px', md: '40px' }}
      justifyContent="space-between"
      rounded="10px"
      position="relative"
    >
      <Box
        position="absolute"
        bgImage="/feature-gradient.png"
        bgRepeat="no-repeat"
        width="full"
        top={0}
        height="30%"
        opacity={0.15}
        boxShadow="2xl"
      />

      <VStack width="full" spacing="16px" position="relative" zIndex={99}>
        <Heading
          fontWeight={800}
          fontSize={{ base: '24px', lg: '28px' }}
          lineHeight={{ base: '28.51px', lg: '33.26px' }}
          textAlign="center"
          color="white"
        >
          {title}
        </Heading>
        <Text
          size={{ base: 'md', lg: 'lg' }}
          lineHeight={{ base: '20px', md: '24px' }}
          color="white"
          fontWeight={400}
          textAlign="center"
          maxW={{ base: '330px', sm: 'full' }}
        >
          {subtitle}
        </Text>
      </VStack>
      <Flex
        position="relative"
        height={{ base: '245px', sm: '350px' }}
        width="full"
      >
        <Image src={image} alt="feature-image" fill />
      </Flex>
    </VStack>
  );
};

export default FeatureCard;
