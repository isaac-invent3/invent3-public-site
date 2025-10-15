import { Flex, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import Image from 'next/image';
import React from 'react';

interface SingleFeatureProps {
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  featureDescriptionColor?: string;
}
const SingleFeature = (props: SingleFeatureProps) => {
  const {
    title,
    description,
    image,
    buttonText,
    buttonLink,
    featureDescriptionColor,
  } = props;
  return (
    <Stack
      width="full"
      direction={{ base: 'column', lg: 'row' }}
      spacing={{ base: '32px', lg: '24px' }}
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <VStack
        width={{ base: 'full', lg: '50%' }}
        spacing={{ base: '32px', lg: '80px' }}
        alignItems="flex-start"
      >
        <VStack spacing="32px" alignItems="flex-start">
          <Heading
            fontWeight={{ base: 700, lg: 800 }}
            fontSize={{ base: '24px', lg: '28px' }}
            color="primary.500"
          >
            {title}
          </Heading>
          <Text
            color={featureDescriptionColor ?? 'primary.accent'}
            fontWeight={400}
            size={{ base: '14px', md: 'lg' }}
          >
            {description}
          </Text>
        </VStack>
        <Flex width="full" justifyContent="center">
          <Flex
            position="relative"
            height="235px"
            width="full"
            maxW={{ base: '299px', lg: '399px' }}
            display={{ base: 'flex', lg: 'none' }}
          >
            <Image src={image} alt="feature-image" fill />
          </Flex>
        </Flex>

        <Button
          customStyles={{ width: { base: 'full', lg: 'min-content' } }}
          href={buttonLink}
        >
          {buttonText}
        </Button>
      </VStack>

      <Flex width="50%" justifyContent="center">
        <Flex
          position="relative"
          height="313px"
          width="full"
          maxW={{ base: '400px', lg: '399px' }}
          display={{ base: 'none', lg: 'flex' }}
        >
          <Image src={image} alt="feature-image" fill />
        </Flex>
      </Flex>
    </Stack>
  );
};

export default SingleFeature;
