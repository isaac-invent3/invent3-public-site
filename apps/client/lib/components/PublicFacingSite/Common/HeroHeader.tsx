import { Heading, HeadingProps, Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface HeroHeaderProps {
  title: string;
  subtitle: string;
  customHeading?: HeadingProps;
}
const HeroHeader = (props: HeroHeaderProps) => {
  const { title, subtitle, customHeading } = props;

  return (
    <VStack spacing="8px" width="full">
      <Heading
        fontWeight={800}
        fontSize={{ base: '24px', lg: '48px' }}
        lineHeight={{ base: '28.51px', lg: '57.02px' }}
        color="#E4FEFE"
        width="full"
        maxW="851px"
        textAlign="center"
        {...customHeading}
      >
        {title}
      </Heading>
      <Text
        color="white"
        fontSize={{ base: '14px', lg: '16px' }}
        lineHeight={{ base: '19.6px', lg: '22.4px' }}
        fontWeight={400}
        maxW="808px"
        textAlign="center"
      >
        {subtitle}
      </Text>
    </VStack>
  );
};

export default HeroHeader;
