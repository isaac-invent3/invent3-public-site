import { Flex, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import SectionInfo from './SectionInfo';

interface ImageDescriptionProps {
  title: (string | string[])[];
  description: string;
  image: string;
  imageFirst: boolean;
}
const ImageDescription = (props: ImageDescriptionProps) => {
  const { title, description, image, imageFirst } = props;
  return (
    <Stack
      width="full"
      direction={{ base: 'column', lg: 'row' }}
      spacing={{ base: '54px', md: '24px' }}
      alignItems="flex-start"
    >
      <SectionInfo
        heading={title}
        headingStyles={{
          width: 'full',
          // maxW: { lg: '527px' },
        }}
        description={description}
        containerStyles={{
          order: { lg: imageFirst ? 1 : 0 },
          width: { base: 'full', lg: '50%' },
        }}
      />

      <Flex
        height={{ base: '530px', md: '502px' }}
        width={{ base: 'full', lg: '50%' }}
        order={{ lg: imageFirst ? 0 : 1 }}
      >
        <Flex position="relative" flex={1}>
          <Image src={image} alt="feature-img" fill />
        </Flex>
      </Flex>
    </Stack>
  );
};

export default ImageDescription;
