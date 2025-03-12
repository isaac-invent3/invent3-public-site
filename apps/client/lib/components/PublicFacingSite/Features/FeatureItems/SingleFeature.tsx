import { Flex, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

interface SingleFeatureProps {
  title: string;
  description: string;
  image: string;
  imageFirst: boolean;
}
const SingleFeature = (props: SingleFeatureProps) => {
  const { title, description, image, imageFirst } = props;
  return (
    <Stack
      width="full"
      direction={{ base: 'column', lg: 'row' }}
      spacing={{ base: '24px', md: '40px', lg: '133px' }}
      alignItems="flex-start"
    >
      <VStack
        width={{ base: 'full', lg: '45%' }}
        spacing={{ base: '16px', md: '24px' }}
        alignItems="flex-start"
        order={{ lg: imageFirst ? 1 : 0 }}
      >
        <Heading color="black" size={{ base: 'lg', lg: '2xl' }}>
          {title}
        </Heading>
        <Text
          size={{ base: 'md', lg: 'lg' }}
          lineHeight={{ base: '19.6px', lg: '22.4px' }}
        >
          {description}
        </Text>
      </VStack>
      <Flex
        height={{ base: '306px', md: '500px', lg: '490px' }}
        width={{ base: 'full', lg: '55%' }}
        bgColor="#F7F7F7"
        order={{ lg: imageFirst ? 0 : 1 }}
      >
        <Flex
          position="relative"
          flex={1}
          mt={{ base: '29px', lg: '60px' }}
          ml={{ base: '22px', lg: '44px' }}
        >
          <Image src={image} alt="feature-img" fill />
        </Flex>
      </Flex>
    </Stack>
  );
};

export default SingleFeature;
